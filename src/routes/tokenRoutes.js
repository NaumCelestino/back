var router = require('express').Router();
const TokenController = require('../controllers/TokenController');
const tokenController = new TokenController();

 
router.post("/", tokenController.store);

module.exports = router