const mongoose = require("mongoose");
const { Snowflake } = require("@theinternetfolks/snowflake");
const roleSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
