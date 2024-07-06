import { BaseHttpType, HttpContainer } from "../data/baseHttp";

interface ApiT {
  host: any
}

export default class Api {
  /// 主机配置清单
  static get host() {
    let env: string = process.env.NODE_ENV || "production";

    return {
      /// BFBAN 接口
      /// https://api.bfban.com/docs
      bfban: {
        development: new HttpContainer({
          protocol: BaseHttpType.Https,
          host: "api.bfban.com",
          pathname: "/api/"
        }),
        production: new HttpContainer({
          protocol: BaseHttpType.Https,
          host: "api.bfban.com",
          pathname: "/api/"
        })
      }[env]
    };
  }

  /// 接口清单
  public get bfbanApi() {
    return {
      "player": "/player",
      "player_batch": "/player/batch"
    };
  }
}
