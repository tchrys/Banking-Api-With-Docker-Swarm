const express = require('express');
const accountController = require('./../controllers/accountController');

const router = express.Router();

router
    .route('/')
    .post(accountController.createAccount)
    .delete(accountController.deleteAccount);

module.exports = router;