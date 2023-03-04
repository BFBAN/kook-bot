import config from "../../../config";

import { Card, MenuCommand } from "kbotify";
import { checkbanId } from "./checkban.id";
import { checkbanName } from "./checkban.name";

class CheckbanMenu extends MenuCommand {
  code = "checkban";
  trigger = "checkban";
  help = "";

  menu = new Card()
    .addTitle(this.code)
    .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
    .toString();
  useCardMenu = true;
}

export const checkbanMenu = new CheckbanMenu(checkbanId, checkbanName);
