const express = require("express");

const Community = require("../models/communityModel");
const User = require("../models/userModel");
const { Snowflake } = require("@theinternetfolks/snowflake");

const createCommunity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      console.log("Name is required");
      res.status(400);
      throw new Error("Name required");
    }

    const data = {
      id: Snowflake.generate(),
      name: name,
      owner: req.user.id,
    };
    console.log("data", data);
    const community = await Community.create(data);

    if (!community) {
      res.status(400);
      throw new Error("error in creating community");
    }

    res.status(200).json({ statue: true, content: { data: community } });

    console.log("community", community);
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in create communtity api`);
  }
};

module.exports = { createCommunity };
