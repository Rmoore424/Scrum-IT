'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/tutorial', require('./tutorial'));
router.use('/user', require('./user'));
router.use('/team', require('./team'));
router.use('/task', require('./task'));