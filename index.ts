"use strict";
import * as fs from "fs";
import upath from "upath";
import express from "express/index";
import bodyParser from "body-parser";

import config from "./config";

import { bot } from "./bot";
import { exampleMenu } from "./bot-server/commands/example/example.menu";
import { checkPlayerMenu } from "./bot-server/commands/checkPlayer/checkPlayer.menu";
import { sitestatsMenu } from "./bot-server/commands/sitestats/sitestats.menu";
import { helpMenu } from "./bot-server/commands/help/help.menu";
import { invitationMenu } from "./bot-server/commands/invitation/invitation.menu";
import { widgetMenu } from "./bot-server/commands/widget/widget.menu";

import botEvent from "./lib/botEvent";
import botStatus from "./lib/botStatus";
import botMarket from "./lib/botMarket";
import { SentryManagement } from "./lib/sentry";

import router_apis from "./network-server/apis";
import { reportMenu } from "./bot-server/commands/report/report.menu";
import { bindingMenu } from "./bot-server/commands/binding/binding.menu";
import { httpBfban } from "./lib";
import router from "./network-server/apis";

try {
  /// 机器人服务
  class Main {
    protected mode: any = [SentryManagement, botStatus, botEvent, botMarket];
    protected commands: any = [helpMenu, checkPlayerMenu, sitestatsMenu, widgetMenu, reportMenu, bindingMenu, invitationMenu];

    constructor() {
      // 初始身份令牌
      httpBfban.createToken();

      this.ready();
    }

    ready() {
      if (config.__DEBUG__) {
        this.commands.concat(exampleMenu);
      }
      const logFolderPath = upath.join(__dirname, "", "logs", new Date().toISOString());
      if (!fs.existsSync(logFolderPath)) {
        fs.mkdirSync(logFolderPath, { recursive: true });
      }
      const errorLogStream = fs.createWriteStream(upath.join(logFolderPath, `${config.name}-error.log`), { flags: "a" });
      const infoLogStream = fs.createWriteStream(upath.join(logFolderPath, `${config.name}-info.log`), { flags: "a" });

      this.mode.forEach((m: new () => any) => new m());

      bot.logger.fields.name = config.name;
      bot.logger.addStream({ level: "error", stream: errorLogStream });
      bot.logger.addStream({ level: "info", stream: infoLogStream });

      bot.help = "/";
      // bot.processMsg=(msg)=>{
      //   console.log(msg);
      //
      //   if (msg.content[0].indexOf("/") >= 0) {
      //     bot.commandMap.forEach(i => {
      //       if (i.trigger == "")
      //     })
      //   }
      // }

      bot.addCommands(...this.commands);
      bot.connect();

      bot.logger.info("Initialization: " + config.name + " initialization start");
    }
  }

  /// 网络服务
  class ExMain {
    app = express();

    constructor() {
      // Initialize APP
      this.init();
    }

    init() {
      this.app.use(bodyParser.json());

      this.app.use("/api", router_apis);

      router.get("/auths.txt", async (req: any, res: any, next: any) => {
        try {
          res.status(200).text('');
        } catch (e) {
          bot.logger.error(e);
        }
      });

      this.app.use((req, res, next) => {
        res.status(500);
      });

      this.app.use((err, res) => { // error handler
        res.status(500).json({ error: 1, code: "server.error" });
      });

      this.app.listen(config.port, config.address, async () => {
        console.log(`App start at ${config.address}:${config.port}`);
      });
    }
  }

  new Main();
  new ExMain();
} catch (err) {
  bot.logger.error(err);
}
