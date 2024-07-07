import config from "../../config";
import { BaseSession, Card } from "kbotify";

export default class BaseTemplate {
  lang: string = config.i18n.default || "zh-CN";
  data: any;
  help: string | undefined;
  session: BaseSession | undefined;

  public addAttr(attr: { lang?: string, data?: any, help?: any }) {
    if (attr.lang) {
      this.lang = attr.lang;
    }
    if (attr.data) {
      this.data = attr.data;
    }
    if (attr.help) {
      this.help = attr.help;
    }
    return this;
  }

  public addSession (session: BaseSession) {
    this.session = session;
    return this;
  }
}
