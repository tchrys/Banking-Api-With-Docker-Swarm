const express = require('express');
const transferController = require('./../controllers/transferController');

const router = express.Router();

router
    .route('/')
    .post(transferController.createTransfer)

router
    .route('/my-transfer')
    .get(transferController.getTransfer);

module.exports = router;