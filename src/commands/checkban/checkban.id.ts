import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";

class CheckbanId extends AppCommand {
  code = "id";
  trigger = "id";
  help = ".cheackban id [id:number]";
  intro = "使用id查询案件";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    try {
      if (!session.args.length) {
        return session.reply(this.help);
      }

      const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

      if (!new RegExp(/^[0-9]+.?[0-9]*/).test(mainValue)) {
        session.reply(`检查您的参数非数字`);
        return;
      }

      let player_info = await this.getPlayerInfo(mainValue);

      if (!player_info) {
        session.reply("没有找到玩家");
        return;
      }

      // send playerCard message
      let id = await session.replyCard(new PlayerCardTemplate(player_info).generation());

      setTimeout(function() {
        session.updateMessage(<string>id.msgSent?.msgId, "test");
      }, 30000);

    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation());
      bot.logger.error(err);
    }
  };

  /**
   * 获取案件状态
   * @param id
   * @protected
   */
  protected async getPlayerInfo(id: number) {
    try {
      if (!id) {
        throw "缺少id";
      }

      return new Promise(async (resolve, reject) => {
        await axios({
          url: this.http.address + "api/" + api.player,
          method: "get",
          params: {
            "history": true,
            "personaId": id
          }
        }).then(res => {
          if (res.data.success === 1) {
            return resolve(res.data);
          }
          reject(res);
        }).catch(err => {
          return reject(err);
        });
      });
    } catch (err) {
      bot.logger.error(err);
    }
  }
}

export const checkbanId = new CheckbanId();
