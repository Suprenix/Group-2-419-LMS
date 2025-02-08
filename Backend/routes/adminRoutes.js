const {registerAdmin, loginAdmin} = require('../controllers/admin.js');
const express = require("express");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);



module.exports = router;