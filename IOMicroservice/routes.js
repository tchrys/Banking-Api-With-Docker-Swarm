const Router = require('express').Router();

const BooksController = require('./banking/controllers.js');

Router.use('/', BooksController);

module.exports = Router;