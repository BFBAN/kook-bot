"use strict";
import express from "express";
import db from "../db";
import config from "../config";
import { bot } from "../bot";
import { Card } from "kbotify";
import { BaseFooterTemplate } from "../bot-server/template/baseFooterTemplate";

const router = express.Router();

/**
 * 认证回调
 */
router.post("/authCallback", async (req: any, res: any, next: any) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(403);
    }

    // 检查是否已绑定
    const bindingData = await db
      .select("users.id", "binding.userId", "binding_bfban.*", "binding_kook.*")
      .from("users")
      .join("binding", "binding.userId", "users.id")
      .join("binding_bfban", "binding_bfban.userId", "users.id")
      .join("binding_kook", "binding_kook.userId", "users.id")
      .where("users.id", "=", userId).first();

    if (!bindingData || !config.__DEBUG__) { // 如果DEBUG永远跳过检查是否已有，并强制更新
      res.status(200);
    }

    let context = new Card()
      .setColor('#000')
      .addTitle("通知")
      .addDivider()
      .addText("您好呀，我想告诉你，成功绑定BFBAN账户，现在机器人保存你的BFBAN账户以及令牌；由于BFBAN授权规则，授权有效期存在限制，如果到期请重新授权哦~");

    context = new BaseFooterTemplate().add(context);

    await bot.API.directMessage.create(10, "2485976835", "", context.toString());

    await db("binding_bfban").where({ userId }).update({ token });

    res.status(200);
  } catch (err) {
    next(err);
  }
});

router.get("/botKookServerList", async (req: any, res: any, next: any) => {
  try {
    const data = await bot.API.guild.list();

    res.status(200).json({ data });
  } catch (e) {
    bot.logger.error(e);
  }
});

export default router;
