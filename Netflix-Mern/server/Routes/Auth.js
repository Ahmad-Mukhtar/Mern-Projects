const express = require("express");
const router = express.Router();
const User = require("../models/User");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.SECRT_KEY
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Email Not found");
    }

    const bytes = cryptojs.AES.decrypt(user.password, process.env.SECRT_KEY);

    const orignalpassword = bytes.toString(cryptojs.enc.Utf8);

    if (orignalpassword !== req.body.password) {
      return res.status(401).json("Incorrect Password");
    }

    const access_token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRT_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({...info,access_token});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
