import i18n from "../../i18n";
import Http from "../lib/http";
import { Card } from "kbotify";
import { BaseFooterTemplate } from "./baseFooterTemplate";

class PlayerCardTemplate {
  playerInfo: any;
  http = new Http();

  constructor(data: any) {
    this.playerInfo = data;
  }

  generation() : Card {
    let message = new Card();
    let player_info = this.playerInfo;

    if (!player_info) return message;

    message
      .addTitle(i18n.translation.cheackban.id.title)
      .addDivider()
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 3,
          "fields": [
            {
              "type": "kmarkdown",
              "content": `**昵称**\n${player_info?.data.originName}`
            },
            {
              "type": "kmarkdown",
              "content": `**状态**\n${i18n.translation.base.status[player_info?.data.status]}`
            },
            {
              "type": "kmarkdown",
              "content": `**游戏**\n${player_info?.data.games}`
            },
            {
              "type": "kmarkdown",
              "content": `**浏览次数**\n${player_info?.data.viewNum}`
            },
            {
              "type": "kmarkdown",
              "content": `**评论**\n${player_info?.data.commentsNum}`
            },
          ]
        }
      })
      .addDivider()
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 2,
          "fields": [
            {
              "type": "kmarkdown",
              "content": `**创建时间**\n${player_info?.data.createTime}`
            },
            {
              "type": "kmarkdown",
              "content": `**更新时间**\n${player_info?.data.updateTime}`
            }
          ]
        }
      })
      .addDivider()
      .addText(`🔗: [${this.http.address}player/${player_info.data.originPersonaId}](${this.http.address}player/${player_info.data.originPersonaId})`);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export {
  PlayerCardTemplate
};
