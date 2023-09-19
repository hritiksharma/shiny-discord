const express = require("express");
const User = require("../models/userModel");
const { Snowflake } = require("@theinternetfolks/snowflake");
const generateToken = require("../middlewares/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signun
// /api/v1/auth/signup
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("all fields are mandatory");
      throw new Error("all fields are mandatory");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ error: "User Allready exists" });
      throw new Error("User Allready exists");
    }

    const data = {
      _id: Snowflake.generate(),
      name,
      email,
      password,
    };
    const token = await generateToken(data._id);
    console.log("token", token);
    const user = await User.create(data);

    if (user) {
      console.log("user", user);
      res.status(200).json({
        success: true,
        content: { data: data, meta: { access_token: token } },
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in register api`);
  }
};

// Sign in
// /api/v1/auth/signin
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("all fields are mandatory");
      res.status(400);
      throw new Error("all fields are mandatory");
    }

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      res.status(400);
      throw new Error("Incorrect email and password");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      console.log("all fields are mandatory");
      res.status(400);
      throw new Error("all fields are mandatory");
    }

    const token = await generateToken(user._id);

    res.status(200).json({
      success: true,
      content: { data: user, meta: { access_token: token } },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in login api`);
  }
};

// getUserDetail
// /api/v1/auth/me
const getUserDetail = async (req, res) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const { _id } = jwt.verify(token, process.env.SECRET_KEY);
      console.log("decode", _id);

      const user = await User.findOne({ _id }, "-password");

      if (!user) {
        res.status(400);
        throw new Error("Invalid token");
      }

      res.status(200).json({
        success: true,
        content: { data: user },
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in login api`);
  }
};

module.exports = { register, signIn, getUserDetail };
