const express = require('express');
const soldController = require('./../controllers/soldController');

const router = express.Router();

router
    .route('/')
    .get(soldController.getSold);

module.exports = router;