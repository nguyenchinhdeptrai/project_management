const mduser = require('../../model/modeluser');

const mongoose = require('mongoose');
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";
const { use } = require('../../router/member.route');

//list user
exports.listUser = async (req, res, next) => {
    await mongoose.connect(uri);
    let ds = await mduser.find();
    console.log(ds + " list user");
    if (ds) {
        return res.status(200).json({ data: ds, check: 'có dữ liệu' });
    }
    else {
        return res.status(404).json({ check: 'không có dữ liệu' });
    }
}

//add user
exports.addUser = async (req, res, next) => {
    const { phone, name, address, img, status, password } = req.body;
    if (!phone || !name || !img || !address || !password) {
        return res.json({ status: 0, message: 'Dữ liệu không hợp lệ' });
    }
    try {

        const validateUser = await mduser.findOne({ phone });
        if (validateUser) {
            return res.json({ status: 1, message: 'Thủ thư này đã tồn tại ' });
        }

        const user = new mduser({ name, phone, img, address, password, status, });
        const result = await user.save();
        res.json({ status: 1, message: 'Thêm thành công', data: result });
    } catch (err) {
        res.json({ status: 0, message: 'Thêm thất bại', error: err.message });
    }
};
//update
exports.updateUser = async (req, res, next) => {
    const { _id, phone, name, address, img, status, password } = req.body;
    try {
        const update = await mduser.findByIdAndUpdate(_id, { phone, name, address, img, status, password }, { new: true });
        if (!update) {
            return res.json({ status: 0, message: 'Không tìm thấy dữ liệu' });
        }
        res.json({ status: 1, message: 'Cập nhật thành công', data: update });
    } catch (err) {
        res.json({ status: 0, message: 'Cập nhật thất bại', error: err.message });
    }
};
//delete 
exports.deleteUser = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const deleted = await mduser.findByIdAndDelete(_id);
        if (!deleted) {
            return res.json({ status: 0, message: 'Không tìm thấy dữ liệu' });
        }
        res.json({ status: 1, message: 'Xóa thành công', data: deleted });
    } catch (err) {
        res.json({ status: 0, message: 'Xóa thất bại', error: err.message });
    }
};
//api chagne infomaton uesr

exports.changeProfileUser = async (req, res, next) => {
    const { _id, name, img, phone, address } = req.body;
    if (!name || !phone || !address || !img) {
        return res.json({ status: 0, message: 'Dữ liêu không hợp lệ' });
    }
    const updateInfo = {
        name: name,
        phone: phone,
        address: address,
        img: img
    };
    // if (name) updateInfo.name = name;
    // if (phone) updateInfo.phone = phone;
    // if (address) updateInfo.address = address;
    // if (img) updateInfo.img = img;
    console.log(updateInfo + ' check');
    try {
        const changeIno = await mduser.findByIdAndUpdate(_id, updateInfo, { new: true });

        if (!changeIno) {
            return res.json({ status: 0, message: 'không tìm thấy thông tin ' });
        }
        return res.json({ status: 1, message: 'cập nhật thành công', data: changeIno });
    } catch (e) {
        console.log(e);
    }
};
//check password
exports.checkPassword = async (req, res, next) => {
    const { old, newP, returnP, _id } = req.body;
    if (!old || !newP || !returnP) {
        return res.json({ status: 4, message: 'dữ liệu không hợp lệ' });
    };
    try {
        const user = await mduser.findOne({ _id: _id });
        if (!user) {
            return res.json({ status: 3, message: 'người dùng không họp lệ' });
        }
        if (user.password !== old) {
            return res.json({ status: 1, message: 'mật khẩu cũ không trùng khớp' });
        }
        if (newP !== returnP) {
            return res.json({ status: 2, message: '2 mật khẩu không trùng khớp' });
        } else {
            user.password = returnP;
            await user.save();
            return res.json({ status: 0, message: 'đổi thành công' });
        }


    } catch (e) {
        console.log(e);
    }

};


