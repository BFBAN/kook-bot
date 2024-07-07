import { Card } from "kbotify";
import i18n from "../../langage";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import config from "../../config";

class SitestatsTrendTemplate {
  trendData: any;
  help: string | undefined;

  constructor(data: any) {
    this.trendData = data;
  }

  generation(help: string, { lang = config.i18n.default } = {}): Card {
    let message = new Card();
    let trend_data = this.trendData;

    if (!trend_data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.trend.title", lang))
      .addDivider()
      .addText(help ?? "-")
      .addDivider();

    // 标题
    let fields = [{ "type": "kmarkdown", "content": `**${i18n.t('sitestats.trend.index', lang)}**` },
      { "type": "kmarkdown", "content": `**${i18n.t('sitestats.trend.username', lang)}**` },
      { "type": "kmarkdown", "content": `**${i18n.t('sitestats.trend.hot', lang)}** / **${i18n.t('sitestats.trend.commentsNum', lang)}** / **${i18n.t('sitestats.trend.viewNum', lang)}**` }];
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
