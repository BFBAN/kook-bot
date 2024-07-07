import { Card } from "kbotify";
import i18n from "../../langage";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import config from "../../config";

class BindingCardTemplate {
  data: any;
  help: string | undefined;

  constructor(data: any) {
    this.data = data;
  }

  generation({ lang = config.i18n.default } = {}): Card {
    let message = new Card();
    let data = this.data;

    if (!data) {
      return message;
    }

    message
      .addTitle(i18n.t("sitestats.leaderboard.title", lang))
      .addDivider();

    message.addText(`id: ${data.id}`);
    message.addText(`username: ${data.username}`);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    return message;
  }
}

export default BindingCardTemplate;
