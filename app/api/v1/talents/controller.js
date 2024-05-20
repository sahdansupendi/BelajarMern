const { model } = require("mongoose");
const Talents = require("./model");
const req = require("express/lib/request");
const res = require("express/lib/response");
const {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
} = require("../../../services/mongose/talents");

const create = async (req, res, next) => {
  try {
    const result = await createTalents(req);
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTalents();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = getOneTalents(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = updateTalents(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = deleteTalents(req);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  find,
  update,
  destroy,
  create,
};
