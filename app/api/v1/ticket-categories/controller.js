const { model } = require("mongoose");
const TicketCategories = require("./model");
const req = require("express/lib/request");
const res = require("express/lib/response");
const {
  getAllTicketCategories,
  createTicketCategories,
  getOneTicketCategories,
  updateTicketCategories,
  deleteTicketCategories,
} = require("../../../services/mongose/ticket-categories");

const create = async (req, res, next) => {
  try {
    const result = await createTicketCategories(req);
    res.status(201).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllTicketCategories();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneTicketCategories(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateTicketCategories(req);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteTicketCategories(req);
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
