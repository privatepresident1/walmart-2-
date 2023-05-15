const express = require('express');
const router =  express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.login);
router.post('/submit', controller.loginPost);

router.get('*', controller.page404Redirect);

module.exports = router;