const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const app = express();


router.get('/book', bookController.listBook)

router.get('/addbook', bookController.layoutaddBook)
router.post('/addbook', bookController.addBook)

router.get('/updatebook', bookController.layoutupdateBook)
router.post('/updatebook', bookController.updateBook)

router.post('/deletebook', bookController.deleteBook)

router.post('/getIdBook', bookController.getId)

router.get('/search', bookController.getSeach)
router.post('/search', bookController.getSeach)

module.exports = router;