const express = require("express");
const router = express.Router();
const app = express();

//list users
router.get('/user', (req, res) => {
    res.render('user/listuser', {
        layout: "main",
    });
})
//add users
router.get('/adduser', (req, res) => {
    res.render('user/adduser', {
        layout:'main',
    });
});
//update users
router.get('/updateuser', (req, res) => {
    res.render('user/updateuser',{
        layout:'main',
    });
});

module.exports = router;