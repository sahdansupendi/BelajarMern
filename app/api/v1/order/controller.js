const { model } = require("mongoose");
const Order = require("./model");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { getAllOrder, getOneOrder } = require("../../../services/mongose/order");

const index = async (req, res, next) => {
  try {
    const result = await getAllOrder();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneOrder();
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
};
