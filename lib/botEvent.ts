import { bot } from "../bot";

class BotEvent {
  constructor() {
    /**
     * 私信
     */
    bot.messageSource.on("message", (e) => {
    });

    /**
     * md消息
     */
    bot.on('kmarkdownMessage', event => {
    })

    /**
     * 触发事件
     */
    bot.on('buttonClick', event => {
    })

    bot.on('imageMessage', event => {
    })

    bot.on('textMessage', (e) => {
      console.log(e)
    })
  }
}

export default BotEvent;
