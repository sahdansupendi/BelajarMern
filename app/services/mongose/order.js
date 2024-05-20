const Order = require("../../api/v1/order/model");
const { NotFoundError } = require("../../errors");

const getAllOrder = async () => {
  const result = await Order.find();

  return result;
};

const getOneOrder = async () => {
  const { id } = req.params;

  const result = await Order.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Order id : ${id}`);

  return result;
};

module.exports = { getAllOrder, getOneOrder };
