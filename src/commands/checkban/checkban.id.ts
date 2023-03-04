import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";

class CheckbanId extends AppCommand {
  code = "id";
  trigger = "id";
  help = ".checkban id [id:number]";
  intro = "checkban.id.intro";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      if (!session.args.length) {
        return session.reply(this.help);
      }

      if (!new RegExp(/^[0-9]+.?[0-9]*/).test(mainValue)) {
        session.reply(i18n.t("checkban.id.typeError", other.get("lang")));
        return;
      }

      let player_info = await this.getPlayerInfo(mainValue);

      if (!player_info) {
        session.reply(i18n.t("checkban.id.notSuchPlayer", other.get("lang")));
        return;
      }

      // send playerCard message
      await session.replyCard(new PlayerCardTemplate(player_info).generation(other.get("lang")));
    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation({
        lang: other.get("lang"),
        session
      }));
      bot.logger.error(err);
    }
  };

  /**
   * 获取案件状态
   * @param id
   * @protected
   */
  protected async getPlayerInfo(id: number) {
    if (!id || id <= 0 || id > Number.MAX_VALUE) {
      throw "Unexpected value";
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
  }
}

export const checkbanId = new CheckbanId();
