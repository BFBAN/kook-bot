import axios, { AxiosResponse } from "axios";
import commandPack from "../commandPack";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { TextMessage } from "kbotify/dist/core/message";
import { SearchListTemplate } from "../../template/searchListTemplate";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";
import { api, httpBfban } from "../../../lib";

class CheckPlayerName extends AppCommand {
  code = "name";
  trigger = "name";
  help = ".checkplayer name [name:string] (game:all) (sort:default) (limit:5)";
  intro = "checkplayer.name.intro";

  expirationTime = 1000 * 30;
  timer: any = null;

  func: AppFunc = async (session) => {
    const commandTool: any = new commandPack.CommandFactory(this).addAttr({ session }),
      { mainValue, other } = commandTool.pack(session.args);

    try {
      // 检查参数有效性，并丢出提示
      if (!commandTool.check()) {
        return;
      }

      const that = this;
      let replyId: any;
      let message: Card = new Card();
      let resSearch = await this.onSearch(mainValue, other);

      if (!resSearch) {
        return session.reply(i18n.t("checkplayer.name.noContent", other.get("lang")));
      }

      if (mainValue.length <= 3) {
        return session.reply(i18n.t("checkplayer.name.underLengthError", other.get("lang")));
      }

      // 生成搜索列表卡片
      if (resSearch.data.length > 0) {
        message = new SearchListTemplate(resSearch.data).generation(other, mainValue, this.expirationTime);
        replyId = await session.replyCard(message);
      }

      if (resSearch.data.length > 1) {
        // 监听按钮
        bot.on("buttonClick", async event => {
          if (session.userId == event.userId) {
            const selectItemData = JSON.parse(event.value);
            await that.sendPlayerCard(
              resSearch,
              selectItemData.uid,
              replyId.msgSent.msgId,
              other,
              session
            );
          }
        });

        // 监听回复
        session.setTextTrigger(/^[0-9]*$/g, this.expirationTime, async function(msg: TextMessage) {
          let selectNumber = Number(msg.content);
          // 选择器仅在0到搜索结果长度之内
          if (selectNumber >= 0 && selectNumber <= (other.get("limit") ?? 5)) {
            if (!resSearch.data[selectNumber].get("originPersonaId")) {
              await session.reply(i18n.t("checkplayer.name.typeError", other.get("lang")));
            }

            await that.sendPlayerCard(
              resSearch,
              resSearch.data[selectNumber].originPersonaId,
              replyId.msgSent.msgId,
              other,
              session
            );
          } else {
            await session.reply(i18n.t("checkplayer.name.typeError", other.get("lang")));
          }
        });

        // 超时操作锁定
        if (replyId.msgSent.msgId) {
          this.timer = setTimeout(async function() {
            await session.updateMessage(replyId.msgSent.msgId, new SearchListTemplate(resSearch.data).lockWidget({
              lang: other.get("lang")
            }).toString());
          }, that.expirationTime);
        }
      }

      // 仅一条数据，默认查询
      else if (resSearch.data.length <= 1) {
        // 发送玩家卡片
        if (resSearch.data[0]) {
          await that.sendPlayerCard(
            resSearch,
            resSearch.data[0].originPersonaId,
            replyId.msgSent.msgId,
            other,
            session
          );
        } else {
          await session.reply(i18n.t("checkplayer.name.noContent", other.get("lang")));
        }

      }

    } catch (err) {
      await session.replyCard(new ErrorTemplate()
        .addError(err)
        .addSession(session)
        .addAttr({ lang: other.get("lang") }).generation);
      bot.logger.error(err);
    }
  };

  /**
   * 发送已生成的案件卡片
   * @param resSearch
   * @param id EaId
   * @param replyId
   * @param other
   * @param session
   * @protected
   */
  protected async sendPlayerCard(
    resSearch: { data: { [x: string]: { originPersonaId: number; }; }; },
    id: number,
    replyId: string,
    other: { get: (arg0: string) => string | undefined; },
    session: BaseSession
  ) {
    let player_info = await this.getPlayerInfo(id);

    if (player_info) {
      clearTimeout(this.timer); // 关闭超时计时器

      // 发送玩家卡片
      await session.updateMessage(replyId, new PlayerCardTemplate().addAttr({
        lang: other.get("lang"),
        data: player_info
      }).generation.toString());
    } else {
      await session.reply(i18n.t("checkplayer.name.noContent", other.get("lang")));
    }
  }

  /**
   * 获取案件信息
   * @param id
   * @protected
   */
  protected async getPlayerInfo(id: number): Promise<AxiosResponse> {
    if (!id) {
      throw "Missing id";
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

  /**
   * 搜索
   * @protected
   * @param value
   * @param params
   */
  protected async onSearch(value: string, params: any) {
    const result = await httpBfban.get(api.bfbanApi.search, {
        params: {
          game: params.get("game") ?? "all",
          gameSort: params.get("sort") ?? "default",
          skip: 0,
          limit: params.get("limit") ?? 5,
          type: "player",
          param: value ?? ""
        }
      }),
      d = result.data;

    if (d.error) {
      throw d.message;
    }

    return d;
  }
}

export const checkPlayerName = new CheckPlayerName();
