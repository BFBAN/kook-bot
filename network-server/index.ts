"use strict";
import express from "express";
import config from "../config";
const router = express.Router();

router.post("/auths", async (req: any, res: any, next: any) => {
  try {
    res.status(200).json(config.account.token);
  } catch (err) {
    next(err);
  }
});

export default router;
