const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
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

router.get('/book', bookController.listBook)

router.get('/addbook', bookController.layoutaddBook)
router.post('/addbook', upload.single('myImage'), bookController.addBook)

router.get('/updatebook', bookController.layoutupdateBook)
router.post('/updatebook', upload.single('myImage'), bookController.updateBook)

router.post('/deletebook', bookController.deleteBook)

router.post('/getIdBook', bookController.getId)

module.exports = router;