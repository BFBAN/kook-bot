const config = {
  __DEBUG__: false, // WARNING: THIS WILL ENABLE NO AUTH & NO CAPTCHA FEATHURE
  name: "BFBAN",
  address: "0.0.0.0",
  port: 5000,

  version: "0.0.1",
  languages: ["en-US", "zh-CN"],

  // KOOK 鉴权钥匙
  // 前往 https://www.kookapp.cn/app 创建机器人取得
  "kookAuth": {
    "khlkey": "encrypt key here",
    "khltoken": "token here",
    "khlverify": "verify token here"
  },

  // 机器人邀请地址
  "kookBotInviteUrl": "",
  // 机器人网站
  "botWebSite": "https://cabbagelol.github.io/kook-bot-docs",
  // 官网
  "webSite": "https://bfban.com",

  "i18n": {
    "default": "zh-CN"
  },

  // botMarket 地址
  // uuid 前往网站申请
  "botMarket": {
    "uuid": "",
    "origin": "bot.gekj.net"
  }
};

export default config;
