const res = require("express/lib/response");
const Events = require("../../api/v1/events/model");
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllEvents = async () => {
  const result = await Events.find();

  return result;
};

const createEvents = async (req) => {
  const { name } = req.body;

  const result = await Events.create({ name });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Event dengan id :  ${id}`);

  return result;
};

const upadateEvents = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Events.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Event nama duplikat");

  const result = await Events.findOneAndUpdate(
    { _id, id },
    { name, name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada Event dengan id :  ${id}`);

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Categories.findByIdAndDelete({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Event dengan id :  ${id}`);

  await result;

  return result;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  upadateEvents,
  deleteEvents,
};
