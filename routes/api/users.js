const express = require('express');
const controllers = require('../../controllers');
const { authenticate } = require('../../middlewares');
const router = express.Router();


router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/current', authenticate, controllers.getCurrent);
router.post('/logout', authenticate, controllers.logout);


module.exports = router

