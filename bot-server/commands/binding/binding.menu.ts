import config from "../../../config";

import { Card, MenuCommand } from "kbotify";
import { bindingId } from "./binding.id";
import { bindingCheck } from "./binding.check";

class BindingMenu extends MenuCommand {
  code = "binding";
  response = "private";
  trigger = "binding";
  help = "";

  menu = new Card()
    .addTitle(this.code)
    .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
    .toString();
  useCardMenu = true;
}

export const bindingMenu = new BindingMenu(bindingId, bindingCheck);
