const express = require("express");
const router = express.Router();
const app = express();

router.get('/member', (req, res) => {
    res.render('listmember', {
        layout: "main",
    });
})

module.exports = router;