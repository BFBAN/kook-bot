import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsTrendTemplate from "../../template/sitestatsTrendTemplate";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";

class SitestatsHot extends AppCommand {
  code = "hot";
  trigger = "hot";
  help = ".sitestats hot (limit:10) (limit:weekly)";
  intro = "sitestats.hot.intro";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      let resTrend = await this.getTrend(other);

      if (resTrend.data.length <= 0 && !resTrend) {
        session.reply(i18n.t("sitestats.hot.notContent", other.get("lang")));
        return;
      }

      session.replyCard(new SitestatsTrendTemplate(resTrend).generation(this.help));
    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation({
        lang: other.get("lang"),
        session
      }));
      bot.logger.error(err);
    }
  };

  /**
   * 获取热度案件
   * @param params.time 查询范围
   * @param params.limit 一页数量
   * @protected
   */
  protected async getTrend(params: any): Promise<AxiosResponse> {
    return new Promise(async (resolve, reject) => {
      await axios({
        url: this.http.address + "api/" + api.trend,
        method: "get",
        params: {
          "limit": params.get("limit") ?? 10,
          "time": params.get("time") ?? "weekly"
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

export const sitestatsHot = new SitestatsHot();
