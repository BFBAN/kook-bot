import { bot } from "../../bot";
import { ButtonClickEvent } from "kaiheila-bot-root";

class BotEvent {
  constructor() {
    /**
     * 私信
     */
    bot.messageSource.on("message", (e) => {
      bot.logger.debug("message:", e);
    });

    /**
     * md消息
     */
    bot.on('kmarkdownMessage', event => {
      bot.logger.debug("kmarkdownMessage:", event);
    })

    /**
     * 触发事件
     */
    bot.event.on('buttonClick', event => {
      bot.logger.debug("1buttonClick:", event);
    })
    bot.on('buttonClick', event => {
      bot.logger.debug("2buttonClick:", event);
    })

    bot.on('imageMessage', event => {
      bot.logger.debug("imageMessage:", event);
    })

    bot.on('textMessage', (e) => {
      console.log(e)
    })
  }
}

export default BotEvent;
