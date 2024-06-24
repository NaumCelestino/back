var router = require('express').Router();
const ApiController = require('../controllers/ApiController');
const apiController = new ApiController();


router.get('/', apiController.index);
router.get('/teste_rota', apiController.teste_rota);

module.exports = router;