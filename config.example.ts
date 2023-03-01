const config = {
    __DEBUG__: false, // WARNING: THIS WILL ENABLE NO AUTH & NO CAPTCHA FEATHURE

    address: '0.0.0.0',
    port: 5000,

    // KOOK 鉴权钥匙
    // 前往 https://www.kookapp.cn/app 创建机器人取得
    "kookAuth": {
        "khlkey": "encrypt key here",
        "khltoken": "token here",
        "khlverify": "verify token here"
    },

    // 机器人邀请地址
    "kookBotInviteUrl": "",

}

export default config;
