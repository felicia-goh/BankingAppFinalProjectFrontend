import React, { useState, useEffect } from 'react'
import AccountDataService from "../services/account.service"
import TransactionList from './transaction-list.component';

export default function AccountList() {

    const [accounts, setAccounts] = useState([]);
    const [currUser, setCurrUser] = useState({ id: 2, name: 'jane', email: 'janedoe@gmail.com' });
    // const [clickAccount, setClickAccount] = useState({clicked: false, account_id: 0});

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