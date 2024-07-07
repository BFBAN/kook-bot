import { MenuCommand } from "kbotify";
import config from "../../../config";
import { CardExtend } from "../../../data/CardExp";

class InvitationMenu extends MenuCommand {
  code = "invitation";
  trigger = "invitation";
  help = "invitation.help";
  menu = this.getContent();
  useCardMenu = true;

  protected getContent(): string {
    let message = new CardExtend();
    message.addText("🔗👉🏻🤖: " + config.kookBotInviteUrl);

    // set card footer
    message.addFooter();
    return message.toString();
  }
}

export const invitationMenu = new InvitationMenu();
