const express = require("express");
const router = express.Router();
const typeBookController = require("../controllers/typebook.controller")
const app = express();

router.get('/type', typeBookController.listType)
router.get('/addtype', typeBookController.addType)
router.get('/updatetypebook', typeBookController.updateType)

module.exports = router;