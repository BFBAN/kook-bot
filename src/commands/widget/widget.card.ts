import puppeteer from "puppeteer";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { ErrorTemplate } from "../../template/errorTemplate";
import { bot } from "../../../bot";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import uid from "node-uuid";
import config from "../../../config";
import WidgetCardTemplate from "../../template/widgetCardTemplate";
import i18n from "../../../langage";

class WidgetCard extends AppCommand {
  code = "card";
  trigger = "card";
  help = ".widget card [id:number] (height:number ps:Pixel) (width:number ps:Pixel) (theme:string) (lang:string)";
  intro = "widget.intro";

  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    try {
      if (!session.args.length) {
        return session.reply(this.help);
      }

      const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

      if (!mainValue) {
        session.reply(i18n.t("widget.missingValue", other.get("lang")));
      }

      const tipSendId = await session.send(i18n.t("widget.missingValue", other.get("lang")));
      const url: any = await this.generateWidget(mainValue, other);

      if (url) {
        session.replyCard(new WidgetCardTemplate().generation(url, other.get("lang")));
      } else {
        session.replyCard(new ErrorTemplate(i18n.t("widget.generationError", other.get("lang"))).generation());
      }

      // 移除提示
      if (tipSendId) {
        bot.API.message.delete(<string>tipSendId.msgSent?.msgId);
      }
    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation());
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

    return new Promise(async (resolve, reject) => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const pageUrl = `${config.webSite}/player/${id}/share/card?full=true&theme=${theme ?? "default"}&lang=${lang ?? config.i18n.default}`;

      // 设置超时30秒
      page.setDefaultTimeout(1000 * 30);

      // goto
      await page.goto(pageUrl);

      // Set screen size
      await page.setViewport({ width: width ?? 349, height: height ?? 280 });

      // Wait load
      await page.waitForFunction("window.widgetReady == true");

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
