const mdmember = require('../../model/modelmember');

const mongoose = require('mongoose');
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";
//



//list member
exports.listMember = async (req, res, next) => {
    await mongoose.connect(uri);
    let ds = await mdmember.find();
    console.log(ds + " list member");
    if (ds) {
        return res.status(200).json({ data: ds, check: 'có dữ liệu' });
    }
    else {
        return res.status(404).json({ check: 'không có dữ liệu' });
    }
}
//add member
exports.addMember = async (req, res, next) => {
    const { phone, name, address, img } = req.body;
    if (!phone || !name || !address) {
        return res.status(400).json({ status: 0, message: 'Dữ liệu không hợp lệ' });
    }

    try {
        const validateMember = await mdmember.findOne({ phone });
        if(validateMember){
            return res.json({status: 0, message:'Thành viên đã tồn tại trong cơ sở dữ liêu'});
        }

        const user = new mdmember({ phone, name, address, img });
        const result = await user.save();
        res.status(200).json({ status: 1, message: 'Thêm thành công', data: result });
    } catch (err) {
        res.status(500).json({ status: 0, message: 'Thêm thất bại', error: err.message });
    }
};
//update
exports.updateMember = async (req, res, next) => {
    const { _id, phone, name, address, img, memberID, } = req.body;
    try {
        const update = await mdmember.findByIdAndUpdate(_id, { phone, name, address, img, memberID, }, { new: true });
        if (!update) {
            return res.json({ status: 0, message: 'Không tìm thấy dữ liệu' });
        }
        res.json({ status: 1, message: 'Cập nhật thành công', data: update });
    } catch (err) {
        res.json({ status: 0, message: 'Cập nhật thất bại', error: err.message });
    }
};
//delete 
exports.deleteMember = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const deleted = await mdmember.findByIdAndDelete(_id);
        if (!deleted) {
            return res.json({ status: 0, message: 'Không tìm thấy dữ liệu' });
        }
        res.json({ status: 1, message: 'Xóa thành công', data: deleted });
    } catch (err) {
        res.json({ status: 0, message: 'Xóa thất bại', error: err.message });
    }
};

//Check trùng phone 
exports.checkPhoneMember = async (req, res, next) => {
    try {
        const phone = req.query.phone;
        const existingMember = await mdmember.findOne({ phone: phone });
        if (existingMember) {
            return res.json({ isDuplicate: true });
        }
        res.json({ isDuplicate: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};