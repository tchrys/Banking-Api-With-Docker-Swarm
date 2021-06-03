const express = require('express');
const creditController = require('./../controllers/creditController');

const router = express.Router();

router
    .route('/')
    .post(creditController.createCredit)
    .get(creditController.getCredit);

module.exports = router;