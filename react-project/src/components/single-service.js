import React, { useState, useEffect } from 'react'
import ServiceDateService from "../services/service.service"
import AccountDataService from "../services/account.service"
import { userIdToExport } from './landing-page.component';

function SingleService() {

  const [service, setService] = useState({ account_id: 0, service_id: 0 });
  const [currService, setCurrService] = useState("") // just the status
  const [accounts, setAccounts] = useState([]);


  // const [service, setService] = useState( // hard-code data
  //   {
  //     service_id: 11,
  //     description: 'testing',
  //     raised_date: "2021-8-12",
  //     status: "purely testing",
  //     account_id: 5,
  //   });

  useEffect(() => {
    retrieveAccounts()
  }, [])


  function retrieveAccounts() {
    AccountDataService.get(userIdToExport)                     // user is hardcoded
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
        console.log("sasfsdgdsgdsfd" + response.data);
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
        <h2>Get Service Request Status</h2>
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


          {/* <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Account ID</label>
            <input type="text" class="form-control" id="account_id"
              value={service.account_id} onChange={e => setService({ ...service, account_id: e.target.value })} />
          </div> */}
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Service ID</label>
            <input type="text" class="form-control" id="service_id"
              value={service.service_id} onChange={e => setService({ ...service, service_id: e.target.value })} />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <div>test</div>
      </div>

  )
}

export default SingleService
