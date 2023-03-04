import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsCalcCountTemplate from "../../template/SitestatsCalcCountTemplate";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";

class SitestatsSite extends AppCommand {
  code = "site";
  trigger = "site";
  help = ".sitestats site (reports:true) (players:true) (confirmed:true) (registers:true) (banAppeals:true)";
  intro = "sitestats.site.intro";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      let resStatistics = await this.getStatistics(other);

      if (!resStatistics) {
        session.reply('抱歉，没有找到数据');
        return;
      }

      session.replyCard(new SitestatsCalcCountTemplate(resStatistics).generation(other.get("lang")));
    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation({
        lang: other.get("lang"),
        session
      }));
      bot.logger.error(err);
    }
  };

  /**
   * 网站统计信息
   * @param params.time
   * @protected
   */
  protected async getStatistics(params: any): Promise<AxiosResponse> {
    return new Promise(async (resolve, reject) => {
      await axios({
        url: this.http.address + "api/" + api.statistics,
        method: "get",
        params: {
          reports: params.get("reports") ?? true,
          players: params.get("players") ?? true,
          confirmed: params.get("confirmed") ?? true,
          registers: params.get("registers") ?? true,
          banAppeals: params.get("banAppeals") ?? true,
          from: 1514764800000
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

export const sitestatsSite = new SitestatsSite();
