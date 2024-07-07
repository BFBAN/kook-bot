import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { BaseFooterTemplate } from "../../template/baseFooterTemplate";

import { bot } from "../../../bot";
import { CommandTypes } from "kbotify/dist/core/types";
import config from "../../../config";
import i18n from "../../../langage";
import commandPack from "../commandPack";

class HelpMenu extends AppCommand {
  code = "help";
  trigger = "help";
  help = "help.help";

  func: AppFunc<BaseSession> = async (session) => {
    let message = new Card();
    let content: string = "";

    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    content += `\`.${this.trigger}\` \t | \t [docs](${config.botWebSite}/docs/command/${this.trigger})\n`;
    content += `----\n`

    bot?.commandMap.forEach(i => {
      switch (i.type) {
        case CommandTypes.APP:
          break;
        case CommandTypes.MENU:
          content += `\`.${i.trigger}\` \t | \t [docs](${config.botWebSite}/docs/command/${i.trigger})\n`;

          i.commandMap.forEach(j => {
            content += `\`.${i.trigger} ${j.trigger}\` \t | \t ${i18n.t(j.intro, other.get("lang") || config.i18n.default)} : [docs](${config.botWebSite}/docs/command/${i.trigger}#${j.trigger})\n`;
          });

          content += `----\n`;
          break;
      }
    });

    message
      .addModule({
        type: "section",
        "text": {
          "type": "kmarkdown",
          "content": content
        }
      })
      .addText(i18n.t("base.button.document", other.get("lang")) + ":" + config.botWebSite);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return session.replyCard(message);
  };
}

export const helpMenu = new HelpMenu();
