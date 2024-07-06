import config from "../../../config";

import { Card, MenuCommand } from "kbotify";
import { reportName } from "./report.name";

class ReportMenu extends MenuCommand {
  code = "report";
  trigger = "report";
  help = "";

  menu = new Card()
    .addTitle(this.code)
    .addText(`${config.botWebSite}/docs/command/${this.trigger}`)
    .toString();
  useCardMenu = true;
}

export const reportMenu = new ReportMenu(reportName);
