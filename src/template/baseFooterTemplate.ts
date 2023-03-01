import { Card } from "kbotify";
import config from "../../config";

// const packageConf = require("../../../package.json");

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
            "content": "@bfban 2018-" + new Date().getFullYear()
          },
          {
            "type": "plain-text",
            "content": ` - ${config.site.protocol}://${config.site.origin}`
          }
        ]
      });

    return card;
  }
}

export { BaseFooterTemplate };
