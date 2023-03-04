import Http from "../lib/http";
import { Card } from "kbotify";
import i18n from "../../langage";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import config from "../../config";

class SitestatsAdminTemplate {
  webData: any;

  http = new Http();
  showListNumber: number = 20;

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
      .addTitle(i18n.t("sitestats.admins.title", lang))
      .addText(i18n.t("sitestats.admins.description", lang))
      .addDivider();

    let fields: Array<any> = [
      {
        "type": "kmarkdown",
        "content": "**昵称**"
      },
      {
        "type": "kmarkdown",
        "content": ""
      }
    ];

    web_data.data.forEach((i: {
      id: any;
      username: string;
    }) => {
      if (fields.length <= this.showListNumber) {
        fields.push({ "type": "kmarkdown", "content": `${i.username}` });
        fields.push({ "type": "kmarkdown", "content": `[${i18n.t("base.button.link", lang)}](${config.webSite}/account/${i.id})` });
      }
    });

    message
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 2,
          "fields": fields
        }
      })
      .addDivider()
      .addText(i18n.t("sitestats.admins.more", lang));

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export default SitestatsAdminTemplate;
