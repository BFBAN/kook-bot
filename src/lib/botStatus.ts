import axios from "axios";
import config from "../../config";
import { bot } from "../../bot";

class BotStatus {
  constructor() {
    this.changeBotGameSataus();
  }

  /**
   * 更改TODO事件
   */
  changeBotGameSataus() {
    return new Promise<void>(resolve => {
      axios({
        url: "https://www.kookapp.cn/api/v3/game/activity",
        method: "post",
        headers: {
          "Authorization": `Bot ${config.kookAuth.khltoken}`
        },
        data: { "software": "cloudmusic", "singer": config.name, "music_name": config.botWebSite, "data_type": 2 }
      }).then(res => {
        resolve();
      }).catch(err => {
        bot.logger.error(err);
      });
    });
  }

  remBotGameStatus() {
    if (config.__DEBUG__) {
      return;
    }

    return new Promise<void>(resolve => {
      axios({
        url: "https://www.kookapp.cn/api/v3/game/delete-activity\n",
        method: "post",
        headers: {
          "Authorization": `Bot ${config.kookAuth.khltoken}`
        }
      }).then(res => {
        resolve();
      }).catch(err => {
        bot.logger.error(err);
      });
    });

  }
}

export default BotStatus;
