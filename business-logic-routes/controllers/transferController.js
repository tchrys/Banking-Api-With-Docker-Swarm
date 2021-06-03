const catchAsync = require('./../utils/catchAsync');
const axios = require('axios');

const url = `http://${process.env.DB_LOGIC_ROUTE}`;

// const url = 'http://localhost:8010/api';

exports.createTransfer = catchAsync(async (req, res, next) => {

    // TODO: Check the correctness of data from auth microservice
    if (!parseInt(req.body["accountFrom"])) {
        return res.status(400).json({
            status: 'fail',
            message: 'The value for accountFrom is not a Number.'
        });
    } else if (!parseInt(req.body["accountTo"])) {
        return res.status(400).json({
            status: 'fail',
            message: 'The value for accountTo is not a Number.'
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
        const response = await axios.post(`${url}/transfer`, req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }
});

exports.getTransfer = catchAsync(async (req, res, next) => {
    const accountId = req.query.accountId;
    const type = req.query.type;

    // Redirect information to databse microservice
    try {
        const response = await axios.get(`${url}/transfer/my-transfer?accountId=${accountId}&type=${type}`);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }
});
