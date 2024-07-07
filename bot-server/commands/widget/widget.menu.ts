import { Card, MenuCommand } from "kbotify";
import { widgetCard } from "./widget.card";
import config from "../../../config";

class WidgetMenu extends MenuCommand {
  code = "widget";
  trigger = "widget";
  help = "widget.help";

  menu = new Card()
    .addTitle(this.code)
    .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
    .toString();
  useCardMenu = true;
}

export const widgetMenu = new WidgetMenu(widgetCard);
