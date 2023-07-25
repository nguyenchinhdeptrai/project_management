const mongoose = require('mongoose');

const dataLoanDeltail = new mongoose.Schema(
    {
        _idBook: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true, },
        _idMember: { type: mongoose.Schema.Types.ObjectId, ref: 'member', required: true, },
        _idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, },
        price: { type: Number, require: true },
        startDate: { type: String, require: true },
        endDate: { type: String, require: true },
        status: { type: String, require: true },
    },

);

const LoanDeltail = mongoose.model('loandetail', dataLoanDeltail);
module.exports = LoanDeltail;
