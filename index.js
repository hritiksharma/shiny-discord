const express = require('express')
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const { Snowflake } = require("@theinternetfolks/snowflake");
const userRouter = require("./routes/userRouter")

dotenv.config();
const app = express()
const port = process.env.PORT


connectDB();
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/v1/auth", userRouter)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  