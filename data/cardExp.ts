import { Card, MenuCommand } from "kbotify";
import config from "../config";
import Api from "../lib/api";

export class CardExtend extends Card {
  public addMenu(self: MenuCommand): Card {
    this.addText(`你当前输入的是根指令，它不包含具体功能，你可能需要的是:`).addDivider();

    for (let value of self.commandMap.values()) {
      this.addText(`${value.help}`);
    }

    this
      .addDivider()
      .addText(`查看文档: ${config.botWebSite}/docs/command/${self.trigger}`)
      .addFooter();
    return this;
  }

  public addNotData(): Card {
    this.addText("无数据");
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
            "src": `${Api.host.bfbanWebsite.protocol}://${Api.host.bfbanWebsite!.host}/images/logo.png`
          },
          {
            "type": "kmarkdown",
            "content": `[${config.name}](${Api.host.bfbanWebsite!.url ?? ""})`
          },
          {
            "type": "kmarkdown",
            "content": ` 2018-${new Date().getFullYear()} - v:${config.version}`
          },
          {
            "type": "kmarkdown",
            "content": ` by Cabbagelol`
          }
        ]
      });
    return this;
  }
}
