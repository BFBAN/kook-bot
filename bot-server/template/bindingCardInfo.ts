import { Card } from "kbotify";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import BaseTemplate from "./BaseTemplate";

import i18n from "../../langage";

export default class BindingCardTemplate extends BaseTemplate {
  get generation(): Card {
    let message = new Card();
    let data = this.data;

    if (!data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.leaderboard.title", this.lang))
      .addDivider();

    message.addText(`id: ${data.id}`);
    message.addText(`username: ${data.username}`);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}
