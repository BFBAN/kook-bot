import { Card, MenuCommand } from "kbotify";
import { adminBotOffline } from "./admin.botoffline";
import config from "../../../config";
import i18n from "../../../langage";

class AdminMenu extends MenuCommand {
  code = "admin";
  trigger = "admin";
  help = "";

  menu = new Card()
    .addTitle(`🔴 ${this.code}`, true)
    .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
    .toString();
  useCardMenu = true;
}

export const adminMenu = new AdminMenu(adminBotOffline);
