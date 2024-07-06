import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";
import db from "../../../db";
import config from "../../../config";
import { httpBfban, httpBfbanProxyUser } from "../../../lib";

export class BindingId extends AppCommand {
  code = "id";
  trigger = "id";
  help = ".binding id [id:number]";
  intro = "binding.id.intro";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      if (!session.args.length) {
        return session.reply(this.help);
      }

      // 检查用户表有注册此账户
      const checkUser = await db("users").where({ bfbanUserId: mainValue }).first();

      if (checkUser) {
        await this.onBindingBfbanAccount(mainValue, session, other);
        return session.reply("已与BFBAN联系，请注意BFBAN授权邮件");
      }

      // TODO 检查BFBANID是否有效

      // 创建
      let creationTime = new Date().getTime();
      const newUser = await db("users").insert({
        bfbanUserId: mainValue,
        kookUserId: session.user.id,
        creationTime,
        valid: 1
      });
      await db("binding")
        .insert({ userID: newUser[0], platform: "bfban", value: null, creationTime })
        .insert({
          userID: newUser[0],
          platform: "kook",
          value: { id: session.user.id, username: session.user.username, avatar: session.user.avatar },
          creationTime
        });

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
      const result = await httpBfban.post(api.service_externalAuth, {
        data: {
          id,
          appName: config.botName,
          appId: config.botId,
          EXPIRES_IN: 604800000,
          CALLBACK_PATH: this.http.botServerAddress + "api/authCallback"
        }
      });

      if (result.data.success === 1) {
        session.reply("检查你的邮件，是否收到BFBAN授权邮件");
        return;
      }
    } catch (err) {
      throw err
      bot.logger.error(err);
    }
  }

}

export const reportName = new BindingId();
