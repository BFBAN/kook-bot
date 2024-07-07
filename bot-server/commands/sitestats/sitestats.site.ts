import commandPack from "../commandPack";
import SitestatsCalcCountTemplate from "../../template/SitestatsCalcCountTemplate";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";
import { api, httpBfban } from "../../../lib";

class SitestatsSite extends AppCommand {
  code = "site";
  trigger = "site";
  help = ".sitestats site (reports:true) (players:true) (confirmed:true) (registers:true) (banAppeals:true) (admins:true)";
  intro = "sitestats.site.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      let resStatistics = await this.getStatistics(other);

      if (!resStatistics) {
        await session.reply("抱歉，没有找到数据");
        return;
      }

      await session.replyCard(new SitestatsCalcCountTemplate(resStatistics).generation(other.get("lang")));
    } catch (err) {
      await session.replyCard(new ErrorTemplate(err).generation({
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
  protected async getStatistics(params: any) {
    const result = await httpBfban.get(api.bfbanApi.statistics, {
        params: {
          reports: params.get("reports") ?? true,
          players: params.get("players") ?? true,
          confirmed: params.get("confirmed") ?? true,
          registers: params.get("registers") ?? true,
          banAppeals: params.get("banAppeals") ?? true,
          admins: params.get("admins") ?? true,
          from: 1514764800000
        }
      }),
      d = result.data;

    if (d.error === 1) {
      throw d.message;
    }

    return result;
  }
}

export const sitestatsSite = new SitestatsSite();
