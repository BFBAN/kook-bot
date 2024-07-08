import i18n from "../../langage";

import { AxiosError } from "axios";
import { CardExtend } from "../../data/cardExp";
import BaseTemplate from "./BaseTemplate";

class ErrorBaseTemplate extends BaseTemplate {
  errorContent: any = ":( I have an error";

  addError(context: any) {
    this.errorContent = context;
    return this;
  }
}

class ErrorTemplate extends ErrorBaseTemplate {
  public get generation() {
    let message = new CardExtend({ color: "", modules: [], size: "lg", type: "card", theme: "danger" });
    let content: any = this.errorContent;

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
      .addTitle(i18n.t("error.title", this.lang))
      .addText(i18n.t("error.description", this.lang))
      .addModule({
        type: "section",
        "text": {
          "type": "kmarkdown",
          "content": `${i18n.t("error.errorTime", this.lang) + ":" + new Date().getTime()}`
        }
      })
      .addDivider()
      .addText(content);

    // set card footer
    message.addFooter();

    return message;
  }
}

export {
  ErrorTemplate
};
