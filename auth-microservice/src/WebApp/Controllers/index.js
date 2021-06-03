const Router = require('express')();

const AppController = require('./AppController.js');
const UsersController = require('./UsersController.js');
const RolesController = require('./RolesControllers');
const { authorizeAndExtractTokenAsync } = require('../Filters/JWTFilter.js');

Router.use('/api', authorizeAndExtractTokenAsync, AppController);
Router.use('/roles', authorizeAndExtractTokenAsync, RolesController);
Router.use('/users', UsersController);

module.exports = Router;