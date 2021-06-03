const express = require('express');
const withdrawalController = require('./../controllers/withdrawalController');

const router = express.Router();

router
    .route('/')
    .post(withdrawalController.createWithdrawal)
    .get(withdrawalController.getWithdrawal);

router
    .route('/last-day')
    .get(withdrawalController.getLastDay);

module.exports = router;