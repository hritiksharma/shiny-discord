const express = require("express");
const { Snowflake } = require("@theinternetfolks/snowflake");

const Role = require("../models/roleModel");

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("invalid role name");
    }

    const data = {
      id: Snowflake.generate(),
      name,
    };

    const role = await Role.create(data);
    if (!role) {
      res.status(400);
      throw new Error("Erorr in create role");
    }

    res.status(200).json({ status: true, content: { data: { role } } });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in register api`);
  }
};

const getAllRoles = async (req, res) => {
  try {
    console.log();
    const data = await Role.find();
    if (!data || data.length == 0) {
      res.status(400);
      throw new Error("Erorr in getting all role");
    }

    res.status(200).json({
      status: true,
      contnet: {
        meta: { total: data.length, pages: 1, page: 1 },
        data: data,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in register api`);
  }
};

module.exports = { createRole, getAllRoles };
