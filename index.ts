"use strict";
import * as fs from "fs";
import upath from "upath";
import express from "express/index";

import config from "./config";

import { bot } from "./bot";
import { exampleMenu } from "./src/commands/example/example.menu";
import { checkPlayerMenu } from "./src/commands/checkPlayer/checkPlayer.menu";
import { sitestatsMenu } from "./src/commands/sitestats/sitestats.menu";
import { helpMenu } from "./src/commands/help/help.menu";
import { invitationMenu } from "./src/commands/invitation/invitation.menu";
import { widgetMenu } from "./src/commands/widget/widget.menu";

import botEvent from "./src/lib/botEvent";
import botStatus from "./src/lib/botStatus";
import botMarket from "./src/lib/botMarket";
import { SentryManagement } from "./src/lib/sentry";

import router_index from "./router/index";
import { reportMenu } from "./src/commands/report/report.menu";
import { bindingMenu } from "./src/commands/binding/binding.menu";
import { httpBfban } from "./lib";

try {
  /// 机器人
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
      this.app.use("/api", router_index);

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
