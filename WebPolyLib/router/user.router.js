const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")
const app = express();

router.get('/user', userController.listUser)
router.get('/adduser', userController.addUser)
router.get('/updateuser', userController.updateUser)

module.exports = router;