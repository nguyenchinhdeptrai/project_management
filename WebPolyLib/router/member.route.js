const express = require("express");
const router = express.Router();
const memberControllers = require("../controllers/member.controller")
const multer = require('multer');
const fs = require("fs");
const app = express();

// SET STORAGE
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

router.get('/member', memberControllers.listMember)

router.get('/addmember', memberControllers.layoutadd)
router.post('/addmember', upload.single('myImage'), memberControllers.add)

router.get('/updatemember', memberControllers.layoutupdate)
router.post('/updatemember', upload.single('myImage'), memberControllers.update)

router.post('/getIdMember', memberControllers.getId)

router.post('/deletemember', memberControllers.deletemember)
module.exports = router;