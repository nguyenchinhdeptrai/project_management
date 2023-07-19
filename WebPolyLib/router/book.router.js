const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller")
const app = express();

router.get('/book', bookController.listBook)
router.get('/addbook', bookController.addBook)
router.get('/updatebook', bookController.updateBook)

module.exports = router;