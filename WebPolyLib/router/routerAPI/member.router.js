const express = require('express');
const router = express.Router();
const api_member = require('../../controllers/controllerApi/apimember.controller');
router.get('/member', api_member.listMember);
router.post('/addmember', api_member.addMember);
router.put('/updatemember', api_member.updateMember);
router.delete('/deletemember', api_member.deleteMember);
module.exports = router;