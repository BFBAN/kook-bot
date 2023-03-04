import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsAdminTemplate from "../../template/sitestatsAdminTemplate";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";

class SitestatsAdmin extends AppCommand {
  code = "admin";
  trigger = "admin";
  help = ".sitestats admin";
  intro = "sitestats.admins.intro";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {

      let resAdmin = await this.getAdmin(other);

      if (!resAdmin) {
        session.reply(i18n.t("sitestats.admins.notContent", other.get("lang")));
        return;
      }

      session.replyCard(new SitestatsAdminTemplate(resAdmin).generation(other.get("lang")));
    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation({
        lang: other.get("lang"),
        session
      }));
      bot.logger.error(err);
    }
  };

  /**
   * get admin
   * @param params
   * @protected
   */
  protected async getAdmin(params: any): Promise<AxiosResponse> {
    return new Promise(async (resolve, reject) => {
      await axios({
        url: this.http.address + "api/" + api.admins,
        method: "get"
      }).then(res => {
        if (res.data.success === 1) {
          return resolve(res.data);
        }
        reject(res);
      }).catch(err => {
        return reject(err);
      });

    });
  }
}

export const sitestatsAdmin = new SitestatsAdmin();
