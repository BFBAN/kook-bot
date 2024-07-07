import { Card } from "kbotify";
import config from "../config";

export class CardExtend extends Card {
  public addHeader(): Card {
    this
      .addTitle("BFBAN")
      .addDivider()
    return this;
  }

  public addFooter(): Card {
    this
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
    return this;
  }
}
