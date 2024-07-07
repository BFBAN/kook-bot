import commandPack from "../commandPack";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";
import db from "../../../db";
import BindingCardTemplate from "../../template/bindingCardInfo";

export class BindingCheck extends AppCommand {
  code = "check";
  trigger = "check";
  help = ".binding check";
  intro = "binding.check.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      const user = await db("binding_kook").where({ kookId: session.user.id }).first();

      if (!user) {
        return session.reply(`抱歉,没找到与机器人绑定的${session.user.username}账户信息, 请输入.binding id {你的BFBAN ID}来建立档案`);
      }

      return await session.replyCard(new BindingCardTemplate().addAttr({lang: other.get("lang"), data: user }).generation);
    } catch (err) {
      await session.replyCard(new ErrorTemplate(err).generation({
        lang: other.get("lang"),
        session
      }));
      bot.logger.error(err);
    }
  };
}

export const bindingCheck = new BindingCheck();
