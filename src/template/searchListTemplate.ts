import { Card } from "kbotify";
import i18n from "../../langage";
import Http from "../lib/http";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import config from "../../config";

class SearchListTemplate {
  searchList: any;
  http = new Http();

  constructor(data: Array<any>) {
    this.searchList = data;
  }

  /**
   * 生成搜索列表卡片
   * @param other 额外参数
   * @param mainValue 主参
   * @param expirationTime 超时时间
   */
  generation(other: any = null, mainValue: string = "", expirationTime: number = 0, { lang = config.i18n.default }): Card {
    let message = new Card();
    let search_list = this.searchList;

    if (!search_list) {
      return message;
    }

    message
      .addTitle(i18n.t("checkban.name.title", lang))
      .addText(i18n.t("checkban.name.description", lang))
      .addDivider()
      .addModule({
        type: "section",
        "text": {
          "type": "kmarkdown",
          "content": `从网页查询 [详细列表](${config.webSite}/search?game=all&gameSort=${other.sort ?? "default"}&skip=0&keyword=${mainValue})`
        }
      })
      .addDivider();

    for (let index = 0; index < search_list.length; index++) {
      let i = search_list[index];
      message.addModule({
        type: "section",
        "mode": "right",
        "accessory": {
          "type": "button",
          "theme": "primary",
          "click": "return-val",
          "value": JSON.stringify({
            uid: i.originPersonaId,
            eventType: "search.list.select"
          }),
          "text": {
            "type": "plain-text",
            "content": i18n.t("checkban.select", lang)
          }
        },
        "text": {
          "type": "kmarkdown",
          "content": `${index} \t ${i.historyName}`
        }
      });
    }

    let endTime = new Date().getTime() + (expirationTime ?? (1000 * 60));

    message
      .addCountdown("second", endTime, new Date().getTime());

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }

  lockWidget() {
    let message = new Card();
    let search_list = this.searchList;

    if (!search_list) {
      return message;
    }

    message
      .addTitle(i18n.t("checkban.name.title"))
      .addText(i18n.t("checkban.name.description"))
      .addDivider()
      .addText("超时操作时间，事件已释放");

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export {
  SearchListTemplate
};
