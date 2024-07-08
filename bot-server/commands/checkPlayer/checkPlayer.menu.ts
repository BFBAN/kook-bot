import config from "../../../config";

import { Card, MenuCommand } from "kbotify";
import { checkPlayerId } from "./checkPlayer.id";
import { checkPlayerName } from "./checkPlayer.name";
import { CardExtend } from "../../../data/cardExp";

class CheckPlayerMenu extends MenuCommand {
  code = "checkplayer";
  trigger = "checkplayer";
  help = "";

  menu: any = new CardExtend()
    .addTitle(`🔴 ${this.code}`, true)
    .addMenu(this)
    .toString();
  useCardMenu = true;
}

export const checkPlayerMenu = new CheckPlayerMenu(checkPlayerId, checkPlayerName);
