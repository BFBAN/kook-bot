import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsAdminTemplate from "../../template/sitestatsAdminTemplate";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";
import i18n from "../../../langage";
import { httpBfban } from "../../../lib";

class SitestatsAdmin extends AppCommand {
  code = "admin";
  trigger = "admin";
  help = ".sitestats admin";
  intro = "sitestats.admins.intro";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    try {
      let resAdmin = await this.getAdmins(other);

      if (!resAdmin) {
        await session.reply(i18n.t("sitestats.admins.notContent", other.get("lang")));
        return;
      }

      await session.replyCard(new SitestatsAdminTemplate(resAdmin).generation(other.get("lang")));
    } catch (err) {
      await session.replyCard(new ErrorTemplate(err).generation({
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
  protected async getAdmins(params: any): Promise<AxiosResponse> {
    return new Promise(async (resolve, reject) => {
      const result = await httpBfban.get(api.admins),
        d = result.data;

      if (d.error === 1) {
        throw d.message;
      }

      return result;
    });
  }
}

export const sitestatsAdmin = new SitestatsAdmin();
