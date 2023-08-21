const mongoose = require('mongoose');
const md = require('../model/modeltypebook');
const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);
console.log("Kết nối DB thành công");


exports.listType = async (req, res) => {
    let arrTypeBook = await md.find().lean();

    res.render('typebook/listtypebook', {
        layout: 'main',
        data: arrTypeBook
    })
}
exports.layoutaddType = async (req, res) => {
    res.render('typebook/addtype', {
        layout: 'main'
    })
}
exports.addType = async (req, res) => {


    const { name } = req.body;
    let objTypeBook = { name: name };
    if (!name) {
        console.log("lỗi");
    } else {
        let kq = await md.insertMany(objTypeBook);
        res.redirect('/typeBook');
        console.log(kq);

    }
    res.render('typebook/addtype', {
        layout: 'main'
    })
}
exports.layoutupdateType = async (req, res) => {
    let arrTypeBook = await md.find({ _id: getId }).lean();

    res.render('typebook/updatetype', {
        layout: 'main',
        data: arrTypeBook
    })
}
exports.updateType = async (req, res) => {
    const { name } = req.body;
    let objTypeBook = { name: name };

    if (!name) {
        console.log("lỗi");
    } else {
        let kq = await md.updateOne({ _id: getId }, objTypeBook);
        res.redirect('/typeBook');
        console.log(kq);
    }
    res.render('typebook/updatetype', {
        layout: 'main',
    })
}
//Lấy id
var getId;
exports.getId = (req, res) => {
    const { _id } = req.body;
    getId = _id;
    console.log("Lấy Id thành công");
    res.redirect('/updatetypebook');
    return;
}

exports.deleteType = async (req, res) => {
    const { id } = req.body;
    await md.deleteOne({ _id: id });
    console.log("Xóa thành công");
    res.redirect('/typeBook');
    return;
}

exports.getSeach = async (req, res) => {
    const { searchString } = req.query;
    if (searchString != "") {
        let arrTypeBook = await md.find().lean();

        let result = [];
        for (let index = 0; index < arrTypeBook.length; index++) {
            const element = arrTypeBook[index];
            if (element.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                result.push(element);
            }
        }
        var newArr = result;
        res.render('typebook/listtypebook', {
            layout: 'main',
            data: newArr,
        })
    }
    else {
        res.redirect('/typeBook');
    }
}