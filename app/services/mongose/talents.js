const Talents = require("../../api/v1/talents/model");

const getAllTalents = async () => {
  const result = await Talents.find();

  return result;
};

const createTalents = async (req) => {
  const { name } = req.body;

  const result = await Talents.create({ name });

  return result;
};
const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada Talents dengan id :  ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari Talents dengan field name dan id selain dari yang dikirim dari params
  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
  });

  // apa bila check true / data Talents sudah ada maka kita tampilkan error bad request dengan message Talents nama duplikat
  if (check) throw new BadRequestError("Talents nama duplikat");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada Talents dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada Talents dengan id :  ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findByIdAndDelete({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Talents dengan id :  ${id}`);

  await result;

  return result;
};
module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
};
