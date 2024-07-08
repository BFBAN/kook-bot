import { Card, MenuCommand } from "kbotify";
import { widgetCard } from "./widget.card";
import config from "../../../config";
import { CardExtend } from "../../../data/cardExp";

class WidgetMenu extends MenuCommand {
  code = "widget";
  trigger = "widget";
  help = "widget.help";

  menu: any = new CardExtend()
    .addTitle(`🔴 ${this.code}`, true)
    .addMenu(this)
    .toString();
  useCardMenu = true;
}

export const widgetMenu = new WidgetMenu(widgetCard);
