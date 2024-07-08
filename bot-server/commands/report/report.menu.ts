import config from "../../../config";

import { MenuCommand } from "kbotify";
import { reportName } from "./report.name";
import { CardExtend } from "../../../data/cardExp";

class ReportMenu extends MenuCommand {
  code = "report";
  trigger = "report";
  help = "";

  menu: any = new CardExtend()
    .addTitle(`🔴 ${this.code}`, true)
    .addMenu(this)
    .toString();
  useCardMenu = true;
}

export const reportMenu = new ReportMenu(reportName);
