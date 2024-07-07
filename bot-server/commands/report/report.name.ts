import commandPack from "../commandPack";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";

export class ReportName extends AppCommand {
  code = "name";
  trigger = "name";
  help = ".report name [id:number]";
  intro = "report.name.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {

    } catch (err) {

      bot.logger.error(err);
    }
  };

}

export const reportName = new ReportName();
