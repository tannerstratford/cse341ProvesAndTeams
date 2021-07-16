const express = require('express');
const router = express.Router();
const ta05Controller = require('../controllers/ta05');


router.get('/', ta05Controller.getStart);

router.post('/change-style', ta05Controller.changeStyle);

router.post('/logout', ta05Controller.reset);

router.post('/countUp', ta05Controller.countUp);

router.post('/countDown', ta05Controller.countDown);

module.exports = router;