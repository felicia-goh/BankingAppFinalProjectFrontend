import React, { useState, useEffect } from 'react'
import TransactionDataService from "../services/transaction.service"

export default function TransactionList() {

    const [transactions, setTransactions] = useState([]);
    const [currUser, setCurrUser] = useState({ id: 1, name: 'jane', email: 'janedoe@gmail.com' });

    useEffect(() => {
        // setSessionID();                                      // setSession() should be done when login
        getSessionID();
        retrieveTransactions();
    }, [])

    function setSessionID() {                                   // setSession() should be done when login
        setCurrUser({ id: 1, name: 'jane', email: 'janedoe@gmail.com' });;
        sessionStorage.setItem('mySession', JSON.stringify(currUser));
    }

    function getSessionID() {
        let data = sessionStorage.getItem('mySession');
        console.log("My session information: " + data);
    }

    function retrieveTransactions() {
        TransactionDataService.get(1)                     // account is hardcoded
            .then(response => {
                setTransactions(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        console.log("transactions list: " + JSON.stringify(transactions));
    }

    return (
        <div>
            <div>
                <h4>Transaction List</h4>
                <ul>
                    {transactions.map((transaction) => (
                        <li>{transaction.txn_datetime}, {transaction.description}, {transaction.type}, {transaction.amount}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}