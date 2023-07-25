const mongoose = require('mongoose');
const md = require('../model/modelloandeltail');
const md1 = require('../model/modelbook');
const md2 = require('../model/modelmember');
const md3 = require('../model/modeluser');

const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);

exports.listLoanSlip = async (req, res) => {
    let arrLoanSlip = await md.find()
        .populate('_idBook')
        .populate('_idMember')
        .populate('_idUser')
        .lean();
    res.render('loanslip/listloanslip', {
        layout: 'main',
        data: arrLoanSlip
    })
}
exports.infomationLoanSlip = async (req, res) => {

    let arrLoanSlip = await md.find({ _id: getId })
        .populate('_idBook')
        .populate('_idMember')
        .populate('_idUser')
        .lean();


    res.render('loanslip/infomationloanslip', {
        layout: 'main',
        data: arrLoanSlip
    })
}

//Lấy id
var getId;
exports.getId = (req, res) => {
    const { _id } = req.body;
    getId = _id;
    console.log("Lấy Id thành công" + getId);
    res.redirect('/infomation');
    return;
}
