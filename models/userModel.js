const mongoose = require("mongoose");
const { Snowflake } = require("@theinternetfolks/snowflake");

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

}, { timestemps: true })

const User = mongoose.model("User", userSchema);

module.exports = User;