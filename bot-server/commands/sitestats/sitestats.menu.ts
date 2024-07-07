import { Card, MenuCommand } from "kbotify";
import { sitestatsHot } from "./sitestats.hot";
import { sitestatsSite } from "./sitestats.site";
import { sitestatsLeaderboard } from "./sitestats.leaderboard";

import config from "../../../config";

class SitestatsMenu extends MenuCommand {
  code = "sitestats";
  trigger = "sitestats";
  help = "sitestats.help";

  menu = new Card()
    .addTitle(this.code)
    .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
    .toString();
  useCardMenu = true;
}

export const sitestatsMenu = new SitestatsMenu(sitestatsHot, sitestatsSite, sitestatsLeaderboard);
