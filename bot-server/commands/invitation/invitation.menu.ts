import { Card, MenuCommand } from "kbotify";
import config from "../../../config";
import { CardExtend } from "../../../data/cardExp";

class InvitationMenu extends MenuCommand {
  code = "invitation";
  trigger = "invitation";
  help = "invitation.help";

  menu: any | Card = new CardExtend()
    .addTitle("🔗👉🏻🤖", true)
    .addDivider()
    .addText(config.kookBotInviteUrl)
    .addFooter();
  useCardMenu = true;
}

export const invitationMenu = new InvitationMenu();
