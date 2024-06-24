var router = require('express').Router();
const UserController = require('../controllers/UserController');
const userController = new UserController();
const loginRequired =  require('../middleware/loginRequired');


router.post("/",  userController.store);
router.get("/userinfo/", loginRequired, userController.selectLogin);
router.get("/:id", loginRequired, userController.select);
router.get("/", loginRequired, userController.allUsers);
router.get("/cpf/:cpf", loginRequired, userController.select_cpf);
router.put("/changepass", loginRequired, userController.changePassword);
router.put("/:id", loginRequired, userController.update);
router.delete("/:id", loginRequired, userController.delete);

module.exports = router