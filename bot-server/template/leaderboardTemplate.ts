import { Card } from "kbotify";
import i18n from "../../langage";
import config from "../../config";
import BaseTemplate from "./BaseTemplate";
import { CardExtend } from "../../data/cardExp";

class SitestatsCalcCountTemplate extends BaseTemplate {
  public get generation(): Card {
    let message = new CardExtend();
    let leaderboard_data = this.data;

    if (!leaderboard_data) {
      return message;
    }

    message
      .addTitle(`📈 ${i18n.t("sitestats.leaderboard.title", this.lang)}`, true)
      .addDivider()
      .addText(this.help ?? "-")
      .addDivider()

    //// 社区 S
    // 标题
    message.addTitle(i18n.t("sitestats.leaderboard.community.title", this.lang));
    let communityFields = [
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.community.index", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.community.username", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.community.value", this.lang)}**` }
      ],
      communityIndex = 1;

    // 插入内容
    if (leaderboard_data.data.community.length > 0) {
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
      }).addDivider();
    } else {
      message.addDivider().addNotData();
    }

    //// 举报 S
    // 标题
    message.addTitle(i18n.t("sitestats.leaderboard.report.title", this.lang));
    let reportsField = [
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.report.index", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.report.username", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.report.value", this.lang)}**` }
      ],
      reportsIndex = 1;

    // 插入内容
    if (leaderboard_data.data.report.length > 0) {
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
      }).addDivider();
    } else {
      message.addDivider().addNotData();
    }

    //// 成就 S
    // 标题
    message.addTitle(i18n.t("sitestats.leaderboard.achievement.title", this.lang));
    let achievementFields = [
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.achievement.index", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.achievement.username", this.lang)}**` },
        { "type": "kmarkdown", "content": `**${i18n.t("sitestats.leaderboard.achievement.value", this.lang)}**` }
      ],
      achievementIndex = 1;

    // 插入内容
    if (leaderboard_data.data.achievement.length > 0) {
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
    } else {
      message.addDivider().addNotData();
    }

    // set card footer
    message.addFooter();

    return message;
  }
}

export default SitestatsCalcCountTemplate;
