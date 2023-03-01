import axios from "axios";
import config from "../../config";
import { bot } from "../../bot";

const botStatus = async () => {
  return new Promise<void>(resolve => {
    axios({
      url: "https://www.kookapp.cn/api/v3/game/activity",
      method: "post",
      headers: {
        "Authorization": `Bot ${config.kookAuth.khltoken}`
      },
      params: {
        id: 1,
        data_type: 2,
        software: "cloudmusic",
        singer: "bfban",
        music_name: "掉线请联系我"
      }
    }).then(res => {
      bot.logger.debug(res);
      resolve();
    }).catch(err => {
      bot.logger.debug(err);
    }).finally(() => {
    });
  })
};

export default botStatus;
