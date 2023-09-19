const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const communitySchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
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
