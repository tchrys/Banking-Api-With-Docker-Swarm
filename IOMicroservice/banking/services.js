const {
    query
} = require('../data');

const addAccount = async(accountId) => {
    const account = await query("INSERT INTO account (user_id, amount) VALUES ($1, $2) RETURNING id", [accountId, 0]);
    return account[0].id;
};

const getBalance = async(accountId) => {
    const res = await query("SELECT amount FROM account WHERE id = $1", [accountId]);
    return res[0];
}

const deleteAccount = async(accountId) => {
    await query("UPDATE account SET amount = 0 WHERE id = $1 RETURNING *", [accountId]);
}

const makeTransfer = async(accountFrom, accountTo, amount, dateTime) => {
    const moneyFrom = await query("SELECT amount FROM account WHERE id = $1", [accountFrom]);
    if (parseInt(moneyFrom[0].amount) < amount) {
        throw new ServerError("Transfer can't be done", 500);
    }
    await query("INSERT INTO transfer (account_from, account_to, amount, date_time) VALUES ($1,$2,$3,$4) RETURNING *",
        [accountFrom, accountTo, amount, new Date(dateTime)]);
    await query("UPDATE account SET amount = amount + $1 WHERE id = $2 RETURNING *", [amount, accountTo]);
    await query("UPDATE account SET amount = amount - $1 WHERE id = $2 RETURNING *", [amount, accountFrom]);
    return parseInt(moneyFrom[0].amount) - amount;
}

const getMyTransfers = async(accountId, type) => {
    let resp = [];
    if (type === 'from') {
        resp = await query("SELECT account_from, account_to, amount, date_time FROM transfer WHERE account_from = $1", [accountId]);
    } else {
        resp = await query("SELECT account_from, account_to, amount, date_time FROM transfer WHERE account_to = $1", [accountId]);
    }
    return resp;
}

const makeWithdrawal = async(accountId, sum, dateTime) => {
    const moneyFrom = await query("SELECT amount FROM account WHERE id = $1", [accountId]);
    if (parseInt(moneyFrom[0].amount < sum)) {
        throw new ServerError("Withdrawal can't be done", 500);
    }
    await query("INSERT INTO withdrawal(account_id, amount, date_time) VALUES ($1,$2,$3) RETURNING *",
        [accountId, sum, dateTime]);
    await query("UPDATE account SET amount = amount - $1 WHERE id = $2 RETURNING *", [sum, accountId]);
    return parseInt(moneyFrom[0].amount) - sum;
}

const getMyWithdrawals = async(accountId) => {
    const resp = await query("SELECT amount, date_time FROM withdrawal WHERE account_id = $1", [accountId]);
    return resp;
}

const makeDeposit = async(accountId, sum, dateTime) => {
    const moneyFrom = await query("SELECT amount FROM account WHERE id = $1", [accountId]);
    await query("INSERT INTO deposit(account_id, amount, date_time) VALUES ($1,$2,$3) RETURNING *",
        [accountId, sum, dateTime]);
    await query("UPDATE account SET amount = amount + $1 WHERE id = $2 RETURNING *", [sum, accountId]);
    return parseInt(moneyFrom[0].amount) + sum;
}

const getMyDeposits = async(accountId) => {
    const resp = await query("SELECT amount, date_time FROM deposit WHERE account_id = $1", [accountId]);
    return resp;
}

const addCredit = async(accountId, sum, interest, months) => {
    const resp = await query("INSERT INTO credit(account_id, amount, interest, months) VALUES  ($1,$2,$3,$4) RETURNING *",
        [accountId, sum, interest, months]);
    return resp[0].id;
}

const getCreditById = async(creditId) => {
    const resp = await query("SELECT * FROM credit WHERE id = $1", [creditId]);
    return resp[0];
}

module.exports = {
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
}