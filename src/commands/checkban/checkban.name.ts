import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { TextMessage } from "kbotify/dist/core/message";
import { SearchListTemplate } from "../../template/searchListTemplate";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";

const packageConf = require("../../../package.json");

class CheckbanName extends AppCommand {
  code = "name";
  trigger = "name";
  help = "`.checkban name [name]`";
  intro = "";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    if (!session.args.length) {
      return session.reply(this.help);
    }

    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);
    const that = this;
    let replyId: any;
    let message = new Card();
    let resSearch = await this.onSearch(mainValue, other);

    if (resSearch) {
      // 生成搜索列表卡片
      if (resSearch.data.length > 0) {
        message = new SearchListTemplate(resSearch.data).generation();
      }

      // 监听回复
      // 仅在搜索结果存在>1时，则需要选择卡片，小于时取第一
      if (resSearch.data.length > 1) {
        session.setTextTrigger(/^[0-9]*$/g, 1000 * 60, async function(msg: TextMessage) {
          let selectNumber = Number(msg.content);
          // 选择器仅在0到搜索结果长度之内
          if (selectNumber >= 0 && selectNumber <= (other.limit ?? 5)) {
            let player_info = await that.getPlayerInfo(resSearch.data[selectNumber].originPersonaId);
            if (player_info) {
              // 发送玩家卡片
              session.replyCard(new PlayerCardTemplate(player_info).generation());
              return;
            }
          } else {
            session.reply("请输入数字，且存在上方数字内");
          }
        });
      }

      replyId = session.replyCard(message);
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

  /**
   * 搜索
   * @param data
   * @protected
   */
  protected async onSearch(value: string, params: any): Promise<AxiosResponse> {
    try {
      return new Promise(async (resolve, reject) => {
        await axios({
          url: this.http.address + "api/" + api.search,
          method: "get",
          params: {
            game: params.get("game") ?? "all",
            gameSort: params.get("sort") ?? "default",
            skip: 0,
            limit: params.get("limit") ?? 5,
            type: "player",
            param: value ?? ""
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

export const checkbanName = new CheckbanName();
