const mduser = require('../../model/modeluser');

const mongoose = require('mongoose');
const uri = "mongodb+srv://phungchikien196:Qa4168ciXnRnjV9G@apppolylib.5gjczzc.mongodb.net/PolyLib?retryWrites=true&w=majority";
const jwt = require('jsonwebtoken');
//khóa bí mật
const secretKey = 'your_secret_key';

let globalToken = null; // Khởi tạo biến toàn cục để lưu trữ token
// Route xử lý yêu cầu đăng nhập.
exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!/^\d+$/.test(phone)) {
            return res.status(400).json({ message: 'Số điện thoại chỉ được chứa số' });
        }

        // Define a regular expression for phone number validation
        const phoneRegex = /^0\d{9}$/;

        // // Validate phone number format
        if (!phone.match(phoneRegex)) {
            return res.status(400).json({ message: 'Số điện thoại không hợp lệ' });
        }
        // Validate phone number contains only digits

        const user = await mduser.findOne({ phone: phone, password:password});
        console.log(user + ' người đăng nhập');
        if (user) {
            const token = jwt.sign({ id: user._id }, secretKey);
            globalToken = token; // Lưu trữ token vào biến toàn cục
            console.log('Token:', token);

            res.json({ token: token, message: 'Đăng nhập thành công' });
        } else {
            res.status(401).json({ message: 'Đăng nhập không thành công' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Middleware xác thực token.
exports.authenticateToken = (req, res, next) => {
    const token = globalToken; // Sử dụng biến toàn cục để lấy token

    if (!token) {
        console.log('Token is missing.'); // Log thông báo khi token không tồn tại
        return res.sendStatus(401);
    }

    console.log('Received token:', token); // Log token nhận được

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Error while verifying token:', err); // Log lỗi xác thực token
            return res.sendStatus(403);
        }

        // Kiểm tra thời gian hết hạn của token
        const currentTimestamp = Date.now() / 1000; // Chuyển đổi thời gian hiện tại sang giây
        if (decoded.exp < currentTimestamp) {
            console.log('Token has expired.'); // Log thông báo khi token đã hết hạn
            return res.sendStatus(403);
        }

        req.user = decoded;
        next();
    });
};

// verity token
exports.getUserInfo = async (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.json({ status: 0, message: 'Token không hợp lệ' });
    }
    try {
        const decodeToken = jwt.verify(token, secretKey);
        console.log(decodeToken.id + ' token trả về');
        const userData = await mduser.findOne({ _id: decodeToken.id });
        if (!userData) {
            return res.json({ status: 0, message: 'Người dùng không tồn tại' });
        }
        console.log(userData + ' dữ liệu đăng nhập');
        res.json({ status: 1, message: 'Thành công', data: userData });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.json({ status: 0, message: 'Token không hợp lệ trong phần xác thực jwt' });
        } else if (err.name === 'TokenExpiredError') {
            return res.json({ status: 0, message: 'Token đã hết hạn' });
        } else {
            console.error('Error while querying the database:', err);
            return res.json({ status: 0, message: 'Lỗi khi truy vấn cơ sở dữ liệu', error: err.message });
        }
    }
}