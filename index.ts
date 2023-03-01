import config from "./config";

import { bot } from "./bot";
import { exampleMenu } from "./src/commands/example/example.menu";
import { checkbanMenu } from "./src/commands/checkban/checkban.menu";
import { sitestatsMenu } from "./src/commands/sitestats/sitestats.menu";

import botStatus from "./src/lib/botStatus";

botStatus();

bot.messageSource.on("message", (e) => {
  bot.logger.debug("received:", e);
});

const commands = [checkbanMenu, sitestatsMenu];
if (config.__DEBUG__) {
  commands.concat(exampleMenu);
}

bot.addCommands(...commands);
bot.connect();

bot.logger.debug(`bot init success`);
