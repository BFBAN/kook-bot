"use strict";
import express from "express";
import db from "../db";
import config from "../config";

const router = express.Router();

/**
 * 认证回调
 */
router.post("/authCallback", async (req: any, res: any, next: any) => {
  try {
    const { userId , token } = req.body;

    if (!userId || !token) return res.status(403)

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

    await db("binding_bfban").where({ userId }).update({ token });

    res.status(200);
  } catch (err) {
    next(err);
  }
});

export default router;
