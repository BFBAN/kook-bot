import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsTrendTemplate from "../../template/sitestatsTrendTemplate";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";

class SitestatsHot extends AppCommand {
  code = "hot";
  trigger = "hot";
  help = ".sitestats hot (limit:10) (limit:weekly)";
  intro = "查询网站近期热门案件";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    try {
      const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);
      let resTrend = await this.getTrend(other);

      if (resTrend.data.length <= 0 && !resTrend) {
        session.reply("抱歉，没有找到数据");
        return;
      }

      session.replyCard(new SitestatsTrendTemplate(resTrend).generation(this.help));
    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation());
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
    try {
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
    } catch (err) {
      bot.logger.error(err);
      throw err;
    }
  }
}

export const sitestatsHot = new SitestatsHot();
