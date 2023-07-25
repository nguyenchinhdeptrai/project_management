const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const multer = require('multer');
const fs = require("fs");
const app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const dir = "./uploads"
        //Nếu chưa có thư mục đó thì tạo nó ra
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        var tenGoc = file.originalname;
        console.log(tenGoc);
        arr = tenGoc.split('.');

        let newFileName = '';
        for (let i = 0; i < arr.length; i++) {
            if (i != arr.length - 1) {
                newFileName += arr[i]
            } else {
                newFileName += ('-' + Date.now() + '.' + arr[i])
            }

        }

        cb(null, newFileName)
    }
})


var upload = multer({ storage: storage })
//function's get methods user
router.get('/user', userController.listUser)
router.get('/adduser', userController.layoutAddUser)
router.get('/updateuser', userController.layoutUpdateUser)
// function's post method user
router.post('/adduser', upload.single('myImage'), userController.addUser);
router.post('/getIdUser', userController.getId);
router.post('/updateuser', upload.single('myImage'), userController.updateUser);
router.post('/delteuser',userController.deleteUser)

module.exports = router;