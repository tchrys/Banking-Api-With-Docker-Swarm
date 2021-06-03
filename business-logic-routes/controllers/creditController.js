const catchAsync = require('./../utils/catchAsync');
const axios = require('axios');

const url = `http://${process.env.DB_LOGIC_ROUTE}`;

// const url = 'http://localhost:8010/api';

exports.createCredit = catchAsync(async (req, res, next) => {
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
    } else if (!parseInt(req.body["interest"])) {
        return res.status(400).json({
            status: 'fail',
            message: 'The value for interest is not a Number.'
        });
    } else if (!parseInt(req.body["months"])) {
        return res.status(400).json({
            status: 'fail',
            message: 'The value for months is not a Number.'
        });
    }

    // Redirect information to databse microservice
    try {
        const response = await axios.post(`${url}/credit`, req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }
});

exports.getCredit = catchAsync(async (req, res, next) => {
    const creditId = req.query.creditId;

    // Redirect information to databse microservice
    try {
        const response = await axios.get(`${url}/credit?creditId=${creditId}`);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }
});

