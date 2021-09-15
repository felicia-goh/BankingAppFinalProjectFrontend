import React, { useState, useEffect } from 'react'
import TransactionDataService from "../services/transaction.service"
import AccountDataService from "../services/account.service"

export default function TransactionList() {

    const [currUserID, setCurrUserID] = useState(0);
    const [accountId, setAccountId] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {                                  // setSession() should be done when login
        getSessionID();
        retrieveAccounts();
        retrieveTransactions();
    }, [currUserID, accountId])

    function getSessionID() {
        console.log("Inside getSessionID()")
        let data = sessionStorage.getItem('mySession');
        setCurrUserID(data);
        return data;
    }

    function retrieveTransactions() {
        TransactionDataService.get(accountId)                     // account is hardcoded
            .then(response => {
                setTransactions(response.data)
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        // console.log("transactions list: " + JSON.stringify(transactions));
    }

    function retrieveAccounts() {
        AccountDataService.get(currUserID)                     // pass session id here
            .then(response => {
                setAccounts(response.data)
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        // console.log("user list: " + JSON.stringify(accounts));
    }

    return (
        <div>
            <h4>Transaction History</h4>
            <form onSubmit={""}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Account Id</label>
                    <select class="form-select" aria-label="Default select example" onChange={e => setAccountId(e.target.value)}>
                        <option value="" selected>-- Select an account to view -- </option>
                        {accounts.map((account) => (
                            <option value={account.id}>{account.id}</option>
                        ))}
                    </select>
                </div>
            </form>

            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" style={{ backgroundColor: "#f3f3f3" }}>
                        <div class="row">
                            <div class="col">
                                Transaction Type
                            </div>
                            <div class="col">
                                Amount
                            </div>
                            <div class="col">
                                Description
                            </div>
                            <div class="col">
                                Timestamp
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="list-group list-group-flush">
                    {transactions.map((transaction) => (
                        <li class="list-group-item">
                            <div class="container">
                                <div class="row">
                                    <div class="col">
                                        {transaction.type}
                                    </div>
                                    <div class="col">
                                        {transaction.amount}
                                    </div>
                                    <div class="col">
                                        {transaction.description}
                                    </div>
                                    <div class="col">
                                        {transaction.txn_datetime}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}