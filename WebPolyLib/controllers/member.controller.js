const mongoose = require('mongoose');
const md = require('../model/modelmember');
const uri = 'mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority';
mongoose.connect(uri);


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
    const { name, address, phone, img } = req.body;

    var phoneNumberRegex = /^[0-9]{10}$/;

    let objMember = { name: name, address: address, phone: phone, img: img };

    if (!name || !address || !phone || !img) {
        console.log("Chưa đủ thông tin");
        return res.send('<script>alert("Chưa đủ thông tin."); window.location="/addmember";</script>');
    } else if (isNaN(phone)) {
        console.log("phải là số");
        return res.send('<script>alert("Số điện thoại phải là số."); window.location="/addmember";</script>');
    } else if (!phoneNumberRegex.test(phone)) {
        console.log("Số điện thoại chưa đúng định dạng");
        return res.send('<script>alert("Số điện thoại sai định dạng."); window.location="/addmember";</script>');
    } else {
        let kq = await md.insertMany(objMember);
        console.log(kq);
        return res.send('<script>alert("Thêm thành viên thành công."); window.location="/member";</script>');
    }
    res.render('member/addmember', {
        layout: 'main'
    })
}
exports.layoutupdate = async (req, res) => {
    let arrMember = await md.find({ _id: getId }).lean();
    res.render('member/updatemember', {
        layout: 'main',
        data: arrMember
    })
}
exports.update = async (req, res) => {
    const { name, address, phone, img } = req.body;

    var phoneNumberRegex = /^[0-9]{10}$/;

    let objMember = {  name: name, address: address, phone: phone, img: img };

    if ( !name || !address || !phone || !img) {
        console.log("Chưa đủ thông tin");
        return res.send('<script>alert("Chưa đủ thông tin."); window.location="/updatemember";</script>');
    } else if (isNaN(phone)) {
        console.log("phải là số");
        return res.send('<script>alert("Số điện thoại phải là số."); window.location="/updatemember";</script>');
    } else if (!phoneNumberRegex.test(phone)) {
        console.log("Số điện thoại chưa đúng định dạng");
        return res.send('<script>alert("Số điện thoại sai định dạng."); window.location="/updatemember";</script>');
    } else {
        let kq = await md.updateOne({ _id: getId }, objMember);
        console.log(kq);
        return res.send('<script>alert("Sửa thành viên thành công."); window.location="/member";</script>');
    }
    res.render('member/updatemember', {
        layout: 'main',

    })
}
//Lấy id
var getId;
exports.getId = (req, res) => {
    const { _id } = req.body;
    getId = _id;
    console.log("Lấy Id thành công" + getId);
    res.redirect('/updatemember');
    return;
}

exports.deletemember = async (req, res) => {
    const { id } = req.body;
    await md.deleteOne({ _id: id });
    console.log("Xóa thành công");
    res.redirect('/member');
    return;
}

exports.getSeach = async (req, res) => {
    const { searchString } = req.query;
    if (searchString != "") {
        let arrMember = await md.find().lean();

        let result = [];
        for (let index = 0; index < arrMember.length; index++) {
            const element = arrMember[index];
            if (element.phone.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
                result.push(element);
            }
        }
        var newArr = result;
        res.render('member/listmember', {
            layout: 'main',
            data: newArr,
        })
    }
    else {
        res.redirect('/member');
    }
}