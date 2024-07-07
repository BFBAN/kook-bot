import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";

class AdminBotOffline extends AppCommand {
  code = "botoffline";
  trigger = "botoffline";
  help = `.admin botoffline`;
  intro = ".admin.botoffline.intro";

  func: AppFunc<BaseSession> = async (session) => {
    if (!session.args.length) {
      await bot.API.directMessage.create(1, session.userId, "", this.help);
      return;
    }

    return session.quote(`${session.args}`);
  };
}

export const adminBotOffline = new AdminBotOffline();
