const { model } = require('mongoose');
const Talents = require('./model');
const req = require('express/lib/request');
const res = require('express/lib/response');


const create = async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await Talents.create({ name });
        res.status(201).json({
            data: result,
        });

    } catch (err) {
        next(err);
    }
};

const index = async (req, res, next) => {
    try {
        const result = await Talents.find().select('_id name');
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

        const result = await Talents.findOne({ _id: id });

        if (!result) {
            return res.status(400).json({ message: 'Id Talents tidak ditemukan' });
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

        const result = await Talents.findByIdAndUpdate(
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

        const result = await Talents.findByIdAndDelete(id);

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

