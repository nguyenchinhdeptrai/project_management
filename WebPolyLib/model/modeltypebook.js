const mongoose = require('mongoose');

const dataTypeBook = new mongoose.Schema(
    {
        name: { type: String, required: true },
    },
   
);

const dataModelTypeBook = mongoose.model('typebook', dataTypeBook);
module.exports = dataModelTypeBook;
