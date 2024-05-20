const TicketCategories = require("../../api/v1/ticket-categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllTicketCategories = async () => {
  const result = await TicketCategories.find();

  return result;
};

const createTicketCategories = async (req) => {
  const { name } = req.body;
  const result = await TicketCategories.create({ name });
  return result;
};
const getOneTicketCategories = async (req) => {
  const { id } = req.params;

  const result = await TicketCategories.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada Tiket Kategori dengan id :  ${id}`);

  return result;
};

const updateTicketCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await TicketCategories.findOne({
    name,
    _id: { $ne: id },
  });

  // apa bila check true / data TicketCategories sudah ada maka kita tampilkan error bad request dengan message Ticket Kategori nama duplikat
  if (check) throw new BadRequestError("Tiket kategori nama duplikat");

  const result = await TicketCategories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada Ticket Kategori dengan id` yang dikirim client
  if (!result)
    throw new NotFoundError(`Tidak ada Tiket Kategori dengan id :  ${id}`);

  return result;
};

const deleteTicketCategories = async (req) => {
  const { id } = req.params;

  const result = await TicketCategories.findByIdAndDelete({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Tiket Kategori dengan id :  ${id}`);

  await result;

  return result;
};
module.exports = {
  getAllTicketCategories,
  createTicketCategories,
  getOneTicketCategories,
  updateTicketCategories,
  deleteTicketCategories,
};
