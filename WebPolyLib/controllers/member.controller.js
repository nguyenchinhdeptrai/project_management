const mongoose = require('mongoose');
const md = require('../model/modelmember');
const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);
console.log("Kết nối DB thành công");

exports.listMember = async (req, res) => {
    let arrMember = await md.find().lean();
    res.render('member/listMember', {
        layout: 'main',
        data: arrMember
    })
}
exports.layoutadd = (req, res) => {
    res.render('member/addmember', {
        layout: 'main'
    })
}
exports.add = async (req, res) => {
    const {memberID, name, address, phone} = req.body;
    const file = req.file.path;
    const image = "http://localhost:3000/" + file; 

    var phoneNumberRegex = /^[0-9]{10}$/;

    let objMember = {memberID: memberID, name: name, address: address, phone: phone, img: image};

    if (!memberID || !name || !address || !phone) {
        console.log("Chưa đủ thông tin");
    } else if(isNaN(phone)) {
        console.log("phải là số");
    }else if(!phoneNumberRegex.test(phone)) {
        console.log("Số điện thoại chưa đúng định dạng");
    }else {
        let kq = await md.insertMany(objMember);
        res.redirect('/member')
        console.log(kq);
        return;
    }
    res.render('member/addmember', {
        layout: 'main'
    })
}
exports.update = (req, res) => {
    res.render('member/updatemember', {
        layout: 'main'
    })
}