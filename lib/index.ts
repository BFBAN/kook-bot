import Api from "./api";
import Http from "./http";
import HttpBfban from "./http_bfban";
import HttpBfbanProxyUser from "./http_bfban_ProxyUser";

const api = new Api();
const http = new Http();
const httpBfban = new HttpBfban();
const httpBfbanProxyUser = new HttpBfbanProxyUser();

export {
  api, http, httpBfban, httpBfbanProxyUser
};
