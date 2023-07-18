const express = require("express");
const router = express.Router();
const app = express();

//list members
router.get('/member', (req, res) => {
    res.render('member/listmember', {
        layout: "main",
    });
})
//add members
router.get('/addmember', (req, res) => {
    res.render('member/addmember', {
        layout:'main',
    });
});
//update members
router.get('/updatemember', (req, res) => {
    res.render('member/updatemember',{
        layout:'main',
    });
});

module.exports = router;