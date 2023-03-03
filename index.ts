import * as fs from "fs";
import upath, { parse } from "upath";

import config from "./config";

import { bot } from "./bot";
import { exampleMenu } from "./src/commands/example/example.menu";
import { checkbanMenu } from "./src/commands/checkban/checkban.menu";
import { sitestatsMenu } from "./src/commands/sitestats/sitestats.menu";
import { helpMenu } from "./src/commands/help/help.menu";
import { invitationMenu } from "./src/commands/invitation/invitation.menu";

import botEvent from "./src/lib/botEvent";
import botStatus from "./src/lib/botStatus";

class Main {
  protected mode: any = [botStatus, botEvent];
  protected commands: any = [checkbanMenu, sitestatsMenu, helpMenu, invitationMenu];

  constructor() {
    this.ready();
  }

  ready() {
    try {
      if (config.__DEBUG__) {
        this.commands.concat(exampleMenu);
      }
      // const logFolderPath = upath.join(__dirname, "", "logs", new Date().toISOString());
      // if (!fs.existsSync(logFolderPath)) {
      //   fs.mkdirSync(logFolderPath, { recursive: true });
      // }
      // const errorLogStream = fs.createWriteStream(upath.join(logFolderPath, `${config.name}-error.log`), { flags: "a" });
      // const infoLogStream = fs.createWriteStream(upath.join(logFolderPath, `${config.name}-info.log`), { flags: "a" });

      this.mode.forEach((m: new () => any) => new m());

      bot.logger.fields.name = config.name;
      // bot.logger.addStream({ level: "error", stream: errorLogStream });
      // bot.logger.addStream({ level: "info", stream: infoLogStream });

      bot.addCommands(...this.commands);
      bot.connect();

      bot.logger.info("Initialization: " + config.name + " initialization start");
      console.log("Initialization: " + config.name + " initialization start");
    } catch (err) {
      bot.connect();
      bot.logger.error(err);
    }
  }
}

new Main();
