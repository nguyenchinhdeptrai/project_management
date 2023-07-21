const express = require("express");
const router = express.Router();
const typeBookController = require("../controllers/typebook.controller")
const app = express();

router.get('/typeBook', typeBookController.listType)

router.get('/addtype', typeBookController.addType)
router.post('/addtype', typeBookController.addType)

router.get('/updatetypebook', typeBookController.updateType)
router.post('/updatetypebook', typeBookController.updateType)

router.post('/deletetypebook', typeBookController.deleteType)

router.post('/getId', typeBookController.getId)


module.exports = router;