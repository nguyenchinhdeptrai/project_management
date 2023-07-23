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


//list book
exports.listTypeBook = async (req, res, next) => {
    await mongoose.connect(uri);
    let ds = await mdbook.find();
    console.log(ds + " list book");
    if (ds) {
        return res.status(200).json({ data: ds, check: 'có dữ liệu' });
    }
    else {
        return res.status(404).json({ check: 'không có dữ liệu' });
    }
}
//list member
exports.listTypeBook = async (req, res, next) => {
    await mongoose.connect(uri);
    let ds = await mdmember.find();
    console.log(ds + " list book");
    if (ds) {
        return res.status(200).json({ data: ds, check: 'có dữ liệu' });
    }
    else {
        return res.status(404).json({ check: 'không có dữ liệu' });
    }
}
//list user
exports.listTypeBook = async (req, res, next) => {
    await mongoose.connect(uri);
    let ds = await mduser.find();
    console.log(ds + " list book");
    if (ds) {
        return res.status(200).json({ data: ds, check: 'có dữ liệu' });
    }
    else {
        return res.status(404).json({ check: 'không có dữ liệu' });
    }
}