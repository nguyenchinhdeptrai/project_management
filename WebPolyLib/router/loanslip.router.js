const express = require("express");
const router = express.Router();
const routerLoanSlip = require("../controllers/loanslip.controller")
const app = express();

router.get('/list', routerLoanSlip.listLoanSlip)
router.get('/infomation', routerLoanSlip.infomationLoanSlip)

module.exports = router;