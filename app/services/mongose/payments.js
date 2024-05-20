const Payments = require("../../api/v1/payments/model");
const { NotFoundError } = require("../../errors");
const BadRequest = require("../../errors/bad-request");
const NotFound = require("../../errors/not-found");

const getAllPayments = async () => {
  const result = await Payments.find();

  return result;
};

const createPayments = async (req) => {
  const { name } = req.body;

  const result = await Payments.create({ name });

  return result;
};

const getOnePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Tidak ada Payments dengan id: ${id}`);

  return result;
};

const updatePayments = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Payments.findOne({ name, _id: { $ne: id } });
  if (check) throw new BadRequest("Payments Duplikat");

  const result = await Payments.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runvalidator: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada Payments dengan id: ${id}`);
  return result;
};

const deletePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.findByIdAndDelete({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Payments dengan id: ${id}`);
  await result;

  return result;
};

module.exports = {
  getAllPayments,
  createPayments,
  getOnePayments,
  updatePayments,
  deletePayments,
};
