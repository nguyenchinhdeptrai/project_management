const mongoose = require('mongoose');
const mduser = require('../model/modeluser');

const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);
console.log("Kết nối DB thành công");
// check return ob
const util = require('util');

exports.listUser = async (req, res) => {
    let arrUser = await mduser.find().lean();
    res.render('user/listuser', {
        layout: 'main',
        data: arrUser
    })
}


exports.addUser = async (req, res) => {
    const { name, address, phone, password, selectStatus } = req.body;
    const file = req.file.path;
    const image = "http://localhost:3000/" + file;

    let objUser = { name: name, address: address, phone: phone, password: password, status: selectStatus, img: image };
    if (!name || !address || !phone || !password || !selectStatus) {
        console.log("Chưa đủ thông tin");
    } else {
        let kq = await mduser.insertMany(objUser);
        res.redirect('/user')
        console.log(kq);
        return;
    }
}

exports.updateUser = async (req, res) => {
    const { name, address, phone, password, selectStatus } = req.body;
    const file = req.file;

    if (!name || !address || !phone || !password || !selectStatus) {
        console.log("Chưa đủ thông tin");
        return res.status(400).send("Chưa đủ thông tin");
    }

    if (!file) {
        console.log("Chưa chọn ảnh");
        return res.status(400).send("Chưa chọn ảnh");
    }

    const image = "http://localhost:3000/" + file.path;

    let objUser = { name: name, address: address, phone: phone, password: password, status: selectStatus, img: image };

    try {
        let kq = await mduser.updateOne({ _id: getId }, objUser);
        console.log(kq);
        return res.send('<script>alert("Cập nhật người dùng thành công."); window.location="/user";</script>');
    } catch (error) {
        console.log("Đã xảy ra lỗi: ", error);
        return res.status(500).send("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
};



exports.layoutAddUser = async (req, res) => {
    res.render('user/adduser', {
        layout: 'main',

    })
}
exports.layoutUpdateUser = async (req, res) => {
    let arrUsers = await mduser.find({ _id: getId }).lean();
    res.render('user/updateuser', {
        layout: 'main',
        data: arrUsers,
    })
}

//Lấy id
var getId;
exports.getId = (req, res) => {
    const { _id } = req.body;
    getId = _id;
    console.log("Lấy Id thành công" + getId);
    res.redirect('/updateuser');
    return;
}

exports.deleteUser = async (req, res) => {
    const { id } = req.body;
    await mduser.deleteOne({ _id: id });
    console.log("Xóa thành công");
    res.redirect('/user');
    return;
}