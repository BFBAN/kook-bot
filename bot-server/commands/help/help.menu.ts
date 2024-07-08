import { AppCommand, AppFunc, BaseSession, Card, KBotify, MenuCommand } from "kbotify";

import { bot } from "../../../bot";
import { CommandTypes } from "kbotify/dist/core/types";
import config from "../../../config";
import i18n from "../../../langage";
import commandPack from "../commandPack";
import { CardExtend } from "../../../data/cardExp";
import { ErrorTemplate } from "../../template/errorTemplate";

class HelpMenu extends AppCommand {
  code = "help";
  trigger = "help";
  help = "help.help";

  func: AppFunc<BaseSession> = async (session) => {
    const commandTool: any = new commandPack.CommandFactory(this).addAttr({ session }),
      { mainValue, other } = commandTool.pack(session.args);

    try {
      let message = new CardExtend(),
        content: string = "";

      message.addTitle(`📚 ${i18n.t(this.help, other.get("lang"))}`, true).addDivider();

      content += `\`.${this.trigger}\` \t | \t [docs](${config.botWebSite}/docs/command/${this.trigger})\n`;
      content += `----\n`;

      bot.commandMap.forEach(i => {
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
        .addText(`${i18n.t("base.button.document", other.get("lang"))}:${config.botWebSite}`);

      // set card footer
      message.addFooter();

      return session.replyCard(message);
    } catch (err) {
      await session.replyCard(new ErrorTemplate()
        .addError(err)
        .addSession(session)
        .addAttr({ lang: other.get("lang") }).generation);
      bot.logger.error(err);
    }
  };
}

export const helpMenu = new HelpMenu();
