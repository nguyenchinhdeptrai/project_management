const express = require('express');
const router = express.Router();
const api_loandeltail = require('../../controllers/controllerApi/loandeltail.controller');

router.get('/loandeltail', api_loandeltail.listLoanDeltail);
router.post('/addloan',api_loandeltail.addLoand);
router.put('/updateloan',api_loandeltail.updateLoan);
router.delete('/deleteloan',api_loandeltail.deleteLoan);
//list book
router.get('/listborrower',api_loandeltail.mostBorrowerBooks);

module.exports = router;