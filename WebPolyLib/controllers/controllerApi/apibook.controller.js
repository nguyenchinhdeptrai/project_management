const md = require('../../model/modelbook');
const md1 = require('../../model/modeltypebook');
const mongoose = require('mongoose');
//uri
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";
exports.listBook = async (req, res, next) => {
    try {
        const ds = await md.find();
        if (ds) {
            const booksWithCategoryName = await Promise.all(ds.map(async (book) => {
                const category = await md1.findById(book._idType);
                if (category) {
                    book = book.toObject(); // Chuyển đổi đối tượng Mongoose sang đối tượng JavaScript thông thường
                    book.categoryName = category.name;
                    return book;
                } else {
                    book.categoryName = "Không tìm thấy loại sách";
                    return book;
                }
            }));
            //count the number of books in the array
            const countBook = booksWithCategoryName.length;

            return res.status(200).json({ data: booksWithCategoryName, check: 'có dữ liệu', count: countBook });
        } else {
            return res.status(404).json({ check: 'không có dữ liệu' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//list typebook
exports.listTypeBook = async (req, res, next) => {
    await mongoose.connect(uri);
    let ds = await md1.find();
    console.log(ds + " list book");
    if (ds) {
        return res.status(200).json({ data: ds, check: 'có dữ liệu' });
    }
    else {
        return res.status(404).json({ check: 'không có dữ liệu' });
    }
}


//add 
exports.addBook = async (req, res, next) => {
    const { years, name, count, img, _idType, author } = req.body;
    if (!years || !name || !img || !count || !_idType) {
        return res.json({ status: 0, message: 'Dữ liệu không hợp lệ' });
    }

    try {
        const validateBook = await md.findOne({ name });
        if(validateBook){
            return res.json({status:1 , message:'Tên sách đã có trong cơ sở dữ liệu'})
        }

        const book = new md({ name, years, img, count, _idType, author });
        const result = await book.save();
        res.json({ status: 1, message: 'Thêm thành công', data: result });
    } catch (err) {
        res.json({ status: 0, message: 'Thêm thất bại', error: err.message });
    }
};
//update
exports.updateBook = async (req, res, next) => {
    const { _id, years, name, count, img, _idType } = req.body;
    try {
        const update = await md.findByIdAndUpdate(_id, { years, name, count, img, _idType }, { new: true });
        if (!update) {
            return res.json({ status: 0, message: 'Không tìm thấy dữ liệu' });
        }
        res.json({ status: 1, message: 'Cập nhật thành công', data: update });
    } catch (err) {
        res.json({ status: 0, message: 'Cập nhật thất bại', error: err.message });
    }
};

//delete 
exports.deleteBook = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const deleted = await md.findByIdAndDelete(_id);
        if (!deleted) {
            return res.json({ status: 0, message: 'Không tìm thấy dữ liệu' });
        }
        res.json({ status: 1, message: 'Xóa thành công', data: deleted });
    } catch (err) {
        res.json({ status: 0, message: 'Xóa thất bại', error: err.message });
    }
};