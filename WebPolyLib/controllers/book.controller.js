const mongoose = require('mongoose');
const md = require('../model/modelbook');
const md1 = require('../model/modeltypebook');

const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);
console.log("Kết nối DB thành công");

exports.listBook = async (req, res) => {
    let arrBook = await md.find().populate('_idType').lean();

    res.render('book/listbook', {
        layout: 'main',
        data: arrBook
    })
}
exports.layoutaddBook = async (req, res) => {
    let arrTypeBook = await md1.find().lean();
    res.render('book/addbook', {
        layout: 'main',
        dataTypeBook: arrTypeBook,
    })
}
exports.addBook = async (req, res) => {

    const { name, author, years, count, selectType } = req.body;
    const file = req.file.path;
    const image = "http://localhost:3000/" + file;

    let objBook = { name: name, author: author, years: years, count: count, _idType: selectType, img: image }

    if (!name || !author || !years || !count || !selectType) {
        console.log("Chưa đủ thông tin");
    } else if (isNaN(count)) {
        console.log("Số lượng phải là số");
    } else {
        let kq = await md.insertMany(objBook);
        res.redirect('/book')
        console.log(kq);
        return;
    }

    res.render('book/addbook', {
        layout: 'main',

    })
}
exports.layoutupdateBook = async (req, res) => {
    let arrBook = await md.find({ _id: getId }).populate('_idType').lean();
    let arrTypeBook = await md1.find().lean();
    res.render('book/updatebook', {
        layout: 'main',
        data: arrBook,
        dataTypeBook: arrTypeBook,
    })
}
exports.updateBook = async (req, res) => {
    const { name, author, years, count, selectType } = req.body;
    const file = req.file.path;
    const image = "http://localhost:3000/" + file;

    let objBook = { name: name, author: author, years: years, count: count, _idType: selectType, img: image }

    if (!name || !author || !years || !count || !selectType) {
        console.log("Chưa đủ thông tin");
    } else if (isNaN(count)) {
        console.log("Số lượng phải là số");
    } else {
        let kq = await md.updateOne({ _id: getId }, objBook);
        res.redirect('/book')
        console.log(kq);
        return;
    }
    res.render('book/updatebook', {
        layout: 'main',

    })
}
//Lấy id
var getId;
exports.getId = (req, res) => {
    const { _id } = req.body;
    getId = _id;
    console.log("Lấy Id thành công" + getId);
    res.redirect('/updatebook');
    return;
}

exports.deleteBook = async (req, res) => {
    const { id } = req.body;
    await md.deleteOne({ _id: id });
    console.log("Xóa thành công");
    res.redirect('/book');
    return;
}