import commandPack from "../commandPack";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";
import { api, httpBfban } from "../../../lib";
import LeaderboardTemplate from "../../template/leaderboardTemplate";

class SitestatsLeaderboard extends AppCommand {
  code = "leaderboard";
  trigger = "leaderboard";
  help = ".sitestats leaderboard (isBot:true) (time:weekly) (report:true) (community:true) (achievement:true)";
  intro = "sitestats.leaderboard.intro";

  func: AppFunc<BaseSession> = async (session) => {
    const commandTool: any = new commandPack.CommandFactory(this).addAttr({ session }),
      { mainValue, other } = commandTool.pack(session.args);

    try {
      let resStatistics = await this.getLeaderboard(other);

      if (!resStatistics) {
        await session.reply("抱歉，没有找到数据");
        return;
      }

      await session.replyCard(new LeaderboardTemplate().addAttr({ data: resStatistics, help: this.help }).generation);
    } catch (err) {
      await session.replyCard(new ErrorTemplate()
        .addError(err)
        .addSession(session)
        .addAttr({ lang: other.get("lang") }).generation);
      bot.logger.error(err);
    }
  };

  /**
   * 排行榜单
   * @param params.time
   * @protected
   */
  protected async getLeaderboard(params: any) {
    const result = await httpBfban.get(api.bfbanApi.activeStatistical, {
        params: {
          isBot: params.get("isBot") ?? true,
          time: params.get("time") ?? "weekly",
          report: params.get("report") ?? true,
          community: params.get("community") ?? true,
          achievement: params.get("achievement") ?? true
        }
      }),
      d = result.data;

    if (d.error === 1) {
      throw d.message;
    }

    return d;
  }
}

export const sitestatsLeaderboard = new SitestatsLeaderboard();
