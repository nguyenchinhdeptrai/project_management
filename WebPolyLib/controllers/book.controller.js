const mongoose = require('mongoose');
const md = require('../model/modelbook');
const md1 = require('../model/modeltypebook');

const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);


exports.listBook = async (req, res) => {
    let arrBook = await md.find().populate('_idType').lean();
    res.render('book/listbook', {
        layout: 'main',
        data: arrBook,
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
    let arrTypeBook = await md1.find().lean();
    const { name, author, years, count, selectType, img } = req.body;

    let objBook = { name: name, author: author, years: years, count: count, img: img, _idType: selectType }

    if (!name || !author || !years || !count || !selectType || !img) {
        console.log("Chưa đủ thông tin");
        res.redirect('/addbook');
    } else if (isNaN(count)) {
        console.log("Số lượng phải là số");
        res.redirect('/addbook');
    } else {
        let kq = await md.insertMany(objBook);
        res.redirect('/book')
        console.log(kq);
        return;
    }

    res.render('book/addbook', {
        layout: 'main',
        dataTypeBook: arrTypeBook,
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
    const { name, author, years, count, selectType, img } = req.body;

    let objBook = { name: name, author: author, years: years, count: count, img: img, _idType: selectType }

    if (!name || !author || !years || !count || !selectType || !img) {
        console.log("Chưa đủ thông tin");
        res.redirect('/updatebook');
    } else if (isNaN(count)) {
        console.log("Số lượng phải là số");
        res.redirect('/updatebook');
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

exports.getSeach = async (req, res) => {
    const { searchString } = req.query;
    if (searchString != "") {
        let arrBook = await md.find().populate('_idType').lean();

        let result = [];
        for (let index = 0; index < arrBook.length; index++) {
            const element = arrBook[index];
            if (element.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                result.push(element);
            }
        }
        var newArr = result;
        res.render('book/listbook', {
            layout: 'main',
            data: newArr,
        })
    }
    else {
        res.redirect('/book');
    }
}