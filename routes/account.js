const express = require("express");
const { Account } = require("../db");
const authMiddleware = require("../middlewares/auth");
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const userBalance = await Account.findOne({
    userId: userId,
  });
  res.status(200).json({
    balance: userBalance.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;
  const senderId = req.userId;
  const senderAccount = await Account.findOne({
    userId: senderId,
  }).session(session);
  
  if (!senderAccount || senderAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  
  const receiverAccount = await Account.findOne({
    userId: to,
  }).session(session);
  if (!receiverAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
  await session.commitTransaction();
  res.status(200).json({
    message: "Transfer successful",
  });
});


module.exports = router;
