const express = require('express');
const router = express.Router();
const logn_controller = require('../../controllers/controllerApi/login.controller');

router.get('/getdata', logn_controller.authenticateToken, (req, res) => {
    res.json({ message: 'Bạn đã truy cập vào route được bảo vệ bằng token.' });
});
router.post('/login', logn_controller.login);
router.post('/accurary', logn_controller.getUserInfo);
module.exports = router;