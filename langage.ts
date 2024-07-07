import config from "./config";

class I18n {
  lang: any;

  constructor(data: any) {
    this.lang = data;
  }

  public t(n: any, l: string = config.i18n.default) {
    try {
      if (config.i18n.languages.indexOf(l) < 0) {
        throw "No corresponding translation found, only support:" + config.i18n.languages.toString()
      }

      const langObject = this.lang[l] ?? {};
      const t = this.i(n.split("."), langObject);
      return t ?? n;
    } catch (err) {
      console.log(err);
    }
  }

  private i(p: Array<any>, o: Object) {
    return p.reduce(function(xs: any, x: any) {
      return (xs && xs[x]) ? xs[x] : null;
    }, o);
  }
}

// languages list
const zh = require("./bot-server/lang/zh.json");
const en = require("./bot-server/lang/en.json");

const i18n = new I18n({ "en-US": en, "zh-CN": zh });

export default i18n;
