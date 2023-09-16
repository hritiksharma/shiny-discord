const express = require("express");
const User = require("../models/userModel");
const { Snowflake } = require("@theinternetfolks/snowflake");
const generateToken = require("../middlewares/generateToken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            console.log("all fields are mandatory");
            throw new Error("all fields are mandatory");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ "error": "User Allready exists" })
            throw new Error("User Allready exists");
        }

        const data = {
            _id: Snowflake.generate(),
            name,
            email,
            password,
        }
        const token = await generateToken(data.id);
        console.log("token", token);
        const user = await User.create(data)

        if (user) {
            console.log("user", user);
            res.status(200).json({ "success": true, "content": { "data": data, "meta": { "access_token": token } } })
        }
    } catch (error) {
        console.log("error", error);
        res.status(400);
        throw new Error(`Error in register api`);
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("all fields are mandatory");
            throw new Error("all fields are mandatory");
        }

    } catch (error) {

    }
}
module.exports = { register }