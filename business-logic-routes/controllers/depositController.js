const catchAsync = require('./../utils/catchAsync');
const axios = require('axios');

const url = `http://${process.env.DB_LOGIC_ROUTE}`;

// const url = 'http://localhost:8010/api';

exports.createDeposit = catchAsync(async (req, res, next) => {

    // TODO: Check the correctness of data from auth microservice
    if (!parseInt(req.body["accountId"])) {
        return res.status(400).json({
            status: 'fail',
            message: 'The value for accountID is not a Number.'
        });
    } else if (!parseFloat(req.body["sum"])) {
        return res.status(400).json({
            status: 'fail',
            message: 'The value for sum is not a Number.'
        });
    }

    req.body["dateTime"] = new Date();

    // Redirect information to databse microservice
    try {
        const response = await axios.post(`${url}/deposit`, req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }
});

exports.getDeposit = catchAsync(async (req, res, next) => {
    const accountId = req.query.accountId;

    // Redirect information to databse microservice
    try {
        const response = await axios.get(`${url}/deposit?accountId=${accountId}`);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }

});

exports.getLastDay = catchAsync(async (req, res, next) => {
    const accountId = req.query.accountId;

    // Redirect information to databse microservice
    try {
        const response = await axios.get(`${url}/deposit?accountId=${accountId}`);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        response.data = response.data.filter(value => new Date(value.dateTime) > yesterday);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }

});




