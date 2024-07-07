import { Card } from "kbotify";
import i18n from "../../langage";
import BaseTemplate from "./BaseTemplate";
import { CardExtend } from "../../data/CardExp";

class SitestatsCalcCountTemplate extends BaseTemplate {
  public get generation(): Card {
    let message = new CardExtend();
    let web_data = this.data;

    if (!web_data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.trend.title", this.lang))
      .addDivider()
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 2,
          "fields": [
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.reports", this.lang)}**\n${web_data?.data.reports || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.players", this.lang)}**\n${web_data?.data.players || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.banAppealse", this.lang)}**\n${web_data?.data.banAppeals || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.registers", this.lang)}**\n${web_data?.data.registers || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.confirmed", this.lang)}**\n${web_data?.data.confirmed || 0}`
            }
          ]
        }
      });

    // set card footer
    message.addFooter()

    return message;
  }
}

export default SitestatsCalcCountTemplate;
