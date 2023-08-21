const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const app = express();

//function's get methods user
router.get('/user', userController.listUser)
router.get('/adduser', userController.layoutAddUser)
router.get('/updateuser', userController.layoutUpdateUser)
// function's post method user
router.post('/adduser', userController.addUser);
router.post('/getIdUser', userController.getId);
router.post('/updateuser', userController.updateUser);
router.post('/delteuser', userController.deleteUser)

router.get('/searchUser', userController.getSeach)

module.exports = router;