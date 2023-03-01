import Http from "../lib/http";
import { Card } from "kbotify";
import i18n from "../../i18n";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import config from "../../config";

class SitestatsTrendTemplate {
  trendData: any;
  http = new Http();

  constructor(data: any) {
    this.trendData = data;
  }

  generation(): Card {
    let message = new Card();
    let trend_data = this.trendData;

    if (!trend_data) {
      return message;
    }

    message
      .addTitle(i18n.translation.sitestats.trend.title)
      .addDivider();

    let fields = [{"type": "kmarkdown", "content": "**名称**" }, { "type": "kmarkdown", "content": "**链接**" }, { "type": "kmarkdown", "content": "**热度**" }];

    trend_data.forEach((i: {
      originPersonaId: string;
      hot: string;
      originName: string;
    }) => {
      fields.push({ "type": "kmarkdown", "content": i.originName });
      fields.push({ "type": "kmarkdown", "content": this.http.address + "player/" + i.originPersonaId });
      fields.push({ "type": "kmarkdown", "content": i.hot });
    });

    message
      .addModule({
        "type": "section",
        "accessory": {},
        "text": {
          "type": "paragraph",
          "cols": 3,
          "fields": fields
        }
      });

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export default SitestatsTrendTemplate;
