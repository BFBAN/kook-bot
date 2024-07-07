import config from "../../../config";

import { Card, MenuCommand } from "kbotify";
import { checkPlayerId } from "./checkPlayer.id";
import { checkPlayerName } from "./checkPlayer.name";

class CheckPlayerMenu extends MenuCommand {
  code = "checkplayer";
  trigger = "checkplayer";
  help = "";

  menu = new Card()
    .addTitle(this.code)
    .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
    .toString();
  useCardMenu = true;
}

export const checkPlayerMenu = new CheckPlayerMenu(checkPlayerId, checkPlayerName);
