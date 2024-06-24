var router = require('express').Router();
const AnimalController = require('../controllers/AnimalController');
const animalController = new AnimalController();
const loginRequired = require('../middleware/loginRequired');

router.post("/", loginRequired, animalController.store);
router.get("/:id", loginRequired, animalController.select);
router.get("/", loginRequired, animalController.allAnimals);
router.put("/:id" , loginRequired, animalController.update);
router.delete("/", loginRequired, animalController.delete);

module.exports = router