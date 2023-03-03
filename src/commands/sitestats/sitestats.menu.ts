import { Card, MenuCommand } from "kbotify";
import { sitestatsHot } from "./sitestats.hot";
import { sitestatsSite } from "./sitestats.site";
import { sitestatsAdmin } from "./sitestats.admin";

class SitestatsMenu extends MenuCommand {
  code = "sitestats";
  trigger = "sitestats";
  help = "";
}

export const sitestatsMenu = new SitestatsMenu(sitestatsHot, sitestatsSite, sitestatsAdmin);
