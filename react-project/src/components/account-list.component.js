import React, { useState, useEffect } from 'react'
import AccountDataService from "../services/account.service"

export default function AccountList() {

    const [accounts, setAccounts] = useState([]);
    const [currUser, setCurrUser] = useState({ id: 2, name: 'jane', email: 'janedoe@gmail.com' });

    useEffect(() => {
        // setSessionID();                                      // setSession() should be done when login
        getSessionID();
        retrieveAccounts();
    }, [])

    function setSessionID() {                                   // setSession() should be done when login
        setCurrUser({ id: 20, name: 'jane', email: 'janedoe@gmail.com' });;
        sessionStorage.setItem('mySession', JSON.stringify(currUser));
    }

    function getSessionID() {
        let data = sessionStorage.getItem('mySession');
        console.log("My session information: " + data);
    }

    function retrieveAccounts() {
        AccountDataService.get(currUser.id)                     // pass session id here
            .then(response => {
                setAccounts(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        console.log("user list: " + JSON.stringify(accounts));
    }

    return (
        <div>
            <div>
                <h4>Account List</h4>
                <ul>
                    {accounts.map((account) => (
                        <li>{account.id}, {account.account_type}, {account.balance}, {account.open_date}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}