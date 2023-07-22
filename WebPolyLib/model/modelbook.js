const mongoose = require('mongoose');

const dataBookSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: { type: String, required: true },
        years: { type: Number, required: true },
        count: { type: Number, required: true },
        img: { type: String, required: true },
        _idType: { type: mongoose.Schema.Types.ObjectId, ref: 'typebook', required: true },//=> tham chiếu đến  id trong bảng loại sách
    },

);

const BookModel = mongoose.model('book', dataBookSchema);
module.exports = BookModel;
