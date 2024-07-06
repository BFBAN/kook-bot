import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";
import { httpBfban } from "../../../lib";

class CheckPlayerId extends AppCommand {
  code = "id";
  trigger = "id";
  help = ".checkplayer id [id:number]";
  intro = "checkplayer.id.intro";
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
      const result = await httpBfban.get(api.players, {
          params: {
            "history": true,
            "personaId": id
          }
        }),
        d = result.data;

      if (d.error === 1) {
        throw d.message;
      }

      return d;
    });
  }
}

export const checkPlayerId = new CheckPlayerId();
