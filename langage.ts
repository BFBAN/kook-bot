import config from "./config";

class I18n {
  lang: any;

  constructor(data: any) {
    this.lang = data;
  }

  t(n: any, l: string = config.i18n.default) {
    const langObject = this.lang[l] ?? {};
    const t = this.i(n.split("."), langObject);
    return t ?? n;
  }

  i(p: Array<any>, o: Object) {
    return p.reduce(function(xs: any, x: any) {
      return (xs && xs[x]) ? xs[x] : null;
    }, o);
  }
}

// langages list
const zh = require("./src/lang/zh.json");
const en = require("./src/lang/en.json");

const i18n = new I18n({ "en-US": en, "zh-CN": zh });

export default i18n;
