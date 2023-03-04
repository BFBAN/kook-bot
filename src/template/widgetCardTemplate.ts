import { Card } from "kbotify";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import i18n from "../../langage";
import config from "../../config";

class WidgetCardTemplate {
  playerInfo: any;

  constructor() {
  }

  generation(url: unknown, { lang = config.i18n.default }) {
    const player_info = this.playerInfo;
    let message: Card = new Card();

    message.addTitle(i18n.t("widget.title", lang));

    if (url && typeof url === "string") {
      message
        .addImage(url)
        .addDivider()
        .addModule({
          "type": "context",
          "elements": [
            {
              "type": "kmarkdown",
              "content": i18n.t("widget.description", lang)
            },
            {
              "type": "kmarkdown",
              "content": `${url ?? ""} [${i18n.t("base.button.link", lang)}](${url ?? ""})`
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
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export default WidgetCardTemplate;
