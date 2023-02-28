export default {
    api: {
        'siteStats': 'siteStats',
        'admins': 'admins',
        'search': 'search',
        'cheaters': 'player',
        'captcha': 'captcha',
        'statistics': 'statistics',
        'playerStatistics': 'playerStatistics',
        'users': 'users',
        'players': 'players',
        'activity': 'activities',
        'player_reset': 'reset',
        'trend': 'trend',

        'user_message': 'message',
        'user_message_mark': 'message/mark',

        'user_info': 'user/info',
        'user_me': 'user/me',
        'user_forgetPassword': 'user/forgetPassword', // 重置请求
        'user_forgetPasswordVerify': 'user/forgetPasswordVerify', // 重置密码验证
        'user_bindOrigin': 'user/bindOrigin', // 绑定🍊
        'user_bindOriginVerify': 'user/bindOriginVerify', // 🍊验证
        'user_reports': 'user/reports',
        'user_changePassword': 'user/changePassword', // 修改密码
        'user_changeName': 'user/changeName', // 修改名称

        'account_signout': 'user/signout',
        'account_signin': 'user/signin',
        'account_signup': 'user/signup',
        'account_signupVerify': 'user/signupVerify',

        'player_judgement': 'player/judgement',
        'player_judgmentResult': 'player/judgmentResult',
        'player_banAppeal': "player/banAppeal",
        'player_viewBanAppeal': "player/viewBanAppeal",
        'player_unreply': 'player/unreply',
        'player_reply': 'player/reply',
        'player_report': 'player/report',
        'player_update': 'player/update',
        'player_viewed': 'player/viewed',
        'account_timeline': 'player/timeline',

        'service_myStorageQuota': 'service/myStorageQuota',
        'service_myFiles': 'service/myFiles',
        'service_file': 'service/file',
        'service_upload': 'service/upload',
        'service_uploadBigFile': 'service/uploadBigFile',

        'admin_searchUser': 'admin/searchUser',
        'admin_setComment': 'admin/setComment',
        'admin_commentAll': 'admin/commentAll',
        'admin_setUser': 'admin/setUser',
        'admin_setUserAttr': 'admin/setUserAttr',
        'admin_msGraphStatus': 'admin/msGraphStatus',
        'admin_msGraphInit': 'admin/msGraphInit',
        'admin_msGraphAuthCode': 'admin/msGraphAuthCode',
        'admin_addUser': 'admin/addUser',
        'admin_delUser': 'admin/delUser',
        'admin_judgementLog': 'admin/judgementLog',
        'admin_chatLog': 'admin/chatLog',
        'getUserOperationLogs': 'admin/getUserOperationLogs',
        'adminLog': 'admin/adminLog',
        'mute_user': 'admin/muteUser'
    },
    
    // 调用 bfban public 接口域
    // 如果是测试应该修改为本地
    site: {
        "protocol": "http",
        "origin": "bfban.gametools.network/api",
        "port": "80"
    },

    // bfban 关联账户
    // 需要申请机器人身份，否则token快速过期
    account: {
        "id":"",
        "token":""
    }
}