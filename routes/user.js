const express = require("express");
const jwt = require("jsonwebtoken");
const userSignUpMiddleware = require("../middlewares/userSignUp");
const userSignInMiddleware = require("../middlewares/userSignIn");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const authMiddleware = require("../middlewares/auth");
const userUpdate = require("../middlewares/userUpdate");

const router = express.Router();

router.put("/", userUpdate, authMiddleware, (req, res) => {
  const updatedUserData = req.body;
  User.findByIdAndUpdate(req.userId, updatedUserData)
    .then((updatedDoc) => {
      if (updatedDoc) {
        res.status(200).json({
          message: "Updated successfully",
        });
      } else {
        res.status(411).json({
          message: "Document coundn't be found",
        });
      }
    })
    .catch((err) => {
      res.status(411).json({
        message: "Error while updating information",
      });
    });
});
router.post("/signup", userSignUpMiddleware, async (req, res) => {
  const userData = req.body;
  const newUser = await User.create(userData);
  const userJwt = jwt.sign(
    {
      userId: newUser._id,
    },
    JWT_SECRET
  );
  const newUserBalance = await Account.create({
    userId: newUser._id,
    balance: Math.floor(Math.random() * 10000 + 1),
  });
  res.status(200).json({
    message: "User created successfully",
    token: userJwt,
  });
});

router.post("/signin", userSignInMiddleware, (req, res) => {
  const userJwt = jwt.sign(
    {
      userId: req.userId,
    },
    JWT_SECRET
  );
  res.status(200).json({
    token: userJwt,
  });
});

router.get("/bulk",authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  let users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  users = users.filter(user => user._id != req.userId)
  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
router.get("/about",authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
  });
});
module.exports = router;
