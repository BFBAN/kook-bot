import { Card, MenuCommand } from "kbotify";
import { exampleKmd } from "./exampleo.kmd.app";

class ExampleMenu extends MenuCommand {
  code = "example";
  trigger = "example";
  help = "如需测试KMarkDown请发送 \".example kmd\"";

  menu = new Card()
    .addTitle(`🔴 ${this.code}`, true)
    .addText("一些卡片里需要展示的东西").toString();
  useCardMenu = true; // 使用卡片菜单
}

export const exampleMenu = new ExampleMenu(exampleKmd);
