import { Card } from "kbotify";
import i18n from "../../langage";
import config from "../../config";
import BaseTemplate from "./BaseTemplate";
import { CardExtend } from "../../data/CardExp";

class SitestatsTrendTemplate extends BaseTemplate {
  data: any;

  public get generation(): Card {
    let message = new CardExtend();
    let trend_data = this.data;

    if (!trend_data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.trend.title", this.lang))
      .addDivider()
      .addText(this.help ?? "-")
      .addDivider();

    // 标题
    let fields = [{ "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.index", this.lang)}**` },
      { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.username", this.lang)}**` },
      {
        "type": "kmarkdown",
        "content": `**${i18n.t("sitestats.trend.hot", this.lang)}** / **${i18n.t("sitestats.trend.commentsNum", this.lang)}** / **${i18n.t("sitestats.trend.viewNum", this.lang)}**`
      }];
    let index = 1;

    // 插入内容
    trend_data.data.forEach((i: {
      viewNum: number;
      commentsNum: number;
      originPersonaId: string;
      hot: string;
      originName: string;
    }) => {
      fields.push({ "type": "kmarkdown", "content": `#${index}` });
      fields.push({ "type": "kmarkdown", "content": `[${i.originName ?? "-"}](${config.webSite}/player/${i.originPersonaId})` });
      fields.push({ "type": "kmarkdown", "content": `${i.hot ?? 0}/${i.commentsNum ?? 0}/${i.viewNum ?? 0}` });

      index += 1;
    });

    message
      .addModule({
        type: "section",
        accessory: {},
        text: {
          "type": "paragraph",
          "cols": 3,
          "fields": fields
        }
      })
      .addFooter();

    return message;
  }
}

export default SitestatsTrendTemplate;
