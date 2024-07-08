import { Card, MenuCommand } from "kbotify";
import { sitestatsHot } from "./sitestats.hot";
import { sitestatsSite } from "./sitestats.site";
import { sitestatsLeaderboard } from "./sitestats.leaderboard";

import config from "../../../config";
import { CardExtend } from "../../../data/cardExp";

class SitestatsMenu extends MenuCommand {
  code = "sitestats";
  trigger = "sitestats";
  help = "sitestats.help";

  menu:any = new CardExtend()
    .addTitle(`🔴 ${this.code}`, true)
    .addMenu(this)
    .toString();
  useCardMenu = true;
}

export const sitestatsMenu = new SitestatsMenu(sitestatsHot, sitestatsSite, sitestatsLeaderboard);
