const express = require('express');
const router = express.Router();
const api_search = require('../../controllers/controllerApi/apisearchbook.controller');

//search name
router.post('/searchname',api_search.seachNameBook);

//search categoryBook name
router.post('/searchdemo',api_search.demo);

module.exports = router;