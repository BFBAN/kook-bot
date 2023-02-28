const config = {
    __DEBUG__: false, // WARNING: THIS WILL ENABLE NO AUTH & NO CAPTCHA FEATHURE

    address: process.env.address,
    port: process.env.port || 5000,

    // KOOK 鉴权钥匙
    // 前往 https://www.kookapp.cn/app 创建机器人取得
    "kookAuth": {
        "khlkey": "encrypt key here",
        "khltoken": "token here",
        "khlverify": "verify token here"
    },
}

export default config;