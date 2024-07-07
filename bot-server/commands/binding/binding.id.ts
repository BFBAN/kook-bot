import commandPack from "../commandPack";
import db from "../../../db";
import config from "../../../config";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";
import { api } from "../../../lib";
import Api from "../../../lib/api";
import { ErrorTemplate } from "../../template/errorTemplate";
import { httpBfban } from "../../../lib";

export class BindingId extends AppCommand {
  code = "id";
  trigger = "id";
  help = ".binding id [id:number]";
  intro = "binding.id.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      if (!session.args.length) {
        return session.reply(this.help);
      }

      await session.send(`你正在创建一个KOOK(${session.user.username})🔗BFBAN(${mainValue})档案，此数据将保存在机器人中，你无需输入账户密码。\n\t你需要注意来自BFBAN授权邮件`);

      // 检查BFBAN ID是否有效
      await this.checkBFBANId(mainValue, session);

      // 检查绑定过往授权请求状态
      await this.checkAuthStatus(mainValue, session);

      // 检查用户表有注册此账户
      const checkUser = await db("users").where({ bfbanUserId: mainValue }).first();

      if (checkUser) {
        await this.onBindingBfbanAccount(mainValue, session, other);
        return session.reply("已与BFBAN联系，请注意BFBAN授权邮件");
      }

      // 创建用户
      await this.createUser(mainValue, session);
      await this.onBindingBfbanAccount(mainValue, session, other);
      return session.reply("已成功创建BFBAN BOT for Kook账户，且已与BFBAN联系，请注意BFBAN授权邮件");
    } catch (err) {
      await session.replyCard(new ErrorTemplate(err).generation({
        lang: other.get("lang"),
        session
      }));
      bot.logger.error(err);
    }
  };

  /**
   * 检查BFBAN id是否有效
   * @param mainValue
   */
  async checkBFBANId(mainValue: any, session: any) {
    if (typeof mainValue !== "number" && mainValue <= 0) {
      return session.reply("错误的ID格式");
    }

    const result = await httpBfban.get(api.bfbanApi.user_info, {
        params: { id: mainValue }
      }),
      d = result.data;

    if (d.error === 1) {
      throw "无法找到BFBAN用户,请检查是否有效";
    }

    return true;
  }

  /**
   * 创建用户
   * @param mainValue
   * @param session
   */
  async createUser(mainValue: any, session: any) {
    let creationTime = new Date().getTime();
    const { id, username, avatar } = session.user;
    const newUser = await db("users").insert({
      // bfbanUserId: mainValue,
      // kookUserId: session.user.id,
      creationTime,
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
  async checkAuthStatus(mainValue: any, session: any) {
    const checkStatus = await db("binding_auth_history").where({ userId: mainValue, platform: "bfban" }).first(),
      nowTime = new Date().getTime();

    // 检查申请
    if (checkStatus && checkStatus.creationTime <= nowTime + 1000 * 60 * 3) {
      return session.reply("已申请授权，正在冷却 请在3分钟后操作");
    }

    if (checkStatus) {
      return db("binding_auth_history").where({ userId: mainValue }).update({
        creationTime: nowTime
      });
    }

    await db("binding_auth_history").insert({
      userId: mainValue,
      creationTime: nowTime,
      platform: "bfban"
    });
  }

  /**
   * 绑定BFBAN账户
   * @param id
   * @param session
   */
  async onBindingBfbanAccount(id: number, session: any, other: any) {
    // todo 实现队列，2分钟内，每隔十秒查询数据库检查数据，超出则移除队列中

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
      });

      if (result.data.success === 1) {
        session.reply("检查你的邮件，是否收到BFBAN授权邮件");
        return;
      }
    } catch (err) {
      bot.logger.error(err);
      console.log(err);
      throw err;
    }
  }

}

export const bindingId = new BindingId();
