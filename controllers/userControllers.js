const express = require("express");
const User = require("../models/userModel");
const { Snowflake } = require("@theinternetfolks/snowflake");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            console.log("all fields are mandatory");
            throw new Error("all fields are mandatory");
        }
        const data = {
            id: Snowflake.generate(),
            name,
            email,
            password
        }
        const user = await User.create(data)
        if (user) {
            console.log("user", user);
            res.status(200).json({ "success": true, user })
        }
    } catch (error) {
        console.log("error", error);
        res.status(400);
        throw new Error(`Error in register api`);
    }
}

module.exports = { register }