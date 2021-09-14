import React, { useState, useEffect } from 'react'
import serviceService from '../services/service.service';
import AccountDataService from "../services/account.service"
import { userIdToExport } from './landing-page.component';

function CreateServiceRequest() {

  const [serviceRequest, setServiceRequest] = useState({
    description: '', raised_date: '', status: '', account_id: 0
  });
  const [accounts, setAccounts] = useState([]);
  const [currserviceRequest, setCurrserviceRequest] = useState([]);


  useEffect(() => {
    retrieveAccounts();
  }, [])

  function retrieveAccounts() {
    AccountDataService.get(userIdToExport)  // userToExport is the user ID who logged in
      .then(response => {
        setAccounts(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("accounts list: " + JSON.stringify(accounts));
  }



  function CreateNewServiceRequest(e) {
    e.preventDefault()
    console.log(serviceRequest);
    serviceService.postServiceRequset(serviceRequest.account_id, serviceRequest)
      .then(response => {
        setCurrserviceRequest(response.data)
        console.log("response: " + JSON.stringify(response));
      })
      .catch(e => {
        console.log("Errorrrr " + e.detailedMsg);
      });
  }

  function reset() {
    setCurrserviceRequest("");
  }


  return (

    currserviceRequest != "" ?

      <div>
        Service Request ID : {currserviceRequest.id}
        <button type="button" class="btn btn-warning" onClick={reset}>Submit Another Request</button>
      </div>

      :

      <div>
        <h4>Create Service Request</h4>
        <form onSubmit={CreateNewServiceRequest}>

          <div class="description">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description"
              value={serviceRequest.description}
              onChange={e => setServiceRequest({ ...serviceRequest, description: e.target.value })} />
          </div>

          <div class="description">
            <label for="description" class="form-label">Account ID</label>
            <select class="form-select" id="account" onChange={e => setServiceRequest({ ...serviceRequest, account_id: e.target.value })}>
              <option value="label" selected disabled>Choose your account</option>
              {accounts.map((account) => (
                <option value={account.id}>Account ID: {account.id}, {account.account_type}, Balance: ${account.balance}</option>
              ))}
            </select>
          </div>

          <div class="raised_date">
            <label for="birthday">Raised date</label>
            <input type="date" id="raised_date" name="birthday"
              onChange={e => setServiceRequest({ ...serviceRequest, raised_date: e.target.value })} />
          </div>

          <div>
            <label for="staus">Status</label>
            <select id="status" size="3"
              onChange={e => setServiceRequest({ ...serviceRequest, status: e.target.value })} >
              <option value="pending">Pending</option>
              <option value="In Process">In Process</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>

        </form>
      </div>
  )

}

export default CreateServiceRequest
