import React, { useState, useEffect } from 'react'
import serviceService from '../services/service.service';
import AccountDataService from "../services/account.service"
import payeeService from '../services/payee.service';

function AddPayee() {

  const [currUserID, setCurrUserID] = useState(0);
  const [payee, setPayee] = useState({ nickname: "", payee_account_id: 0, account_id: 0 });
  const [accounts, setAccounts] = useState([]);
  const [currPayee, setCurrPayee] = useState([]);


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

  function addPayee(e) {
    e.preventDefault()
    console.log(payee);
    payeeService.create(payee.account_id, payee)
      .then(response => {
        setCurrPayee(response.data)
        console.log("response: " + JSON.stringify(response));
      })
      .catch(e => {
        console.log("Errorrrr " + e.detailedMsg);
      });
  }

  function reset() {
    setCurrPayee("");
  }


  return (

    currPayee != "" ?
      <div>
        <div>
          <h4><b>{payee.nickname} (ID: {currPayee.payee_id})</b> is added as 
          a payee of Account <b>{payee.account_id}</b></h4>
          <h6 style={{color:'green'}}>[Status: successful]</h6>
        </div>
        <button type="submit" class="btn btn-primary" onClick={reset}>Add Another Payee</button>
      </div>
      
      :

      <div>
        <h4>Add Payee</h4>
        <form onSubmit={addPayee}>

          <div class={"description", "mb-3"}>
            <label for="description" class="form-label">Nickname</label>
            <input type="text" class="form-control" id="nickname"
              value={payee.nickname}
              onChange={e => setPayee({ ...payee, nickname: e.target.value })} />
          </div>

          <div class={"description", "mb-3"} >
            <label for="description" class="form-label">Account ID </label>
            <select class="form-select" id="account" onChange={e => setPayee({ ...payee, account_id: e.target.value })}>
              <option value={payee.account_id} selected disabled>Choose your account</option>
              {accounts.map((account) => (
                <option value={account.id}>Account ID: {account.id}, {account.account_type}, Balance: ${account.balance}</option>
              ))}
            </select>
          </div>

          <div class={"description", "mb-3"}>
            <label for="description" class="form-label">Payee Account ID</label>
            <input type="text" class="form-control" id="nickname"
              value={payee.payee_account_id}
              onChange={e => setPayee({ ...payee, payee_account_id: e.target.value })} />
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>

        </form>
      </div>
  )

}

export default AddPayee
