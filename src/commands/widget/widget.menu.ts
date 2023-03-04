import { BaseSession, Card, MenuCommand } from "kbotify";
import { widgetCard } from "./widget.card";
import config from "../../../config";
import i18n from "../../../langage";
import commandPack from "../commandPack";

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
