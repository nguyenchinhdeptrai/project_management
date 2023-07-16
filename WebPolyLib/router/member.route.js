const express = require("express");
const router = express.Router();
const memberControllers = require("../controllers/member.controller")
const app = express();

router.get('/member', memberControllers.listMember)

module.exports = router;