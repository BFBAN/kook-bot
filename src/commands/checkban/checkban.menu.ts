import { Card, MenuCommand } from "kbotify";
import { checkbanId } from "./checkban.id";
import { checkbanName } from "./checkban.name";

class CheckbanMenu extends MenuCommand {
  code = "checkban";
  trigger = "checkban";
  help = "";
}

export const checkbanMenu = new CheckbanMenu(checkbanId, checkbanName);
