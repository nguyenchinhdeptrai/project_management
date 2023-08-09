const express = require('express');
const router = express.Router();
const api_member = require('../../controllers/controllerApi/apimember.controller');

const multer = require('multer');
const path = require('path');
// Cấu hình Multer để lưu trữ ảnh được tải lên trong thư mục 'uploads' và thay đổi tên tệp.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Thiết lập middleware Multer với cấu hình đã chỉ định
const upload = multer({ storage });

router.get('/member', api_member.listMember);
//router.post('/addmember', upload.single('img'), api_member.addMember);
router.post('/addmember', api_member.addMember);
router.put('/updatemember', api_member.updateMember);
router.delete('/deletemember', api_member.deleteMember);

router.get('/checkPhoneMember', api_member.checkPhoneMember)
module.exports = router;