import React, { useState, useEffect } from 'react'
import AccountDataService from "../services/account.service"
import CreateAccount from './account-create.component';
import TransactionList from './transaction-list.component';

export default function AccountList() {

    const [currUserID, setCurrUserID] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [render, setRender] = useState("");

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
    }


    

    return (
        render === "createAccount" ?
            <CreateAccount />
            :
            <div>
                <div>
                    <h4>Your Accounts</h4>
                    <button class="btn btn-primary" onClick={() => { setRender("createAccount") }}>Create Account</button>
                    {accounts.map((account) => (
                        <div>
                            <div class="card-product my-3">
                                <div class="card-product-infos">
                                    <h2>${account.balance}</h2>
                                    <p>Account ID: {account.id}, {account.account_type} account</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}