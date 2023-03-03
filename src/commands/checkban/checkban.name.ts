import axios, { AxiosError, AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import { Lock, LockConf } from "../../lib/lock";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { TextMessage } from "kbotify/dist/core/message";
import { SearchListTemplate } from "../../template/searchListTemplate";
import { PlayerCardTemplate } from "../../template/playerCardTemplate";
import { ErrorTemplate } from "../../template/errorTemplate";

class CheckbanName extends AppCommand {
  code = "name";
  trigger = "name";
  help = ".cheackban name [name:string] (game:all) (sort:default) (limit:5)";
  intro = "使用名称查询玩家状态";

  http: Http = new Http();
  expirationTime = 1000 * 10;

  func: AppFunc<BaseSession> = async (session) => {
    try {
      if (!session.args.length) {
        return session.reply(this.help);
      }

      const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);
      const that = this;
      let replyId: any;
      let message = new Card();
      let resSearch = await this.onSearch(mainValue, other);
      let timer: any = null;

      if (!resSearch) {
        return session.reply("抱歉，我没有找到任何结果");
      }

      // 生成搜索列表卡片
      if (resSearch.data.length > 0) {
        message = new SearchListTemplate(resSearch.data).generation(other, mainValue, this.expirationTime);
        replyId = await session.replyCard(message);
      }

      if (resSearch.data.length > 1) {
        // 监听回复
        session.setTextTrigger(/^[0-9]*$/g, this.expirationTime, async function(msg: TextMessage) {
          let selectNumber = Number(msg.content);
          // 选择器仅在0到搜索结果长度之内
          if (selectNumber >= 0 && selectNumber <= (other.limit ?? 5)) {
            let player_info = await that.getPlayerInfo(resSearch.data[selectNumber].originPersonaId);

            if (player_info) {
              clearTimeout(timer); // 关闭超时计时器

              // 发送玩家卡片
              await session.updateMessage(replyId.msgSent.msgId, new PlayerCardTemplate(player_info).generation().toString());
            } else {
              session.reply("没有找到玩家");
            }
          } else {
            session.reply("请输入数字，且存在上方数字内");
          }
        });

        // 超时操作锁定
        if (replyId.msgSent.msgId) {
          timer = setTimeout(async function() {
            await session.updateMessage(replyId.msgSent.msgId, new SearchListTemplate(resSearch.data).lockWidget().toString());
          }, that.expirationTime);
        }
      }

      // 仅一条数据，默认查询
      else if (resSearch.data.length <= 1) {
        let default_player_info = await that.getPlayerInfo(resSearch.data[0].originPersonaId);

        // 发送玩家卡片
        if (default_player_info) {
          replyId = await session.replyCard(new PlayerCardTemplate(default_player_info).generation());
        } else {
          session.reply("没有找到玩家");
        }

      }

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
  protected async getPlayerInfo(id: number): Promise<AxiosResponse> {
    try {
      if (!id) {
        throw "id";
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
  protected async onSearch(value: string, params: any): Promise<any> {
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
          return reject(err);
        });
      });
    } catch (err) {
      bot.logger.error(err);
    }
  }
}

export const checkbanName = new CheckbanName();
