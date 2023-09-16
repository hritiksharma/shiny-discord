const mongoose = require("mongoose");
const { Snowflake } = require("@theinternetfolks/snowflake");
const bcrypt = require("bcryptjs");

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




// hash password...
userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    console.log("this.password", this.password);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;