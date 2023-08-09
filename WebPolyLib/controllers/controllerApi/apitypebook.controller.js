const md = require('../../model/modeltypebook');
const mongoose = require('mongoose');

//uri
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";
exports.listTypeBook = async (req, res, next) => {
    await mongoose.connect(uri);
    let ds = await md.find();
    console.log(ds.length + " list book");
    if (ds) {
        return res.status(200).json({ data: ds, check: 'có dữ liệu', count: ds.length });
    }
    else {
        return res.status(404).json({ check: 'không có dữ liệu' });
    }
}
//add 
exports.addTypeBook = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.json({ status: 0, message: 'Dữ liệu không hợp lệ' });
    }

    try {
        const validateNameType = await md.findOne({ name });
        if (validateNameType) {
            return res.json({ status: 0, message: 'Tên loại sách đã có trong cơ sở dữ liệu' })
        };

        const typeBook = new md({ name });
        const result = await typeBook.save();
        res.json({ status: 1, message: 'Thêm loại sách thành công', data: result });
    } catch (err) {
        res.json({ status: 0, message: 'Thêm loại sách thất bại', error: err.message });
    }
};
//update type book
exports.updateTypeBook = async (req, res, next) => {
    const { _id, name, } = req.body;
    try {
        const update = await md.findByIdAndUpdate(_id, { name }, { new: true });
        if (!update) {
            return res.json({ status: 0, message: 'Không tìm thấy loại sách' });
        }
        res.json({ status: 1, message: 'Cập nhật thành công', data: update });
    } catch (err) {
        res.json({ status: 0, message: 'Cập nhật thất bại', error: err.message });
    }
};

//delete type book
exports.deleteTypeBook = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const deleted = await md.findByIdAndDelete(_id);
        if (!deleted) {
            return res.json({ status: 0, message: 'Không tìm thấy loại sách' });
        }
        res.json({ status: 1, message: 'Xóa thành công', data: deleted });
    } catch (err) {
        res.json({ status: 0, message: 'Xóa thất bại', error: err.message });
    }
};
