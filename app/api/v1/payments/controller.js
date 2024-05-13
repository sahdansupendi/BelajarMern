const { model } = require('mongoose');
const Payments = require('./model');
const req = require('express/lib/request');
const res = require('express/lib/response');


const create = async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await Payments.create({ name });
        res.status(201).json({
            data:result,
        });
    } catch (err) {
        next(err)
    }
};

const index = async (req, res, next) => {
    try {
        const result = await Payments.find().select('_id name');
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

        const result = await Payments.findOne({ _id: id });

        if (!result) {
            return res.status(400).json({ message: 'Id Payments tidak ditemukan' });
        }

        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await Payments.findByIdAndUpdate(
            {
                _id: id,
            },
            { name },
            { new: true, runValidators: true }
        );


        res.status(200).json({
            data: result,
        });


    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Payments.findByIdAndDelete(id);

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