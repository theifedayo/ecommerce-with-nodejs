const index = require('../controllers/index')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', index.home);

module.exports = router;
