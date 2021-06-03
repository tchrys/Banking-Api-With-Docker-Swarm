const catchAsync = require('./../utils/catchAsync');
const axios = require('axios');

const url = `http://${process.env.DB_LOGIC_ROUTE}`;

// const url = 'http://localhost:8010/api';

exports.createAccount = catchAsync(async (req, res, next) => {

    // TODO: Check the correctness of data from auth microservice
    if (!parseInt(req.body.userId)) {
        return res.status(400).json({
            status: 'fail',
            message: 'The value for userID is not a Number.'
        });
    }

    // Redirect information to database microservice
    try {
        const response = await axios.post(`${url}/account`, req.body);
        return res.status(response.status).json(response.data);
    } catch(error) {
        console.log(error);
    }

});

exports.deleteAccount = catchAsync(async (req, res, next) => {
    const accountId = req.query.accountId;

    // Redirect information to database microservice
    try {
        await axios.delete(`${url}/account?accountId=${accountId}`);
        console.log('am primit de la delete');
        return res.send('Got a DELETE request at /user');
    } catch (error) {
        console.log(error);
    }
});
