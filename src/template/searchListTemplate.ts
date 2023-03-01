import { Card } from "kbotify";
import i18n from "../../i18n";
import Http from "../lib/http";
import { BaseFooterTemplate } from "./baseFooterTemplate";

class SearchListTemplate {
  searchList: any;
  http = new Http();

  constructor(data: Array<any>) {
    this.searchList = data;
  }

  generation(): Card {
    const that = this;
    let message = new Card();
    let search_list = this.searchList;
    let waitingList = new Array();

    if (!search_list) {
      return message;
    }

    message
      .addTitle(i18n.translation.cheackban.name.title)
      .addText(i18n.translation.cheackban.name.description)
      .addDivider();

    for (let index = 0; index < search_list.length; index++) {
      let i = search_list[index];
      message.addModule({
        type: "section",
        "mode": "right",
        "accessory": {
          "type": "button",
          "theme": "primary",
          "value": i.originPersonaId,
          "text": {
            "type": "plain-text",
            "content": "select"
          }
        },
        "text": {
          "type": "kmarkdown",
          "content": `#${index} ${i.historyName}`
        }
      });
    }

    let endTime = new Date().getTime() + (1000 * 60);

    message
      .addCountdown("second", endTime, new Date().getTime());

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export {
  SearchListTemplate
};
