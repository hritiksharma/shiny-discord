const jwt = require("jsonwebtoken");

const generateToken = async (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "30d"
    })

}

module.exports = generateToken