import config from "../../../config";

import { BaseSession, Card, MenuCommand, ResultTypes } from "kbotify";
import { bindingId } from "./binding.id";
import { bindingCheck } from "./binding.check";
import { CardExtend } from "../../../data/cardExp";

class BindingMenu extends MenuCommand {
  code = "binding";
  response = "private";
  trigger = "binding";
  help = "";

  menu: any = new CardExtend()
    .addTitle(`🔴 ${this.code}`, true)
    .addMenu(this)
    .toString();
  useCardMenu = true;
}

export const bindingMenu = new BindingMenu(bindingId, bindingCheck);
