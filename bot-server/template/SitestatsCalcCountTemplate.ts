import { Card } from "kbotify";
import i18n from "../../langage";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import config from "../../config";

class SitestatsCalcCountTemplate {
  webData: any;

  constructor(data: any) {
    this.webData = data;
  }

  generation({ lang = config.i18n.default } = {}): Card {
    let message = new Card();
    let web_data = this.webData;

    if (!web_data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.trend.title", lang))
      .addDivider()
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 2,
          "fields": [
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.reports", lang)}**\n${web_data?.data.reports || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.players", lang)}**\n${web_data?.data.players || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.banAppealse", lang)}**\n${web_data?.data.banAppeals || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.registers", lang)}**\n${web_data?.data.registers || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("sitestats.confirmed", lang)}**\n${web_data?.data.confirmed || 0}`
            }
          ]
        }
      });

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export default SitestatsCalcCountTemplate;
