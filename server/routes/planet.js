var express = require('express');
var router = express.Router();
const planetController = require("../controllers/planetController");

/* GET home page. */
router.get('/', planetController.renderPlanet);

module.exports = router;
