const express = require('express');

const ServerError = require('../Models/ServerError.js');

const AuthorizationFilter = require('../Filters/AuthorizationFilter.js');
const RoleConstants = require('../Constants/Roles.js');
const ResponseFilter = require('../Filters/ResponseFilter.js');

const axios = require('axios');

const url = `http://${process.env.BUSINESS_SERVICE_ROUTE}`;

// const url = 'http://localhost:8000/api'

const Router = express.Router();

Router.post('/account', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.post(`${url}/account`, {userId: req.user.userId});
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.get('/sold', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.get(`${url}/sold?accountId=${req.query.accountId}`);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.delete('/account', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    try {
        await axios.delete(`${url}/account?accountId=${req.query.accountId}`);
        console.log('a mers');
        return res.status(204).send('Deleted successfully');
    } catch (error) {
        console.log(error);
    }
});

Router.post('/transfer', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.post(`${url}/transfer`, req.body);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.get('/transfer/my-transfer', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.get(`${url}/transfer/my-transfer?accountId=${req.query.accountId}&type=${req.query.type}`);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});


Router.post('/withdrawal', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.post(`${url}/withdrawal`, req.body);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.get('/withdrawal', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.get(`${url}/withdrawal?accountId=${req.query.accountId}`);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.post('/deposit', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.post(`${url}/deposit`, req.body);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.get('/deposit', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.get(`${url}/deposit?accountId=${req.query.accountId}`);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.post('/credit', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.post(`${url}/credit`, req.body);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.get('/credit', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.get(`${url}/credit?creditId=${req.query.creditId}`);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.get('/deposit/last-day', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.get(`${url}/deposit/last-day?accountId=${req.query.accountId}`);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

Router.get('/withdrawal/last-day', AuthorizationFilter.authorizeRoles(RoleConstants.USER), async (req, res) => {
    let resp = undefined;
    try {
        const response = await axios.get(`${url}/withdrawal/last-day?accountId=${req.query.accountId}`);
        resp = response.data;
        ResponseFilter.setResponseDetails(res, response.status, resp);
    } catch (error) {
        console.log(error);
    }
});

module.exports = Router;