import Http from "../lib/http";
import { Card } from "kbotify";
import i18n from "../../i18n";
import { BaseFooterTemplate } from "./baseFooterTemplate";

class SitestatsAdminTemplate {
  webData: any;
  http = new Http();

  constructor(data: any) {
    this.webData = data;
  }

  generation(): Card {
    let message = new Card();
    let web_data = this.webData;

    if (!web_data) {
      return message;
    }

    message
      .addTitle(i18n.translation.sitestats.trend.title)
      .addDivider();

    let fields: { type: string; content: string; }[] = [];

    web_data.forEach((i: { username: string; }) => {
      fields.push({
        "type": "kmarkdown",
        "content": `${i.username}`
      });
    });

    message
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 1,
          "fields": fields
        }
      });

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export default SitestatsAdminTemplate;
