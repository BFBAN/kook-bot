import './user.ts'
import {BaseUserInfo} from "@/data/user.ts";

/// 用户数据
/// 登陆API返回结果
export interface UserTokenData {
    userinfo: BaseUserInfo
    token: string
}
