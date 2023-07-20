const mongoose = require('mongoose');
const typeBookModel = require('../model/typeBookModel');
const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);
console.log("Kết nối DB thành công");


exports.listType = (req, res) => {

    res.render('typebook/listtypebook', {
        layout: 'main'
    })
}

exports.addType = async (req, res) => {
    let arrTypeBook = await typeBookModel.find().lean();

    const { nametypebook } = req.body;
    var newStt = arrTypeBook[arrTypeBook.length - 1].stt + 1;
    let objTypeBook = { stt: newStt, nametypebook: nametypebook };
    if (!nametypebook) {
        console.log("lỗi");
    } else {
        let kq = await typeBookModel.insertMany(objTypeBook);
        res.redirect('/typeBook');
        console.log(kq);

    }
    res.render('typebook/addtype', {
        layout: 'main'
    })
}
exports.updateType = (req, res) => {
    res.render('typebook/updatetype', {
        layout: 'main'
    })
}