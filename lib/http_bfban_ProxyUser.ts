import http from "axios";

import { Http } from "./http";
import config from "../config";
import api from "./api";

export default class httpBfbanProxyUser extends Http {
  bfbanApi = api.host.bfban;

  /**
   * token
   * @param token
   */
  public createToken(token: string) {
    this.HTTP.interceptors.request.use((request: any) => {
      request.headers.set("x-access-token", token);
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
        // 此代理用户请求BFBAN接口的客户端，需要配置来源方式
        // 否则视为website，调用接口会出现令牌过期
        'user-agent': 'external-auth'
      }
    });
  }
}
