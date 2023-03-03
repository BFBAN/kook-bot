import { Card, MenuCommand } from "kbotify";
import { adminBotOffline } from "./admin.botoffline";

class AdminMenu extends MenuCommand {
  code = "admin";
  trigger = "admin";
  help = "管理机器人";

  menu = new Card().addText(this.help).toString();
  useCardMenu = true; // 使用卡片菜单
}

export const adminMenu = new AdminMenu(adminBotOffline);
