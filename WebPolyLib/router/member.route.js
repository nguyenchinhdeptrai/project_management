const express = require("express");
const router = express.Router();
const memberControllers = require("../controllers/member.controller")

const app = express();


router.get('/member', memberControllers.listMember)

router.get('/addmember', memberControllers.layoutadd)
router.post('/addmember', memberControllers.add)

router.get('/updatemember', memberControllers.layoutupdate)
router.post('/updatemember', memberControllers.update)

router.post('/getIdMember', memberControllers.getId)

router.post('/deletemember', memberControllers.deletemember)

router.get('/searchMember', memberControllers.getSeach)


module.exports = router;