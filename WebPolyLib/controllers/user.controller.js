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
    const { name, address, phone, password, selectStatus, img } = req.body;

    let objUser = { name: name, address: address, phone: phone, password: password, status: selectStatus, img: img };
    if (!name || !address || !phone || !password || !selectStatus || !img) {
        console.log("Chưa đủ thông tin");
        return res.send('<script>alert("Chưa đủ thông tin."); window.location="/adduser";</script>');
    } else {
        let kq = await mduser.insertMany(objUser);
        res.redirect('/user')
        console.log(kq);
        return;
    }
}

exports.updateUser = async (req, res) => {
    const { name, address, phone, password, selectStatus, img } = req.body;

    if (!name || !address || !phone || !password || !selectStatus) {
        console.log("Chưa đủ thông tin");
        return res.send('<script>alert("Chưa đủ thông tin."); window.location="/updateuser";</script>');
    }

    if (!img) {
        console.log("Chưa chọn ảnh");
        return res.send('<script>alert("Chưa có link ảnh."); window.location="/updateuser";</script>');
    }

    let objUser = { name: name, address: address, phone: phone, password: password, status: selectStatus, img: img };

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

exports.getSeach = async (req, res) => {
    const { searchString } = req.query;
    if (searchString != "") {
        let arrUser = await mduser.find().lean();

        let result = [];
        for (let index = 0; index < arrUser.length; index++) {
            const element = arrUser[index];
            if (element.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                result.push(element);
            }
        }
        var newArr = result;
        res.render('user/listuser', {
            layout: 'main',
            data: newArr,
        })
    }
    else {
        res.redirect('/user');
    }
}