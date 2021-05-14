const { Router } = require('express');
const router = Router();

//LOAD CONTROLLER
const screeningController = require("../controllers/screening.controllers");

//GET
router.get('/search',  screeningController.getScreenings);
router.get('/:id', screeningController.getScreeningById);


module.exports = router;