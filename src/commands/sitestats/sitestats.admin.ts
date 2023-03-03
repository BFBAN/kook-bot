import axios, { AxiosResponse } from "axios";
import api from "../../configs/api";
import commandPack from "../commandPack";
import Http from "../../lib/http";
import SitestatsAdminTemplate from "../../template/sitestatsAdminTemplate";

import { AppCommand, AppFunc, BaseSession } from "kbotify";
import { bot } from "../../../bot";
import { ErrorTemplate } from "../../template/errorTemplate";

class SitestatsAdmin extends AppCommand {
  code = "admin";
  trigger = "admin";
  help = ".sitestats admin";
  intro = "查询网站管理员数量";
  http = new Http();

  func: AppFunc<BaseSession> = async (session) => {
    try {
      const { mainValue, other } = new commandPack.CommandFactory().pack(session.args);

      let resAdmin = await this.getAdmin(other);

      if (!resAdmin) {
        session.reply('抱歉，没有找到数据');
        return ;
      }

      session.replyCard(new SitestatsAdminTemplate(resAdmin).generation());
    } catch (err) {
      session.replyCard(new ErrorTemplate(err).generation());
      bot.logger.error(err);
    }
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
          return reject(err);
        });

      });
    } catch (err) {
      bot.logger.error(err);
      throw err;
    }
  }
}

export const sitestatsAdmin = new SitestatsAdmin();
