const mdloandeltail = require('../../model/modelloandeltail');
const mdbook = require('../../model/modelbook');
const mduser = require('../../model/modeluser');
const mdmember = require('../../model/modelmember');
const mongoose = require('mongoose');
//uri
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";
//list brower

exports.listLoanDeltail = async (req, res, next) => {
    try {
        const ds = await mdloandeltail.find();
        if (ds) {
            const borrowWithAdditionalInfo = await Promise.all(ds.map(async (deltail) => {
                const book = await mdbook.findById(deltail._idBook);
                const member = await mdmember.findById(deltail._idMember);
                const user = await mduser.findById(deltail._idUser);
                if (book && member && user) {
                    deltail = deltail.toObject(); // Chuyển đổi đối tượng Mongoose sang đối tượng JavaScript thông thường
                    deltail.bookName = book.name;
                    deltail.userName = user.name;
                    deltail.phoneNumer = member.phone;
                    deltail.nameNumber = member.name;
                    return deltail;
                } else {
                    deltail.bookName = "Không tìm thấy dữ liệu";
                    deltail.userName = "Không tìm thấy dữ liệu";
                    deltail.phoneNumer = "Không tìm thấy dữ liệu";
                    deltail.nameNumber = "Không tìm thấy dữ liệu";
                    return deltail;
                }
            }));

            return res.status(200).json({ data: borrowWithAdditionalInfo, check: 'có dữ liệu' });
        } else {
            return res.status(404).json({ check: 'không có dữ liệu' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//add loand deltail
exports.addLoand = async (req, res, next) => {
    try {
        const { userName, bookTitle, librarianName, startDate, endDate, phoneUser, price, status } = req.body;

        // Tìm id của người mượn dựa vào tên thành viên
        const user = await mduser.findOne({ name: userName });
        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin người mượn.' });
        }

        // Tìm id của sách dựa vào tên sách
        const book = await mdbook.findOne({ name: bookTitle });
        if (!book) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin sách.' });
        }

        // Tìm id của thành viên dựa vào tên thủ thư và số điện thoại
        const member = await mdmember.findOne({ name: librarianName, phone: phoneUser });
        if (!member) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin thành viên.' });
        }

        // Kiểm tra xem giá, ngày bắt đầu và ngày kết thúc có hợp lệ hay không
        if (!price || !startDate || !endDate) {
            console.log(startDate, endDate);
            return res.status(400).json({ error: 'Thiếu thông tin giá, ngày bắt đầu hoặc ngày kết thúc.' });
        }

        // Tạo phiếu mượn mới
        const newLoan = new mdloandeltail({
            _idUser: user._id,
            _idBook: book._id,
            _idMember: member._id,
            price,
            startDate,
            endDate,
            status: status || 'no', // Sử dụng trạng thái "no" nếu không có trạng thái được cung cấp
        });

        // Lưu phiếu mượn vào cơ sở dữ liệu
        const savedLoan = await newLoan.save();

        return res.status(201).json({ data: savedLoan, message: 'Thêm phiếu mượn thành công.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update
exports.updateLoan = async (req, res, next) => {
    try {
        const { userName, bookTitle, librarianName, startDate, endDate, phoneUser, price, status , _id } = req.body;

        // Tìm id của người mượn dựa vào tên thành viên
        const user = await mduser.findOne({ name: userName });
        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin người mượn.' });
        }

        // Tìm id của sách dựa vào tên sách
        const book = await mdbook.findOne({ name: bookTitle });
        if (!book) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin sách.' });
        }

        // Tìm id của thành viên dựa vào tên thủ thư và số điện thoại
        const member = await mdmember.findOne({ name: librarianName, phone: phoneUser });
        if (!member) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin thành viên.' });
        }

        // Kiểm tra xem giá, ngày bắt đầu và ngày kết thúc có hợp lệ hay không
        if (!price || !startDate || !endDate) {
            console.log(startDate, endDate);
            return res.status(400).json({ error: 'Thiếu thông tin giá, ngày bắt đầu hoặc ngày kết thúc.' });
        }

        // Tìm phiếu mượn cần cập nhật dựa vào loanId
        const loanToUpdate = await mdloandeltail.findById(_id);
        if (!loanToUpdate) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin phiếu mượn cần cập nhật.' });
        }
        // Cập nhật thông tin phiếu mượn
        loanToUpdate._idUser = user._id;
        loanToUpdate._idBook = book._id;
        loanToUpdate._idMember = member._id;
        loanToUpdate.price = price;
        loanToUpdate.startDate = startDate;
        loanToUpdate.endDate = endDate;
        loanToUpdate.status = status || 'no'; // Sử dụng trạng thái "no" nếu không có trạng thái được cung cấp

        // Lưu phiếu mượn đã cập nhật vào cơ sở dữ liệu
        const updatedLoan = await loanToUpdate.save();

        return res.status(201).json({ data: updatedLoan, message: 'Sửa phiếu mượn thành công.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//delete 
exports.deleteLoan = async (req, res, next) => {
    const { _id } = req.body;
    try {
        const deleted = await mdloandeltail.findByIdAndDelete(_id);
        if (!deleted) {
            return res.json({ status: 0, message: 'Không tìm thấy dữ liệu' });
        }
        res.json({ status: 1, message: 'Xóa thành công', data: deleted });
    } catch (err) {
        res.json({ status: 0, message: 'Xóa thất bại', error: err.message });
    }
};