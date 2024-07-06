"use strict";
import express from "express";
import db from "../db";
import config from "../config.js";

const router = express.Router();

/**
 * 认证回调
 */
router.post("/authCallback", async (req: any, res: any, next: any) => {
  try {
    const { userId, token } = req.body;

    // 检查是否已绑定
    const bindingData = await db('binding').where({
      platform: 'kook',
      value: {
        token,
        userId
      }
    }).first()

    db("binding").insert({

    });
  } catch (err) {
    next(err);
  }
});

export default router;
