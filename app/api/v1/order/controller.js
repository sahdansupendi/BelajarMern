const { model } = require('mongoose');
const Order = require('./model');
const req = require('express/lib/request');
const res = require('express/lib/response');

const index = async (req, res, next) => {
    try {
        const result = await Order.find().select('_id name');
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err)
    }
};

const find = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Order.findOne({ _id: id });

        if (!result) {
            res.status(400).json({ message: 'Id Order tidak ditemukan' });
        }

        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err)
    }
};

module.exports = {
    index,
    find,
}