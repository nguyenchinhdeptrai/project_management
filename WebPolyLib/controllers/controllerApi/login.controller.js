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

        const user = await mduser.findOne({ phone: phone, password: password });

        if (user) {
            const expiresIn = 360;

            const token = jwt.sign({ id: user._id }, secretKey, { expiresIn });
            globalToken = token; // Lưu trữ token vào biến toàn cục
            console.log('Token:', token);

            res.json({ message: 'Đăng nhập thành công' });
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

