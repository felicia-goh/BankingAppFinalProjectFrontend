import React, { useState, useEffect } from 'react'
import AccountDataService from "../services/account.service"
import TransactionList from './transaction-list.component';

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

    // function showTransactions(account_id) {
    //     setClickAccount({clicked: true, account_id: account_id});
    // }

    return (
        <div>
            <div>
                <h4>Your accounts</h4>
                    {accounts.map((account) => (
                        <div>
                            {/* onClick={showTransactions(account.id)} */}
                            <div class="card-product m-3"> 
                                <div class="card-product-infos">
                                    <h2>${account.balance}</h2>
                                    <p>Account ID: {account.id}, {account.account_type} account</p>
                                </div>
                            </div>

                            {/* {clickAccount.clicked?
                                <TransactionList /> : <div></div>
                            } */}
                            
                        </div>
                        
                    ))}
            </div>
        </div>
    )
}