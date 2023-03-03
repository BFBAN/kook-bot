import { Card } from "kbotify";
import { BaseFooterTemplate } from "./baseFooterTemplate";
import { AxiosError } from "axios";
import { bot } from "../../bot";

class ErrorTemplate {
  errorContent: any = ":( I have an error";

  constructor(data: any) {
    if (data) {
      this.errorContent = data;
    }
  }

  public generation(targetId: any = null, cmdName: string = '') {
    let message = new Card({
      color: "",
      modules: [],
      size: "lg",
      type: "card",
      theme: "danger"
    });
    let content: any;

    switch (this.errorContent.constructor) {
      case AxiosError:
        content = this.errorContent.toString();
        break;
      default:
        content = JSON.stringify(this.errorContent);
        break;
    }

    message
      .addTitle("错误")
      .addText("请将错误发送给开发者，以帮助解决问题")
      .addText("错误时间:" + new Date().getTime() + " cmd:" + cmdName ?? '-')
      .addDivider()
      .addText(content);

    // set card footer
    message = new BaseFooterTemplate().add(message);

    if (targetId) {
      bot.API.userChat.create(targetId);
      console.log("创建成功");
    }

    return message;
  }
}

export {
  ErrorTemplate
};
