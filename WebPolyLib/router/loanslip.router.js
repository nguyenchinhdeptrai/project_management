const express = require("express");
const router = express.Router();
const loanSlipController = require("../controllers/loanslip.controller")
const app = express();

router.get('/list', loanSlipController.listLoanSlip)
router.get('/infomation', loanSlipController.infomationLoanSlip)

router.post('/getIdLoanSlip', loanSlipController.getId)

module.exports = router;