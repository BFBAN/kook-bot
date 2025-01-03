import { BaseHttpType, HttpContainer } from "../data/baseHttp";
import config from "../config";

interface ApiT {
  host: any;
}

export default class Api {
  /// 主机配置清单
  static get host() {
    let env: string = config.__DEBUG__ ? "development" : "production";

    return {
      /// BFBAN 接口
      /// https://api.bfban.com/docs
      bfban: {
        development: new HttpContainer({
          protocol: BaseHttpType.Http,
          host: "127.0.0.1:3000",
          pathname: "/api/"
        }),
        production: new HttpContainer({
          protocol: BaseHttpType.Https,
          host: "api.bfban.com",
          pathname: "/api/"
        })
      }[env],

      // bfban网站
      bfbanWebsite: new HttpContainer({
        protocol: BaseHttpType.Https,
        host: `bfban.com`
      }),

      // 机器人文档网站
      botDocsAddress: new HttpContainer({
        protocol: BaseHttpType.Https,
        host: `cabbagelol.github.io/kook-bot-docs/`
      }),

      // 机器人服务
      botServerAddress: {
        development: new HttpContainer({
          protocol: BaseHttpType.Http,
          host: `127.0.0.1:${config.port}`,
          pathname: "/"
        }),
        production: new HttpContainer({
          protocol: BaseHttpType.Https,
          host: `www.cabbagelol.com:${config.port}`,
          pathname: "/"
        })
      }[env],

      // 本地地址
      localAddress: new HttpContainer({
        protocol: BaseHttpType.Http,
        host: `${config.address}:${config.port}`
      })
    };
  }

  /// 接口清单
  public get bfbanApi() {
    return {
      "siteStats": "siteStats",
      "admins": "admins",
      "search": "search",
      "cheaters": "player",
      "captcha": "captcha",
      "statistics": "statistics",
      "playerStatistics": "playerStatistics",
      "users": "users",
      "players": "players",
      "activity": "activities",
      "activeStatistical": "activeStatistical",
      "trend": "trend",

      "user_message": "message",
      "user_message_mark": "message/mark",
      "user_info": "user/info",
      "user_info4admin": "user/info4admin",
      "user_me": "user/me",
      "user_subscribes": "user/subscribes",
      "user_subscribes_delete": "user/subscribes/delete",
      "user_subscribes_add": "user/subscribes/add",
      "user_isSubscribes": "user/isSubscribes",
      "user_forgetPassword": "user/forgetPassword",
      "user_forgetPasswordVerify": "user/forgetPasswordVerify",
      "user_bindOrigin": "user/bindOrigin",
      "user_bindOriginVerify": "user/bindOriginVerify",
      "user_reports": "user/reports",
      "user_changePassword": "user/changePassword",
      "user_changeName": "user/changeName",

      "account_signout": "user/signout",
      "account_signin": "user/signin",
      "account_signup": "user/signup",
      "account_signupVerify": "user/signupVerify",
      "account_signup4dev": "user/signup4dev",
      "account_achievements": "user/achievements",
      "account_achievement": "user/achievement",
      "account_achievement_add": "user/achievement/admin/add",
      "account_achievement_delete": "user/achievement/admin/delete",

      "player_reset": "reset",
      "player_batch": "player/batch",
      "player_judgement": "player/judgement",
      "player_judgmentResult": "player/judgmentResult",
      "player_banAppeal": "player/banAppeal",
      "player_viewBanAppeal": "player/viewBanAppeal",
      "player_unReply": "player/unReply",
      "player_reply": "player/reply",
      "player_report": "player/report",
      "player_reportById": "player/reportById",
      "player_update": "player/update",
      "player_viewed": "player/viewed",
      "player_timeline": "player/timeline",
      "player_timeline_item": "player/timeline/item",

      "service_myStorageQuota": "service/myStorageQuota",
      "service_myFiles": "service/myFiles",
      "service_file": "service/file",
      "service_files": "service/files",
      "service_upload": "service/upload",
      "service_uploadBigFile": "service/uploadBigFile",
      "service_externalAuth": "service/externalAuth",
      "service_confirmAuth": "service/confirmAuth",

      "admin_searchUser": "admin/searchUser",
      "admin_setComment": "admin/setComment",
      "admin_commentAll": "admin/commentAll",
      "admin_setUser": "admin/setUser",
      "admin_setAppeal": "admin/setAppeal",
      "admin_setUserAttr": "admin/setUserAttr",
      "admin_msGraphStatus": "admin/msGraphStatus",
      "admin_msGraphInit": "admin/msGraphInit",
      "admin_msGraphAuthCode": "admin/msGraphAuthCode",
      "admin_addUser": "admin/addUser",
      "admin_delUser": "admin/delUser",
      "admin_judgementLog": "admin/judgementLog",
      "admin_chatLog": "admin/chatLog",
      "admin_userOperationLogs": "admin/userOperationLogs",
      "admin_adminLog": "admin/adminLog",
      "admin_muteUser": "admin/muteUser",
      "admin_muteUsers": "admin/muteUsers",
      "admin_muteUserAll": "admin/muteUserAll",
      "admin_verifications": "admin/verifications",
      "admin_blockedUserAll": "admin/blockedUserAll",
      "admin_CommentTypeList": "admin/CommentTypeList"
    };
  }
}
