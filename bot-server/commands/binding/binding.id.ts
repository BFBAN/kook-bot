import commandPack from "../commandPack";
import db from "../../../db";
import config from "../../../config";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { api } from "../../../lib";
import Api from "../../../lib/api";
import { ErrorTemplate } from "../../template/errorTemplate";
import { httpBfban } from "../../../lib";
import { CardExtend } from "../../../data/cardExp";

export class BindingId extends AppCommand {
  code = "id";
  trigger = "id";
  help = ".binding id [bfbanAccountId:number]";
  intro = "binding.id.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const commandTool: any = new commandPack.CommandFactory(this).addAttr({ session }),
      { mainValue, other } = commandTool.pack(session.args);

    try {
      // 检查参数有效性，并丢出提示
      if (!commandTool.check()) {
        return;
      }

      let context = new CardExtend()
        .addText("通知")
        .addDivider()
        .addModule({
          "type": "section",
          "text": {
            "type": "kmarkdown",
            "content": `你正在创建一个KOOK(${session.user.username})🔗BFBAN(${mainValue})档案，绑定须知:\n
  - 此数据将保存在机器人中，与BFBAN无直接关联，过程中你不需要输入BFBAN账户。\n
  - 需要注意来自BFBAN授权邮件，通过邮件内的链接确认\n
  - 你有24小时授权确认，超时授权确认将失效\n
  - 授权的身份令牌存在使用时期，如果过期，机器人需要重新授权\n
  - 授权的令牌无法修改BFBAN账户名、密码登敏感操作\n
  - 遇到第三方恶意使用授权，请告知BFBAN，将回收权限\n`
          }
        })
        .addDivider()
        .addModule({
          "type": "action-group",
          "elements": [
            {
              "type": "button",
              "theme": "primary",
              "click": "return-val",
              "value": "ok",
              "text": {
                "type": "plain-text",
                "content": "了解确认"
              }
            }
          ]
        })
        .addFooter();

      let sendId = await session.sendCard(context.toString());

      bot.message.on("buttonEvent", async (event) => {
        if (
          event.targetMsgId !== sendId.msgSent?.msgId &&
          session.userId !== event.userId
        ) {
          return;
        }

        await session.updateMessage(sendId.msgSent?.msgId!, new Card({
          "type": "card",
          "theme": "secondary",
          "size": "lg",
          "modules": [
            {
              "type": "section",
              "text": {
                "type": "plain-text",
                "content": `已确认须知，你也可以在此处再次查看(${Api.host.botDocsAddress!.url})`
              }
            }
          ]
        }).toString());

        // 检查BFBAN ID是否有效 and 检查绑定过往授权请求状态
        if (!await this.checkBFBANId(mainValue, session) || !await this.checkAuthStatus(mainValue, session)) {
          await session.updateMessage(sendId.msgSent?.msgId!, new Card({
            "type": "card",
            "theme": "secondary",
            "size": "lg",
            "modules": [
              {
                "type": "section",
                "text": {
                  "type": "plain-text",
                  "content": `取消绑定，已绑定或联BAN不正确`
                }
              }
            ]
          }).toString());
          return;
        }

        // 检查用户表有注册此账户
        const checkUser = await db("users").where({ bfbanUserId: mainValue }).first();

        if (checkUser) {
          await this.onBindingBfbanAccount(mainValue, session, other);
          return session.reply("已与BFBAN联系，请注意BFBAN授权邮件");
        }

        // 创建用户
        await this.createUser(mainValue, session);
        await this.onBindingBfbanAccount(mainValue, session, other);

        return session.reply("已与BFBAN联系，请注意BFBAN授权邮件");

      });

    } catch (err) {
      await session.replyCard(new ErrorTemplate()
        .addError(err)
        .addSession(session)
        .addAttr({ lang: other.get("lang") }).generation);
      bot.logger.error(err);
    }
  };

  /**
   * 检查BFBAN id是否有效
   * @param mainValue
   * @param session
   */
  async checkBFBANId(mainValue: any, session: BaseSession) {
    if (typeof mainValue !== "number" && mainValue <= 0) {
      await session.reply("错误的ID格式");
      return false;
    }

    const result = await httpBfban.get(api.bfbanApi.user_info, {
        params: { id: mainValue }
      }),
      d = result.data;

    if (d.error === 1) {
      await session.reply("无法找到BFBAN用户,请检查是否有效");
      return false;
    }

    return true;
  }

  /**
   * 创建用户
   * @param mainValue
   * @param session
   */
  async createUser(mainValue: any, session: BaseSession) {
    let creationTime = new Date().getTime();
    const { id, username, avatar } = session.user;

    if (!id || !username) {
      return false;
    }

    const newUser = await db("users").insert({
      creationTime,
      username,
      valid: 1
    });

    const kookBindingId = await db("binding_kook").insert({ userId: newUser[0], kookId: id, username, avatar }),
      bfbanBindingId = await db("binding_bfban").insert({ userId: newUser[0], bfbanId: mainValue }); // 创建预设的BFBAN绑定，需要后续BFBAN服务回调更新

    // 绑定总表
    await db("binding")
      .insert({ userID: newUser[0], platform: "bfban", value: bfbanBindingId[0], creationTime })
      .insert({ userID: newUser[0], platform: "kook", value: kookBindingId[0], creationTime });
  }

  /**
   * 添加机器人单个用户短时间内重复绑定限制
   * 3分钟冷却后再可使用
   * @param mainValue
   * @param session
   */
  async checkAuthStatus(mainValue: any, session: BaseSession) {
    const checkStatus = await db("binding_auth_history").where({ userId: mainValue, platform: "bfban" }).first(),
      nowTime = new Date().getTime();

    // 检查申请
    if (checkStatus && nowTime <= checkStatus.creationTime + (config.__DEBUG__ ? (0) : (1000 * 60 * 3))) {
      await session.reply("已申请过授权，你需要冷却，请在3分钟后操作");
      return false;
    }

    if (checkStatus) {
      db("binding_auth_history").where({ userId: mainValue }).update({ creationTime: nowTime });
      return true;
    }

    await db("binding_auth_history").insert({
      userId: mainValue,
      creationTime: nowTime,
      platform: "bfban"
    });

    return true;
  }

  /**
   * 绑定BFBAN账户
   * @param id
   * @param session
   */
  async onBindingBfbanAccount(id: number, session: BaseSession, other: any) {
    if (!id || id <= 0 || id > Number.MAX_VALUE) {
      throw "Unexpected value";
    }

    try {
      const result = await httpBfban.post(api.bfbanApi.service_externalAuth, {
          data: {
            id,
            appName: config.botName,
            appId: config.botId,
            EXPIRES_IN: 604800000,
            CALLBACK_PATH: `${Api.host.botServerAddress!.url}api/authCallback`
          }
        }),
        d = result.data;

      if (d.error === 1) {
        throw d.message;
      }
    } catch (err) {
      bot.logger.error(err);
      console.log(err);
      throw err;
    }
  }

}

export const bindingId = new BindingId();
