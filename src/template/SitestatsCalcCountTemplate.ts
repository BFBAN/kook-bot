import Http from "../lib/http";
import { Card } from "kbotify";
import i18n from "../../i18n";
import { BaseFooterTemplate } from "./baseFooterTemplate";

class SitestatsCalcCountTemplate {
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
      .addDivider()
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 2,
          "fields": [
            {
              "type": "kmarkdown",
              "content": `**社区共计已举报**\n${web_data?.data.reports || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**现有举报案件**\n${web_data?.data.confirmed || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**已上诉**\n${web_data?.data.banAppeals || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**注册用户**\n${web_data?.data.registers || 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**已处理案件**\n${web_data?.data.confirmed || 0}`
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
