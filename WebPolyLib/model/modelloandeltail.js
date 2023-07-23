const mongoose = require('mongoose');

const dataLoanDeltail = new mongoose.Schema(
    {
        _idBook: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true, },
        _idMember: { type: mongoose.Schema.Types.ObjectId, ref: 'member', required: true, },
        _idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, },
        price: { type: Number, require: true },
        date: { type: String, require: true },
    },

);

const LoanDeltail = mongoose.model('loandetails', dataLoanDeltail);
module.exports = LoanDeltail;
