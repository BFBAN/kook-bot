import { Card } from "kbotify";
import i18n from "../../langage";
import config from "../../config";
import BaseTemplate from "./BaseTemplate";
import { CardExtend } from "../../data/CardExp";

class SitestatsCalcCountTemplate extends BaseTemplate {
  public get generation(): Card {
    let message = new CardExtend();
    let leaderboard_data = this.data;

    if (!leaderboard_data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.leaderboard.title", this.lang))
      .addDivider()
      .addText(this.help ?? "-")
      .addDivider();

    //// 社区 S
    // 标题
    message.addTitle(i18n.t("sitestats.leaderboard.community.title", this.lang));
    let communityFields = [
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.index", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.username", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.hot", this.lang)}**` }
      ],
      communityIndex = 1;

    // 插入内容
    leaderboard_data.data.community.forEach((i: any) => {
      communityFields.push({ "type": "kmarkdown", "content": `#${communityIndex}` });
      communityFields.push({ "type": "kmarkdown", "content": `[${i.username ?? "-"}](${config.webSite}/player/${i.id})` });
      communityFields.push({ "type": "kmarkdown", "content": `${i.total.toFixed(1) ?? 0}` });
      communityIndex += 1;
    });

    message.addModule({
      type: "section",
      "accessory": {},
      "text": { "type": "paragraph", "cols": 3, "fields": communityFields }
    });

    //// 举报 S
    // 标题
    message.addTitle(i18n.t("sitestats.leaderboard.report.title", this.lang));
    let reportsField = [
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.index", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.username", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.hot", this.lang)}**` }
      ],
      reportsIndex = 1;

    // 插入内容
    leaderboard_data.data.report.forEach((i: any) => {
      reportsField.push({ "type": "kmarkdown", "content": `#${reportsIndex}` });
      reportsField.push({ "type": "kmarkdown", "content": `[${i.username ?? "-"}](${config.webSite}/player/${i.id})` });
      reportsField.push({ "type": "kmarkdown", "content": `${i.total ?? 0}` });
      reportsIndex += 1;
    });

    message.addModule({
      type: "section",
      "accessory": {},
      "text": { "type": "paragraph", "cols": 3, "fields": reportsField }
    });

    //// 成就 S
    // 标题
    message.addTitle(i18n.t("sitestats.leaderboard.achievement.title", this.lang));
    let achievementFields = [
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.index", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.username", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.trend.hot", this.lang)}**` }
      ],
      achievementIndex = 1;

    // 插入内容
    leaderboard_data.data.achievement.forEach((i: any) => {
      achievementFields.push({ "type": "kmarkdown", "content": `#${achievementIndex}` });
      achievementFields.push({ "type": "kmarkdown", "content": `[${i.username ?? "-"}](${config.webSite}/player/${i.id})` });
      achievementFields.push({ "type": "kmarkdown", "content": `${i.points ?? 0}` });
      achievementIndex += 1;
    });

    message.addModule({
      type: "section",
      "accessory": {},
      "text": { "type": "paragraph", "cols": 3, "fields": achievementFields }
    });

    // set card footer
    message.addFooter()

    return message;
  }
}

export default SitestatsCalcCountTemplate;
