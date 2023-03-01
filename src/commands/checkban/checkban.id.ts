import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";

class CheckbanId extends AppCommand {
  code = "id";
  trigger = "id";
  help = "`.checkban id [案件id]`";
  intro = "";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    console.log(session);
    if (!session.args.length) {
      return session.reply(this.help);
    }

    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    if (typeof mainValue != "number") {
      session.reply("not id");
    }

    let player_info = await this.getPlayerInfo(mainValue);

    if (player_info) {
      // send playerCard message
      session.replyCard(new PlayerCardTemplate(player_info).generation());
      return;
    }

    session.reply(":( I have an error");
  };

  /**
   * 获取案件状态
   * @param id
   * @protected
   */
  protected async getPlayerInfo(id: number): Promise<AxiosResponse> {
    try {
      if (!id) {
        throw "id";
      }

      return new Promise(async (resolve, reject) => {

        let res = await axios({
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
          bot.logger.debug(err);
          return reject(err);
        });

      });
    } catch (e) {
      bot.logger.debug(e);
      throw e;
    }
  }
}

export const checkbanId = new CheckbanId();
