import commandPack from "../commandPack";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";
import { api, httpBfban } from "../../../lib";

class CheckPlayerId extends AppCommand {
  code = "id";
  trigger = "id";
  help = ".checkplayer id [id:number]";
  intro = "checkplayer.id.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const commandTool: any = new commandPack.CommandFactory(this).addAttr({ session }),
      { mainValue, other } = commandTool.pack(session.args);

    try {
      // 检查参数有效性，并丢出提示
      if (!commandTool.check()) {
        return;
      }

      if (!new RegExp(/^[0-9]+.?[0-9]*/).test(mainValue)) {
        await session.reply(i18n.t("checkban.id.typeError", other.get("lang")));
        return;
      }

      let player_info = await this.getPlayerInfo(mainValue);

      if (!player_info) {
        await session.reply(i18n.t("checkban.id.notSuchPlayer", other.get("lang")));
        return;
      }

      // send playerCard message
      await session.replyCard(new PlayerCardTemplate().addAttr({
        lang: other.get("lang"),
        data: player_info
      }).generation);
    } catch (err) {
      await session.replyCard(new ErrorTemplate()
        .addError(err)
        .addSession(session)
        .addAttr({ lang: other.get("lang") }).generation);
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

    const result = await httpBfban.get(api.bfbanApi.cheaters, {
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
  }
}

export const checkPlayerId = new CheckPlayerId();
