import { I18nResolver } from "i18n-ts";

// langages list
const zh = require("./src/lang/zh.json");
const en = require("./src/lang/en.json");

const conf = {
  zh: zh,
  en: en,
  default: zh
};

const i18n = new I18nResolver(conf, 'zh');

export default i18n;
