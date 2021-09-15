import React, { useState, useEffect } from 'react'
import ServiceDateService from "../services/service.service"
import AccountDataService from "../services/account.service"

function SingleService() {

  const [currUserID, setCurrUserID] = useState(0);
  const [service, setService] = useState({ account_id: 0, service_id: 0 });
  const [currService, setCurrService] = useState("") // just the status
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getSessionID();
    retrieveAccounts()
  }, [currUserID])

  function getSessionID() {
    console.log("Inside getSessionID()")
    let data = sessionStorage.getItem('mySession');
    setCurrUserID(data);
    return data;
  }

  function retrieveAccounts() {
    AccountDataService.get(currUserID)                     // user is hardcoded
      .then(response => {
        setAccounts(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("accounts list: " + JSON.stringify(accounts));
  }


  function retrieveServiceStatus(e) {
    e.preventDefault()
    ServiceDateService.getServiceRequest(service.account_id, service.service_id)
      .then(response => {
        setCurrService(response.data)
        console.log("my response data: " + response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("error: " + JSON.stringify(service.account_id + service.service_id));
  }

  function reset() {
    setCurrService("")
  }

  return (

    currService != "" ?

      <div>
        <h4>Servcie Number: <b>{service.service_id}</b></h4>
        <h4>Service Status: <b>{currService}</b></h4>
        <button type="button" class="btn btn-warning" onClick={reset}>Fetch Another Request</button>
      </div>

      :

      <div>
        <h4>Get Service Request Status</h4>
        <form onSubmit={retrieveServiceStatus}>

          <div class="description">
            <label for="description" class="form-label">Account ID</label>
            <select class="form-select" id="account" onChange={e => setService({ ...service, account_id: e.target.value })}>
              <option value="label" selected disabled>Choose your account</option>
              {accounts.map((account) => (
                <option value={account.id}>Account ID: {account.id}, {account.account_type}, Balance: ${account.balance}</option>
              ))}
            </select>
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Service ID</label>
            <input type="text" class="form-control" id="service_id"
              value={service.service_id} onChange={e => setService({ ...service, service_id: e.target.value })} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>

  )
}

export default SingleService
