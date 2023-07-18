const express = require("express");
const router = express.Router();
const app = express();

//list book
router.get('/typebook', (req, res) => {
    res.render('typebook/listtypebook', {
        layout: "main",
    });
})
//add members
router.get('/addtypebook', (req, res) => {
    res.render('typebook/addtype', {
        layout:'main',
    });
});
//update members
router.get('/updatetypebook', (req, res) => {
    res.render('typebook/updatetype',{
        layout:'main',
    });
});

module.exports = router;