import { KBotify } from 'kbotify';
import config from './config';

export const bot = new KBotify({
    mode: 'websocket',
    token: config.kookAuth.khltoken,
    port: config.port,
    verifyToken: config.kookAuth.khlverify,
    key: config.kookAuth.khlkey,
    ignoreDecryptError: false,
    debug: config.__DEBUG__
});
