import React, { useState, useEffect } from 'react'
import AccountDataService from "../services/account.service"
import payeeService from '../services/payee.service';
import CreateAccount from './account-create.component';


export default function PayeeList() {

  const [currUserID, setCurrUserID] = useState(0);
  const [accounts, setAccounts] = useState([]); // list of account
  const [accountID, setAccountID] = useState([]);
  const [payees, setPayees] = useState([]);
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
    // console.log("user list: " + JSON.stringify(accounts));
  }

  function retrievePayees() {
    // alert("Hii")
    payeeService.getAll(accountID)
      .then(response => {
        setPayees(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("transactions list: " + JSON.stringify(payees));
  }

  function twoInOne(s) {
    retrievePayees();
    setRender(s);
  }

  return (
    render === "getPayees" ?

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">List of Payees in Account ID <b>{accountID}</b></label>
        {payees.map((p) => (
          <div>
            <div class="card-product m-3">
              <div class="card-product-infos">
                <h4>Nickname: <b>{p.nickname}</b></h4>
                <h4>Payee Account ID: <b>{p.payee_account_id}</b></h4>
              </div>
            </div>
          </div>
        ))}
        <br />
        <button type="submit" class="btn btn-primary" onClick={() => { setRender("") }}>Go back</button>
      </div>

      :

      <div>
        <div>
          <h4>Pick One Account</h4>
          <form onSubmit={retrievePayees}>
            <div class="description">
              <label for="description" class="form-label">Account ID</label>
              <select class="form-select" id="account" onChange={e => setAccountID(e.target.value)}>
                <option value="label" selected disabled>-- Select an account --</option>
                {accounts.map((account) => (
                  <option value={account.id}>Account ID: {account.id}, {account.account_type}, Balance: ${account.balance}</option>
                ))}
              </select>
              <button type="submit" class="mt-3 btn btn-primary" onClick={() => { twoInOne("getPayees") }}>Fetch Payees</button>
            </div>

            {/* <button class="btn btn-primary" onClick={functionsInOneClick("getPayees")}>Fetch Payees</button> */}

            {/* {accounts.map((account) => (
          <div>
            <div class="card-product m-3">
              <div class="card-product-infos">
                <h2>${account.balance}</h2>
                <p>Account ID: {account.id}, {account.account_type} account</p>
              </div>
            </div> */}

            {/* </div>
        ))} */}
          </form>
        </div>
      </div>
  )
}
