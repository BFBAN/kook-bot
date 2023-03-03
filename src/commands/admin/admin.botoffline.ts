import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";

class AdminBotOffline extends AppCommand {
  code = "botoffline"; // 只是用作标记
  trigger = "botoffline"; // 用于触发的文字
  help = `下线机器人`; // 帮助文字
  intro = ".admin botoffline";
  func: AppFunc<BaseSession> = async (session) => {
    if (!session.args.length) {
      await bot.API.directMessage.create(1, session.userId, "", this.help);
      return;
    }

    return session.quote(`${session.args}`);
  };
}

export const adminBotOffline = new AdminBotOffline();
