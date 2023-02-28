import { Card, MenuCommand } from 'kbotify';
import { checkbanId } from './checkban.id';

class CheckbanMenu extends MenuCommand {
    code = 'checkban';
    trigger = 'checkban';
    help = '.checkban 菜单';
    intro = '菜单';
    menu = new Card()
        .addText('一些卡片里需要展示的东西')
        .addText('.checkban id:[id]')
        .addText('.checkban name:[name]').toString();
    useCardMenu = true;
}
export const checkbanMenu = new CheckbanMenu(checkbanId);
