const catchAsync = require('./../utils/catchAsync');
const axios = require('axios');

const url = `http://${process.env.DB_LOGIC_ROUTE}`;

// const url = 'http://localhost:8010/api';

exports.getSold = catchAsync(async (req, res, next) => {
    const accountId = req.query.accountId;

    // Redirect information to databse microservice
    try {
        const response = await axios.get(`${url}/sold?accountId=${accountId}`);
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
    }
});
