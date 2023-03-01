import { Card, MenuCommand } from "kbotify";
import { sitestatsHot } from "./sitestats.hot";

class SitestatsMenu extends MenuCommand {
  code = "sitestats";
  trigger = "sitestats";
  help = ".sitestats 菜单";
}

export const sitestatsMenu = new SitestatsMenu(sitestatsHot);
