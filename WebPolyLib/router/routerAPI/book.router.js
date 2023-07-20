const express = require('express');
const router = express.Router();
const api_book = require('../../controllers/controllerApi/apibook.controller');

router.get('/books',api_book.listBook);
router.post('/addbook',api_book.addBook);
router.put('/updatebook',api_book.updateBook);
router.delete('/deletebook',api_book.deleteBook);

module.exports = router;