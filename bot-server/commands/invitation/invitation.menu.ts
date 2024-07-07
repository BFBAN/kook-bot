import { Card, MenuCommand } from "kbotify";
import config from "../../../config";
import { BaseFooterTemplate } from "../../template/baseFooterTemplate";

class InvitationMenu extends MenuCommand {
  code = "invitation";
  trigger = "invitation";
  help = "invitation.help";
  menu = this.getContent();
  useCardMenu = true;

  protected getContent(): string {
    let message = new Card();
    message.addText("🔗👉🏻🤖: " + config.kookBotInviteUrl);

    // set card footer
    message = new BaseFooterTemplate().add(message);
    return message.toString();
  }
}

export const invitationMenu = new InvitationMenu();
