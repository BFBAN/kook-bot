import config from "../../config";
import i18n from "../../langage";

import { Card } from "kbotify";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import { AxiosError } from "axios";

class ErrorTemplate {
  errorContent: any = ":( I have an error";

  constructor(data: any) {
    if (data) {
      this.errorContent = data;
    }
  }

  public generation({ lang = config.i18n.default, session: BaseSession = {} } = {}) {
    let message = new Card({
      color: "",
      modules: [],
      size: "lg",
      type: "card",
      theme: "danger"
    });
    let content: any = "";

    switch (this.errorContent.constructor) {
      case String:
        content = this.errorContent;
        break;
      case Array:
      case AxiosError:
        content = this.errorContent.toString();
        break;
      default:
        content = JSON.stringify(this.errorContent);
        break;
    }

    message
      .addTitle(i18n.t("error.title", lang))
      .addText(i18n.t("error.description", lang))
      .addModule({
        type: "section",
        "text": {
          "type": "kmarkdown",
          "content": `${i18n.t("error.errorTime", lang) + ":" + new Date().getTime()}`
        }
      })
      .addDivider()
      .addText(content);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export {
  ErrorTemplate
};
