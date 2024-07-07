import http from "axios";

import { Http } from "./http";
import config from "../config";
import api from "./api";

export default class HttpBfban extends Http {
  bfbanApi = api.host.bfban;

  /**
   * token
   * @param data
   */
  public createToken() {
    this.HTTP.interceptors.request.use((request: any) => {
      request.headers.set("x-access-token", config.account.token);
      return request;
    });
    return this.HTTP;
  }

  constructor() {
    super();
    const baseURL = this.bfbanApi!.url;
    this.HTTP = http.create({
      baseURL,
      timeout: 100000,
      withCredentials: true,
      headers: {
        'user-agent': 'bot'
      }
    });
  }
}
