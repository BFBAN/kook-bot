import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { BaseFooterTemplate } from "../../template/baseFooterTemplate";

import { bot } from "../../../bot";
import { CommandTypes } from "kbotify/dist/core/types";
import config from "../../../config";

class HelpMenu extends AppCommand {
  code = "help";
  trigger = "help";
  help = "指令帮助";

  func: AppFunc<BaseSession> = async (session) => {
    let message = new Card();
    let content: string = "";

    content += `\`.${this.trigger}\` \t | ${this.help}\n`;

    bot?.commandMap.forEach(i => {
      switch (i.type) {
        case CommandTypes.APP:
          break;
        case CommandTypes.MENU:
          content += `\`.${i.trigger}\` \t | ${i.help}\n`;

          i.commandMap.forEach(j => {
            content += `\`.${i.trigger} ${j.trigger}\` \t | ${j.intro} : ${j.help}\n`;
          });
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
      .addDivider()
      .addText("文档:\n" + config.botWebSite);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return session.replyCard(message);
  };
}

export const helpMenu = new HelpMenu();
