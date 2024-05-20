const { model } = require("mongoose");
const Events = require("./model");
const req = require("express/lib/request");
const res = require("express/lib/response");
const {
  createEvents,
  getAllEvents,
  getOneEvents,
  upadateEvents,
  deleteEvents,
} = require("../../../services/mongose/events");

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllEvents();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);

    if (!result) {
      return res.status(400).json({ message: "Id Events tidak ditemukan" });
    }

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await upadateEvents(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteEvents(req);

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
