import { Card } from "kbotify";
import config from "../../config";

class BaseFooterTemplate {
  add(card: Card) {
    card
      .addDivider()
      .addModule({
        type: "context",
        "elements": [
          {
            "type": "image",
            "src": "https://bfban.gametools.network/img/logo.png"
          },
          {
            "type": "plain-text",
            "content": "bfban 2018-" + new Date().getFullYear()
          },
          {
            "type": "kmarkdown",
            "content": ` - [${config.name}](${config.site.protocol}://${config.site.origin}) - v:${config.version}`
          }
        ]
      });

    return card;
  }
}

export { BaseFooterTemplate };
