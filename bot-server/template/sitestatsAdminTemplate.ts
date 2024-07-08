import { Card } from "kbotify";
import i18n from "../../langage";
import config from "../../config";
import BaseTemplate from "./BaseTemplate";
import { CardExtend } from "../../data/cardExp";

class SitestatsAdminTemplate extends BaseTemplate {
  showListNumber: number = 20;

  generation({ lang = config.i18n.default } = {}): Card {
    let message = new CardExtend();

    if (!this.data) {
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

    this.data.data.forEach((i: {
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
    message.addFooter()

    return message;
  }
}

export default SitestatsAdminTemplate;
