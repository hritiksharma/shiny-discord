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

const getAllCommunities = async (req, res) => {
  try {
    const data = await Community.find();
    if (!data) {
      res.status(400);
      throw new Error("Not found");
    }
    if (data.length === 0) {
      res.status(400);
      throw new Error("No communities are there");
    }

    res.status(200).json({
      status: true,
      totol: data.length,
      pages: data.length / 5,
      data: data,
    });
  } catch (error) {}
};

module.exports = { createCommunity, getAllCommunities };
