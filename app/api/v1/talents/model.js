const express = require('express');
const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, 'Panjang nama Talent minimal 3 karakter'],
      maxLength: [20, 'Panjang nama Talent maksimal 20 karakter'],
      required: [true, 'Nama Talent harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = model('Talent', categorySchema);