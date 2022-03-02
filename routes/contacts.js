const express = require("express");
const router = express.Router();
const authToken = require('../middlewares/authToken')

const {addContact, getAllContacts, deleteContact} = require('../controllers/contactControllers');

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
router.post('/', authToken.authenticateToken , addContact);
router.get('/:userId', authToken.authenticateToken, getAllContacts); 
router.delete('/:contactId', authToken.authenticateToken, deleteContact); 

module.exports = router;