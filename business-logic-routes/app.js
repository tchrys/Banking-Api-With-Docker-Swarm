const express = require('express');

const accountRouter = require('./routes/accountRoutes');
const depositRouter = require('./routes/depositRoutes');
const soldRouter = require('./routes/soldRoutes');
const transferRouter = require('./routes/transferRoutes');
const withdrawalRouter = require('./routes/withdrawalRoutes');
const creditRouter = require('./routes/creditRoutes');
const bodyParser = require('body-parser');

const app = express();

// parse json
app.use(express.json());

// Routes
app.use('/api/account', accountRouter);
app.use('/api/deposit', depositRouter);
app.use('/api/sold', soldRouter);
app.use('/api/transfer', transferRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/credit', creditRouter);

module.exports = app;
