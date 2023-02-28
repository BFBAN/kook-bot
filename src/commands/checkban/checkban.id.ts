import { AppCommand, AppFunc, BaseSession } from 'kbotify';

class CheckbanId extends AppCommand {
    code = 'checkban';
    trigger = 'checkban';
    help = '`.checkban id:[案件id]`';
    intro = '';

    func: AppFunc<BaseSession> = async (session) => {
        console.log(session);
        if (!session.args.length) {
            return session.reply(this.help);
        }

        return session.quote(`${session.args}`);
    };
}

export const checkbanId = new CheckbanId();