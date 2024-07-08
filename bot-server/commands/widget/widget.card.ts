import puppeteer from "puppeteer";

import { AppCommand, AppFunc } from "kbotify";
import { ErrorTemplate } from "../../template/errorTemplate";
import { bot } from "../../../bot";
import commandPack from "../commandPack";
import config from "../../../config";
import WidgetCardTemplate from "../../template/widgetCardTemplate";
import i18n from "../../../langage";

class WidgetCard extends AppCommand {
  code = "card";
  trigger = "card";
  help = ".widget card [id:number] (height:number ps:Pixel) (width:number ps:Pixel) (theme:string) (lang:string)";
  intro = "widget.intro";

  func: AppFunc = async (session) => {
    const commandTool: any = new commandPack.CommandFactory(this).addAttr({ session }),
      { mainValue, other } = commandTool.pack(session.args);

    try {
      // 检查参数有效性，并丢出提示
      if (!commandTool.check()) {
        return;
      }

      if (!mainValue || !new RegExp(/^[0-9]+.?[0-9]*/).test(mainValue)) {
        await session.reply(i18n.t("widget.missingValue", other.get("lang")));
      }

      const tipSendId = await session.send(i18n.t("widget.waitTip", other.get("lang")));
      const url: any = await this.generateWidget(mainValue, other);

      if (url) {
        await session.replyCard(new WidgetCardTemplate().addUrl(url).addAttr({
          lang: other.get("lang")
        }).generation);
      } else {
        throw i18n.t("widget.generationError", other.get("lang"));
      }

      // 移除提示
      if (tipSendId) {
        await bot.API.message.delete(<string>tipSendId.msgSent?.msgId);
      }
    } catch (err) {
      await session.replyCard(new ErrorTemplate()
        .addError(err)
        .addSession(session)
        .addAttr({ lang: other.get("lang") }).generation);
      bot.logger.error(err);
    }
  };

  /**
   * 抓取widget，并上传
   * @param id 案件id
   * @param height widget高度
   * @param width widget宽度
   * @param theme 主题
   * @param lang 语言
   */
  async generateWidget(id: number, { height, width, theme, lang }: any): Promise<any> {
    if (!id) {
      throw "请填写id";
    }

    return new Promise(async (resolve) => {
      const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
      const page = await browser.newPage();
      const pageUrl = `${config.webSite}/player/${id}/share/card?full=true&theme=${theme ?? "default"}&lang=${lang ?? config.i18n.default}`;
      bot.logger.info(pageUrl);

      // 设置超时2分钟
      page.setDefaultTimeout(1000 * 60 * 2);

      // goto
      await page.goto(pageUrl);

      // Set screen size
      await page.setViewport({ width: width ?? 349, height: height ?? 280 });

      // Wait load
      await page.waitForFunction("window.widgetReady == true")
        .catch(err => {
          throw err;
        });

      // screenshot
      await page.screenshot({ type: "jpeg", path: "", omitBackground: true, encoding: "binary" })
        .then(async res => {
          bot.API.asset.create(res, {
            knownLength: res.length,
            filename: id.toString(),
            filepath: "/" + config.name,
            contentType: "jpeg"
          }).then(kookUpdateFileRes => {
            // 取回asset的url
            resolve(kookUpdateFileRes.url);
          }).catch(err => {
            throw err;
          });
        }).catch(err => {
          throw err;
        }).finally(async () => {
          await browser.close();
        });
    });
  }

}

export const widgetCard = new WidgetCard();
