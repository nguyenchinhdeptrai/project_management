const mdbook = require('../../model/modelbook');
const md1 = require('../../model/modeltypebook');
const mongoose = require('mongoose');
//uri
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";

exports.seachNameBook = async (req, res, next) => {
    await mongoose.connect(uri);
    try {
        const searchName = req.body.name; // Lấy tên sách cần tìm kiếm từ query parameters (hoặc req.body tùy vào việc gửi dữ liệu từ client)

        let ds;
        if (searchName) {
            // Nếu có tên sách cần tìm kiếm, thực hiện lấy danh sách sách có tên chứa từ khóa tìm kiếm
            ds = await mdbook.find({ name: { $regex: searchName, $options: 'i' } }); // Sử dụng biểu thức chính quy ($regex) để tìm kiếm theo tên sách và 'i' để không phân biệt chữ hoa/chữ thường
        } else {
            return res.status(404).json({ check: 'không có dữ liệu' });
        }

        if (ds.length > 0) {
            const booksWithCategoryName = await Promise.all(ds.map(async (book) => {
                const category = await md1.findById(book._idType);
                if (category) {
                    book = book.toObject();
                    book.categoryName = category.name;
                    return book;
                } else {
                    book.categoryName = "Không tìm thấy loại sách";
                    return book;
                }
            }));

            return res.status(200).json({ data: booksWithCategoryName, check: 'có dữ liệu' });
        } else {
            return res.status(404).json({ check: 'không có dữ liệu' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.demo = async (req, res, next) => {
    await mongoose.connect(uri);
    try {
        const searchName = req.body.name; // Lấy tên loại sách cần tìm kiếm từ query parameters

        if (!searchName) {
            return res.status(400).json({ error: 'Vui lòng cung cấp tên loại sách cần tìm kiếm' });
        }
        const searchRegex = new RegExp(searchName, 'i');

        const category = await md1.findOne({ name: searchRegex });

        if (category) {
            // Nếu tìm thấy loại sách, lấy id của loại sách
            const categoryId = category._id.toString();
            console.log(categoryId + " id typebook");
            const nameType = await md1.findOne({ _id: categoryId });
            // Tiếp tục tìm kiếm các sách thuộc loại này trong bảng sách
            const ds = await mdbook.find({ _idType: categoryId });
            console.log(ds + " list");
            if (ds.length > 0) {
                const responseData = {
                    data: ds,
                    typeName: nameType ? nameType.name : null
                };
                return res.status(200).json(responseData);
            } else {
                return res.status(404).json({ check: 'không có dữ liệu' });
            }
        } else {
            return res.status(404).json({ error: 'Không tìm thấy loại sách' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
