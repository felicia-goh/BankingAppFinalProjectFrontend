import React, { useState, useEffect } from 'react'
import AccountDataService from "../services/account.service"

export default function AccountList() {

    const [currUserID, setCurrUserID] = useState(0);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {                                    // setSession() should be done when login
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
        AccountDataService.get(currUserID)                     // pass session id here
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