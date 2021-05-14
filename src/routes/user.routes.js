const { Router } = require('express');
const router = Router();

const auth = require("../helpers/auth");

//LOAD CONTROLLER
const userController = require("../controllers/user.controllers");

//GET
router.get('/search', auth.authentication,  userController.getUsers);
router.get('/:id', auth.authentication, userController.getUserById);

//POST
router.post("/create", userController.createUser);
router.post("/login", userController.login);

module.exports = router;