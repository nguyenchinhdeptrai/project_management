const express = require("express");
const router = express.Router();
const typeBookController = require("../controllers/typebook.controller")
const app = express();

router.get('/typeBook', typeBookController.listType)

router.get('/addtype', typeBookController.layoutaddType)
router.post('/addtype', typeBookController.addType)

router.get('/updatetypebook', typeBookController.layoutupdateType)
router.post('/updatetypebook', typeBookController.updateType)

router.post('/deletetypebook', typeBookController.deleteType)

router.post('/getIdType', typeBookController.getId)

router.get('/searchTypeBook', typeBookController.getSeach)

module.exports = router;