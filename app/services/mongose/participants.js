const Participants = require("../../api/v1/participants/model");
const { NotFoundError } = require("../../errors");
const BadRequest = require("../../errors/bad-request");

const getAllParticipants = async () => {
  const result = await Participants.find();

  return result;
};

const createParticipants = async (req) => {
  const { name } = req.body;

  const result = await Participants.create({ name });

  return result;
};

const getOneParticipants = async (req) => {
  const { id } = req.params;

  const result = await Participants.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada Participants dengan id: ${id}`);

  return result;
};

const updateParticipants = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Participants.findOne({ name, _id: { $ne: id } });

  if (check) throw new BadRequest("Participants Duplikat");

  const result = await Participants.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidator: true }
  );

  if (!result)
    throw new NotFoundError(`Tidak ada Participants dengan id: ${id}`);

  return result;
};

const deleteParticipants = async (req) => {
  const { id } = req.params;

  const result = await Participants.findByIdAndDelete({ _id: id });

  if (!result) throw new NotFoundError(`Tiadak Participants dengan id: ${id}`);

  await result;

  return result;
};

module.exports = {
  getAllParticipants,
  createParticipants,
  getOneParticipants,
  updateParticipants,
  deleteParticipants,
};
