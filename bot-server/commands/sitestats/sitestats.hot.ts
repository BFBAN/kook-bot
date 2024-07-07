import commandPack from "../commandPack";
import SitestatsTrendTemplate from "../../template/sitestatsTrendTemplate";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";
import { api, httpBfban } from "../../../lib";

class SitestatsHot extends AppCommand {
  code = "hot";
  trigger = "hot";
  help = ".sitestats hot (limit:10) (time:weekly)";
  intro = "sitestats.hot.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      let resTrend = await this.getTrend(other);

      if (resTrend.data.length <= 0 && !resTrend) {
        await session.reply(i18n.t("sitestats.hot.notContent", other.get("lang")));
        return;
      }

      await session.replyCard(new SitestatsTrendTemplate().addAttr({
        help: this.help,
        data: resTrend
      }).generation);
    } catch (err) {
      await session.replyCard(new ErrorTemplate(err).generation({
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
  protected async getTrend(params: any) {
    const result = await httpBfban.get(api.bfbanApi.trend, {
        params: {
          "limit": params.get("limit") ?? 10,
          "time": params.get("time") ?? "weekly"
        }
      }),
      d = result.data;

    if (d.error == 1) {
      throw d.message;
    }

    return d;
  }
}

export const sitestatsHot = new SitestatsHot();
