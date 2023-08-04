const mduser = require('../../model/modeluser');

const mongoose = require('mongoose');
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";


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
    const user = new mduser({ name, phone, img, address, password, status, });
    try {
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


