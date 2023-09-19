const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Snowflake } = require("@theinternetfolks/snowflake");
const userRouter = require("./routes/userRouter");
const communityRouter = require("./routes/communityRouter");
const roleRouter = require("./routes/roleRouter");
const memberRouter = require("./routes/memberRouter");
dotenv.config();
const app = express();
const port = process.env.PORT;

connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/community", communityRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/member", memberRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
