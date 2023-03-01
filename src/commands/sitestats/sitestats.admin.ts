import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsAdminTemplate from "../../template/sitestatsAdminTemplate";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";

class SitestatsAdmin extends AppCommand {
  code = "admin";
  trigger = "admin";
  help = "`.checkban admin`";
  intro = "";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    if (!session.args.length) {
      return session.reply(this.help);
    }

    const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

    let resAdmin = await this.getAdmin(other);

    if (resAdmin) {
      session.replyCard(new SitestatsAdminTemplate(resAdmin).generation());
      return ;
    }

    session.reply(":( I have an error");
  };

  /**
   * get admin
   * @param params
   * @protected
   */
  protected async getAdmin(params: any): Promise<AxiosResponse> {
    try {
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
          bot.logger.debug(err);
          return reject(err);
        });

      });
    } catch (e) {
      bot.logger.debug(e);
      throw e;
    }
  }
}

export const sitestatsAdmin = new SitestatsAdmin();
