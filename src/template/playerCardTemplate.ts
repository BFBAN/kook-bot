import config from "../../config";

import i18n from "../../langage";
import Http from "../lib/http";
import { Card } from "kbotify";
import { BaseFooterTemplate } from "./baseFooterTemplate";

class PlayerCardTemplate {
  playerInfo: any;
  http = new Http();

  constructor(data: any) {
    this.playerInfo = data;
  }

  generation({ lang = config.i18n.default } = {}): Card {
    let message: Card = new Card();
    const status_config: { [any: string]: string } = { "0": "success", "1": "pink", "4": "success", "default": "none" };

    let player_info: any = this.playerInfo;
    let player_historyName: Array<any> = [];
    let player_url: string = "";
    let player_i18n_methods: Array<any> = [];
    let player_i18n_games: Array<any> = [];
    let player_i18n_createTime: string = "";
    let player_i18n_updateTime: string = "";
    let player_i18n_status: any = "";

    if (!player_info) {
      return message;
    }

    player_url = `${config.webSite}/player/${player_info.data.originPersonaId}`;

    // 历史名称
    player_info.data.history.forEach((i: { originName: string }) => {
      if (i.originName) {
        player_historyName.push(i.originName);
      }
    });

    // 作弊类型
    player_info?.data.cheatMethods.forEach((methodsName: string) => {
      player_i18n_methods.push(i18n.t(`base.action.${methodsName}.text`, lang));
    });

    // 游戏类型
    player_info?.data.games.forEach((gameKey: string | number) => {
      player_i18n_games.push("`" + i18n.t(`base.games.${gameKey}`, lang) + "`");
    });

    player_i18n_createTime = new Intl.DateTimeFormat(
      lang,
      { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }
    ).format(new Date(player_info?.data.createTime).getTime());

    player_i18n_updateTime = new Intl.DateTimeFormat(
      lang,
      { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }
    ).format(new Date(player_info?.data.updateTime).getTime());

    player_i18n_status = status_config[player_info?.data.status.toString() || "default"];

    message
      .addTitle(i18n.t("checkban.id.title", lang))
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
            "content": ` (${player_info.data.id}) · [${i18n.t("checkban.share", lang)}](${player_url + "/share"}) · [${i18n.t("checkban.detail", lang)}](${player_url})`
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
              "content": `**${i18n.t("checkban.status", lang)}**\n(font)${i18n.t(`base.status.${player_info?.data.status}`, lang)}(font)[${player_i18n_status || "default"}]`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("checkban.games", lang)}**\n${player_i18n_games.join(",")}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("checkban.methods", lang)}**\n${player_i18n_methods.length >= 0 ? player_i18n_methods.join(" ") : "-"}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("checkban.viewNum", lang)}**\n${player_info?.data.viewNum ?? 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("checkban.commentsNum", lang)}**\n${player_info?.data.commentsNum ?? 0}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("checkban.gameId", lang)}**\n${player_info?.data.originPersonaId ?? '-'}`
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
              "content": `**${i18n.t("checkban.createTime", lang)}**\n${player_i18n_createTime}`
            },
            {
              "type": "kmarkdown",
              "content": `**${i18n.t("checkban.updateTime", lang)}**\n${player_i18n_updateTime}`
            }
          ]
        }
      })
      .addDivider()
      .addText(`${i18n.t("checkban.historyName", lang)}: ${player_historyName.toString()}`);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export {
  PlayerCardTemplate
};
