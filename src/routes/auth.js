// In this file - APIs route path
const express = require("express");
const { signup, signin, requireSignin } = require("../controller/auth");
const router = express.Router(); // --- Create router func

router.post("/signin", signin);

router.post("/signup", signup);

router.post('/profile', requireSignin, (req, res) => {
    res.status(200).json({user: 'Man'})
})

module.exports = router;
