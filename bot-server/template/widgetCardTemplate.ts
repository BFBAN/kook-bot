import i18n from "../../langage";
import BaseTemplate from "./BaseTemplate";
import { CardExtend } from "../../data/CardExp";

class WidgetBaseTemplate extends BaseTemplate {
  url: string = "";

  addUrl(url: string) {
    this.url = url;
    return this;
  }
}

class WidgetCardTemplate extends WidgetBaseTemplate {
  public get generation() {
    const player_info = this.data;
    let message: CardExtend = new CardExtend();

    message.addTitle(i18n.t("widget.title", this.lang));

    if (this.url && typeof this.url === "string") {
      message
        .addImage(this.url)
        .addDivider()
        .addModule({
          "type": "context",
          "elements": [
            {
              "type": "kmarkdown",
              "content": `${i18n.t("widget.description", this.lang)}:\n`
            },
            {
              "type": "kmarkdown",
              "content": `${this.url ?? ""} [${i18n.t("base.button.link", this.lang)}](${this.url ?? ""})`
            }
          ]
        });
    } else {
      message
        .addModule({
          "type": "context",
          "elements": [
            {
              "type": "kmarkdown",
              "content": `地址不对劲`
            }
          ]
        });
    }

    // set card footer
    message.addFooter();

    return message;
  }
}

export default WidgetCardTemplate;
