const express = require("express");

const Community = require("../models/communityModel");
const User = require("../models/userModel");
const Member = require("../models/memberModel");
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
      _id: Snowflake.generate(),
      name: name,
      owner: req.user._id,
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

const getAllMembers = async (req, res) => {
  try {
    const slug = req.params.id;

    const community = await Community.find({ slug: slug });

    if (!community) {
      console.log("Community not found");
      res.statue(404);
      throw new Error("Community not found");
    }
    console.log("community", community);
    const members = await Member.find({ community: community[0]._id })
      .populate("user", "name")
      .populate("role", "name");
    console.log("members", members);

    if (!members) {
      console.log("Community not found");
      res.statue(404);
      throw new Error("Members not found");
    }

    res.status(200).json({ statue: true, content: { data: members } });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in create communtity api`);
  }

  // console.log("community", community);
};

const getMyOwnedCommunity = async (req, res) => {
  try {
    const communities = await Community.find({ owner: req.user._id });

    if (!communities) {
      console.log("Community not found");
      res.status(404);
      throw new Error("Community not found");
    }

    res.status(200).json({
      status: true,
      content: {
        meta: { total: communities.length, pages: 1, page: 1 },
        data: communities,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in create communtity api`);
  }
};

const getMyJoinedCommunity = async (req, res) => {
  try {
    const data = await Member.find({ user: req.user._id }).populate(
      "community"
    );
    // console.log("data", data);
    res.status(200).json({ statue: true, content: { data: data } });
  } catch (error) {}
};

module.exports = {
  createCommunity,
  getAllCommunities,
  getAllMembers,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
};
