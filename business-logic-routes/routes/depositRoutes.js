const express = require('express');
const depositController = require('./../controllers/depositController');

const router = express.Router();

router
    .route('/')
    .post(depositController.createDeposit)
    .get(depositController.getDeposit);

router
    .route('/last-day')
    .get(depositController.getLastDay);

module.exports = router;