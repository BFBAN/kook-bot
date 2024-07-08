import commandPack from "../commandPack";

import { AppCommand, AppFunc, BaseSession, Card } from "kbotify";
import { bot } from "../../../bot";
import { api, httpBfbanProxyUser } from "../../../lib";
import { ErrorTemplate } from "../../template/errorTemplate";
import db from "../../../db";
import { TextMessage } from "kbotify/dist/core/message";

export class ReportName extends AppCommand {
  code = "name";
  trigger = "name";
  help = ".report name [playerName:string]";
  intro = "report.name.intro";

  // 指令配置
  session?: BaseSession;
  bfbanUser: object | undefined;
  token: string = "";

  reportData = {
    game: "",
    originName: "",
    cheatMethods: [],
    videoLink: "",
    description: ""
  };

  reportMethods = ["wallhack", "aimbot", "invisable", "magicBullet", "damageChange", "gadgetModify", "teleport", "attackServer"];
  reportGameTypes = [{
    name: "战地1",
    value: "bf1",
    values: ["bf1", "1"]
  }, {
    name: "战地5",
    value: "bfv",
    values: ["bfv", "5"]
  }];

  func: AppFunc<BaseSession> = async (session) => {
    const commandTool: any = new commandPack.CommandFactory(this).addAttr({ session }),
      { mainValue, other } = commandTool.pack(session.args);

    try {
      // 检查参数有效性，并丢出提示
      if (!commandTool.check()) {
        return;
      }

      this.session = session;
      this.bfbanUser = await db.select("users.id", "binding_kook.userId", "binding_kook.kookId", "binding_bfban.userId", "binding_bfban.token")
        .from("users")
        .join("binding_kook", "users.id", "binding_kook.userId")
        .join("binding_bfban", "users.id", "binding_bfban.userId").first();

      if (!this.bfbanUser) {
        await session.send("未绑定账户，请现在使用.binding id {bfban id}命令来绑定");
        return;
      }

      this.token = this.token as string;
      this.reportData.originName = mainValue;

      // 开始流程 ->
      await this.onSelectGame();

      // await this.bfbanReportPlayer(mainValue, this.bfbanUser.bfbanToken);
    } catch (err) {
      await session.replyCard(new ErrorTemplate()
        .addError(err)
        .addSession(session)
        .addAttr({ lang: other.get("lang") }).generation);
      bot.logger.error(err);
    }
  };

  /**
   * 选择举报游戏类型
   */
  async onSelectGame() {
    const game = await this.session!.send("请输入举报游戏");

    this.reportGameTypes.forEach(i => {
      i.values.forEach(triggerValue => {
        console.log(triggerValue);
        this.session?.setTextTrigger(triggerValue, null, (msg: TextMessage) => {
          this.reportData.game = i.value;

          // next
          this.onReportMethods();
        });
      });
    });
  }

  /**
   * 举报作弊方式类型
   */
  async onReportMethods() {
    const methods = await this.session!.send("请输入举报作弊方式:\n例子: wallhack,aimbot");
    this.session?.setTextTrigger("", null, (msg) => {
      if (!msg.content || msg.content.indexOf(",") <= 0 && msg.content.split(",").length <= 0) {
        this.session?.send(`不符合的规则，请按照例子来, 完整参数列表${this.reportMethods.join(",")}`);
        return;
      }

      this.reportData.cheatMethods = msg.content.split(",") as [];

      // next
      this.onReportContent();
    });
  }

  /**
   * 举报内容
   */
  async onReportContent() {
    const content = await this.session!.send("请输入举报信息");
    content.session?.setTextTrigger("", null, (msg) => {
      this.reportData.description = msg.content;

      this.session?.send("提交举报中,请等待");
    });
  }

  /**
   * 提交举报信息
   * @param mainValue
   */
  async bfbanReportPlayer(mainValue: string) {
    httpBfbanProxyUser.createToken(this.token);

    const result = await httpBfbanProxyUser.post(api.bfbanApi.player_report),
      d = result.data;

    if (d.error === 1) {
      throw d.message;
    }

    return d;
  }
}

export const reportName = new ReportName();
