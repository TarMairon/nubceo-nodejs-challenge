const { Router } = require('express');
const router = Router();

const auth = require("../helpers/auth");

//LOAD CONTROLLER
const episodeController = require("../controllers/episode.controllers");

//GET
router.get('/:id', episodeController.getEpisodeById);

module.exports = router;