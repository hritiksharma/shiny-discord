const mongoose = require("mongoose");
const { Snowflake } = require("@theinternetfolks/snowflake");
var slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const communitySchema = mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      slug: "name",
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
