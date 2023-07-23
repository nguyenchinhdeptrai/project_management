const express = require('express');
const router = express.Router();
const api_loandeltail = require('../../controllers/controllerApi/loandeltail.controller');
router.get('/loandeltail', api_loandeltail.listLoanDeltail);

module.exports = router;