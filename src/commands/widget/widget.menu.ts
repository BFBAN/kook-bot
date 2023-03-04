import { BaseSession, Card, MenuCommand } from "kbotify";
import { widgetCard } from "./widget.card";
import config from "../../../config";
import i18n from "../../../langage";
import commandPack from "../commandPack";

class WidgetMenu extends MenuCommand {
  code = "widget";
  trigger = "widget";
  help = "widget.help";

  func(session: BaseSession) {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    session.replyCard(new Card()
      .addTitle(i18n.t(this.help, other.get("lang") ?? config.i18n.default))
      .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
      .toString());
    return super.func(session);
  }
}

export const widgetMenu = new WidgetMenu(widgetCard);
