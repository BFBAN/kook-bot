import { Card } from "kbotify";
import BaseTemplate from "./BaseTemplate";

import i18n from "../../langage";
import { CardExtend } from "../../data/cardExp";

export default class BindingCardTemplate extends BaseTemplate {
  public get generation(): Card {
    let message = new CardExtend();
    let data = this.data;

    if (!data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.check.title", this.lang))
      .addDivider();

    message.addText(`id: ${data.id}`);
    message.addText(`username: ${data.username}`);

    // set card footer
    message.addFooter();

    return message;
  }
}
