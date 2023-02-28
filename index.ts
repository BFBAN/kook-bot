import { bot } from './bot';
import { echoMenu } from './src/commands/echo/echo.menu';
import { checkbanMenu } from './src/commands/checkban/checkban.menu';

bot.messageSource.on('message', (e) => {
    bot.logger.debug(`received:`, e);
});

bot.addCommands(echoMenu, checkbanMenu);

bot.connect();

bot.logger.debug('system init success');