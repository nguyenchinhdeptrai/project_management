const express = require('express');
const router = express.Router();
const api_type_book = require('../../controllers/controllerApi/apitypebook.controller');

router.get('/typebook',api_type_book.listTypeBook);
router.post('/addtypebook',api_type_book.addTypeBook);
router.put('/updatetypebook',api_type_book.updateTypeBook);
router.delete('/deleteTypeBook',api_type_book.deleteTypeBook);
module.exports = router;