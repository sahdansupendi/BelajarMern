const { model } = require("mongoose");
const Participants = require("./model");
const req = require("express/lib/request");
const res = require("express/lib/response");
const {
  getAllParticipants,
  createParticipants,
  getOneParticipants,
  updateParticipants,
  deleteParticipants,
} = require("../../../services/mongose/participants");

const create = async (req, res, next) => {
  try {
    const result = await createParticipants(req);
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllParticipants();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneParticipants(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateParticipants(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteParticipants(req);
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
