const express = require("express");
const router = express.Router();
const app = express();

//list book
router.get('/book', (req, res) => {
    res.render('book/listbook', {
        layout: "main",
    });
})
//add members
router.get('/addbook', (req, res) => {
    res.render('book/addbook', {
        layout:'main',
    });
});
//update members
router.get('/updatebook', (req, res) => {
    res.render('book/updatebook',{
        layout:'main',
    });
});

module.exports = router;