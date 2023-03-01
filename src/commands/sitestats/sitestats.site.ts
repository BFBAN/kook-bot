import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsCalcCountTemplate from "../../template/SitestatsCalcCountTemplate";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";

class SitestatsSite extends AppCommand {
  code = "site";
  trigger = "site";
  help = "`.checkban site (reports:true) (players:true) (confirmed:true) (registers:true) (banAppeals:true)`";
  intro = "";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    if (!session.args.length) {
      return session.reply(this.help);
    }

    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    let res = await this.getStatistics(other);

    if (res) {
      session.replyCard(new SitestatsCalcCountTemplate(res).generation());
      return;
    }

    session.reply(":( I have an error");
  };

  /**
   * 网站统计信息
   * @param params.time
   * @protected
   */
  protected async getStatistics(params: any): Promise<AxiosResponse> {
    try {
      return new Promise(async (resolve, reject) => {
        await axios({
          url: this.http.address + "api/" + api.statistics,
          method: "get",
          params: {
            reports: params.get("reports") ?? true,
            players: params.get("players") ?? true,
            confirmed: params.get("confirmed") ?? true,
            registers: params.get("registers") ?? true,
            banAppeals: params.get("banAppeals") ?? true
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

export const sitestatsSite = new SitestatsSite();
