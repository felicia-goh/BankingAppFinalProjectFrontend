import React, { useState, useEffect } from 'react'
import TransactionDataService from "../services/transaction.service"
import AccountDataService from "../services/account.service"

export default function CreateTransaction() {

    const [transaction, setTransaction] = useState({ account_id: '', description: '', type: '', amount: '' });
    const [accounts, setAccounts] = useState([]);
    const [currUserID, setCurrUserID] = useState([]);

    useEffect(() => {
        getSessionID();
        retrieveAccounts();
    }, [currUserID])

    function getSessionID() {
        console.log("Inside getSessionID()")
        let data = sessionStorage.getItem('mySession');
        setCurrUserID(data);
        return data;
    }

    function retrieveAccounts() {
        AccountDataService.get(currUserID)
            .then(response => {
                setAccounts(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        console.log("accounts list: " + JSON.stringify(accounts));
    }

    function createNewTransaction(e) {
        e.preventDefault();
        console.log(transaction);
        TransactionDataService.create(transaction.account_id, transaction)
            .then(response => {
                setTransaction({ ...transaction, email: '', login_password: '', isLoggedIn: true })
                window.location.reload(false);
                console.log("response: " + JSON.stringify(response));
            })
            .catch(e => {
                console.log(e.detailedMsg);
            });
    }

    return (
        <div>
            <h4>Deposit/ Withdraw</h4>
            <form onSubmit={createNewTransaction}>
                <select class="form-select" onChange={e => setTransaction({ ...transaction, type: e.target.value })}>
                    <option value="label" selected disabled>-- Select transaction type --</option>
                    <option value="deposit">Deposit</option>
                    <option value="withdraw">Withdraw</option>
                </select>
                <label for="account" class="form-label">Account</label>
                <select class="form-select" id="account" onChange={e => setTransaction({ ...transaction, account_id: e.target.value })}>
                    <option value="label" selected disabled>-- Select an account --</option>
                    {accounts.map((account) => (
                        <option value={account.id}>Account ID: {account.id}, {account.account_type}, Balance: ${account.balance}</option>
                    ))}
                </select>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input type="text" class="form-control" id="description" value={transaction.description} onChange={e => setTransaction({ ...transaction, description: e.target.value })} />
                </div>

                <label for="amount" class="form-label">Amount</label>
                <div class="input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input type="text" class="form-control" value={transaction.amount} onChange={e => setTransaction({ ...transaction, amount: e.target.value })} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
