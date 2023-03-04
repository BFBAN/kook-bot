import { Card, MenuCommand } from "kbotify";
import { sitestatsHot } from "./sitestats.hot";
import { sitestatsSite } from "./sitestats.site";
import { sitestatsAdmin } from "./sitestats.admin";
import config from "../../../config";
import i18n from "../../../langage";

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

export const sitestatsMenu = new SitestatsMenu(sitestatsHot, sitestatsSite, sitestatsAdmin);
