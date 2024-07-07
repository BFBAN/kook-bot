import { Card } from "kbotify";
import BaseTemplate from "./BaseTemplate";

export default class NotFoundTemplate extends BaseTemplate {
  public get generation(): Card {
    let card = new Card();
    return card;
  }
}
