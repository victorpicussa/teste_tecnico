const express = require('express')
const moment = require('moment')
const authApp = require('./auth')
const insertApp = require('./insert')

var router = express.Router();

moment.locale('pt-br')

router.use(function logger(req, res, next) {
    console.log('Executed: ', moment().format('DD-MM-YYYY HH:mm:ss'));
    next();
});

router.use('/login', authApp);
router.use('/insert', insertApp);

module.exports = router;