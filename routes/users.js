const express = require("express");
const router = express.Router();

const {signUp, login} = require('../controllers/userControllers');

router.post('/auth/signup', signUp);
router.post('/auth/signin', login);

module.exports = router;