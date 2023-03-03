import i18n from "../../i18n";
import Http from "../lib/http";
import { Card } from "kbotify";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import * as constants from "constants";

class PlayerCardTemplate {
  playerInfo: any;
  http = new Http();

  constructor(data: any) {
    this.playerInfo = data;
  }

  generation(): Card {
    let message: Card = new Card();
    let player_info: any = this.playerInfo;
    let player_historyName: string = "";
    let player_url: string = "";
    let player_i18n_status: Array<any> = [];
    let player_i18n_games: Array<any> = [];

    if (!player_info) {
      return message;
    }

    player_url = `${this.http.address}player/${player_info.data.originPersonaId}](${this.http.address}player/${player_info.data.originPersonaId}`;

    // 历史名称
    player_info.data.history.forEach((i: { originName: string; }) => {
      if (i.originName) {
        player_historyName += i.originName + ",";
      }
    });

    // 作弊类型
    player_info?.data.cheatMethods.forEach((methodsName: string | number) => {
      if (i18n.translation.base.action[methodsName]) {
        player_i18n_status.push(i18n.translation.base.action[methodsName].text);
      } else {
        player_i18n_status.push(methodsName);
      }
    });

    // 游戏类型
    player_info?.data.games.forEach((gameKey: string | number) => {
      if (i18n.translation.base.games[gameKey]) {
        player_i18n_games.push(i18n.translation.base.games[gameKey]);
      } else {
        player_i18n_games.push(gameKey);
      }
    });

    message
      .addTitle(i18n.translation.cheackban.id.title)
      .addDivider()
      .addModule({
        "type": "context",
        "elements": [
          {
            "type": "image",
            "src": player_info?.data.avatarLink,
            "alt": "",
            "size": "lg",
            "circle": true
          },
          {
            "type": "kmarkdown",
            "content": `**${player_info?.data.originName}**`
          },
          {
            "type": "kmarkdown",
            "content": ` (${player_info.data.id}) · [分享](${player_url + "/share"}) · [详情](${player_url})`
          }
        ]
      })
      .addDivider()
      .addModule({
        type: "section",
        "text": {
          "type": "paragraph",
          "cols": 3,
          "fields": [
            {
              "type": "kmarkdown",
              "content": `**状态**\n(font)${i18n.translation.base.status[player_info?.data.status]}(font)[success]`
            },
            {
              "type": "kmarkdown",
              "content": "**游戏**\n`" + player_i18n_games.toString() + "`"
            },
            {
              "type": "kmarkdown",
              "content": `**类型**\n${player_i18n_status.toString()}`
            },
            {
              "type": "kmarkdown",
              "content": `**浏览次数**\n${player_info?.data.viewNum}`
            },
            {
              "type": "kmarkdown",
              "content": `**评论**\n${player_info?.data.commentsNum}`
            },
            {
              "type": "kmarkdown",
              "content": `**游戏id**\n${player_info?.data.originPersonaId}`
            }

          ]
        }
      })
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
      .addText(`历史名称: ${player_historyName}`);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export {
  PlayerCardTemplate
};
