const Router = require('express').Router();

const {
    addAccount,
    getBalance,
    deleteAccount,
    makeTransfer,
    getMyTransfers,
    makeWithdrawal,
    getMyWithdrawals,
    makeDeposit,
    getMyDeposits,
    addCredit,
    getCreditById
} = require('./services.js');


Router.post('/account', async (req, res) => {

    const {
        userId
    } = req.body;

    const id = await addAccount(parseInt(userId));

    res.json({accountId: id});
});

Router.get('/sold', async (req, res) => {
    const accountId = parseInt(req.query.accountId);
    const sold = await getBalance(accountId);
    res.json({balance: sold.amount});
});

Router.delete('/account', async (req, res) => {
    const accountId = parseInt(req.query.accountId);
    await deleteAccount(accountId);
    res.status(204).end();
});

Router.post('/transfer', async (req, res) => {

    const {
        accountFrom,
        accountTo,
        sum,
        dateTime
    } = req.body;

    const leftSum = await makeTransfer(parseInt(accountFrom), parseInt(accountTo), parseInt(sum), parseInt(dateTime));

    res.json({balance: leftSum});
});

Router.get('/transfer/my-transfer', async (req, res) => {
    const accountId = parseInt(req.query.accountId);
    const type = req.query.type;
    let resp = await getMyTransfers(accountId, type);
    resp = resp.map(value => {
        return {accountFrom: value.account_from,
            accountTo: value.account_to,
            amount: value.amount,
            dateTime: value.date_time
        }
    });
    res.json(resp);
});

Router.post('/withdrawal', async (req, res) => {
    const {
        accountId,
        sum,
        dateTime
    } = req.body;
    const leftSum = await makeWithdrawal(parseInt(accountId), parseInt(sum), new Date(dateTime));
    res.json({balance: leftSum});
});

Router.get('/withdrawal', async (req, res) => {
    const accountId = parseInt(req.query.accountId);
    let resp = await getMyWithdrawals(accountId);
    resp = resp.map(value => {
       return {
           amount: value.amount,
           dateTime: value.date_time
       }
    });
    res.json(resp);
});

Router.post('/deposit', async (req, res) => {
    const {
        accountId,
        sum,
        dateTime
    } = req.body;
    const leftSum = await makeDeposit(parseInt(accountId), parseInt(sum), new Date(dateTime));
    res.json({balance: leftSum});
});

Router.get('/deposit', async (req, res) => {
    const accountId = parseInt(req.query.accountId);
    let resp = await getMyDeposits(accountId);
    resp = resp.map(value => {
        return {
            amount: value.amount,
            dateTime: value.date_time
        }
    });
    res.json(resp);
});

Router.post('/credit', async (req, res) => {
    const {
        accountId,
        sum,
        interest,
        months
    } = req.body;
    const id = await addCredit(parseInt(accountId), parseInt(sum), parseInt(interest), parseInt(months));
    res.json({creditId: id});
});

Router.get('/credit', async (req, res) => {
    const creditId = parseInt(req.query.creditId);
    let resp = await getCreditById(creditId);
    res.json({
        accountId: resp.account_id,
        amount: resp.amount,
        interest: resp.interest,
        months: resp.months
    });
});


module.exports = Router;