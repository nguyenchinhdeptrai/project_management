const mongoose = require('mongoose');

const dataTypeBook = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },

);

const TypeBookModel = mongoose.model('typebook', dataTypeBook);
module.exports = TypeBookModel;
