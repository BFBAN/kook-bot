import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsTrendTemplate from "../../template/sitestatsTrendTemplate";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";

class SitestatsHot extends AppCommand {
  code = "hot";
  trigger = "hot";
  help = "`.checkban hot (time:week) (limit:5)`";
  intro = "";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    if (!session.args.length) {
      return session.reply(this.help);
    }

    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    let resTrend = await this.getTrend(other);

    if (resTrend) {
      session.replyCard(new SitestatsTrendTemplate(resTrend).generation());
      return ;
    }

    session.reply(":( I have an error");
  };

  /**
   * 获取热度案件
   * @param params.time 查询范围
   * @param params.limit 一页数量
   * @protected
   */
  protected async getTrend(params: any): Promise<AxiosResponse> {
    try {
      return new Promise(async (resolve, reject) => {
        await axios({
          url: this.http.address + "api/" + api.trend,
          method: "get",
          params: {
            "limit": params.get('limit') ?? 5,
            "time": params.get('time') ?? 'week'
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

export const sitestatsHot = new SitestatsHot();
