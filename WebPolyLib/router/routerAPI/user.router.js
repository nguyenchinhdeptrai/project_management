const express = require('express');
const router = express.Router();
const api_user = require('../../controllers/controllerApi/apiuser.controller');
router.get('/user', api_user.listUser);
router.post('/adduser',api_user.addUser);
router.put('/updateuser',api_user.updateUser);
router.put('/changeprofile',api_user.changeProfileUser);
router.put('/changepassword',api_user.checkPassword);

router.delete('/deleteuser',api_user.deleteUser);
module.exports = router;