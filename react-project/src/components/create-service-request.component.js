import React, { useState, useEffect } from 'react'
import serviceService from '../services/service.service';
import AccountDataService from "../services/account.service"

function CreateServiceRequest() {

  const [currUserID, setCurrUserID] = useState(0);
  const [serviceRequest, setServiceRequest] = useState({
    description: '', account_id: 0
  });
  const [accounts, setAccounts] = useState([]);
  const [currserviceRequest, setCurrserviceRequest] = useState([]);


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
    AccountDataService.get(currUserID)  // userToExport is the user ID who logged in
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
        <h4>Service Request ID: {currserviceRequest.id}</h4>
        <button type="button" class="btn btn-primary" onClick={reset}>Submit Another Request</button>
      </div>

      :

      <div>
        <h4>Create Service Request</h4>
        <form onSubmit={CreateNewServiceRequest}>

          <div class="description mb-3">
            <label for="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description"
              value={serviceRequest.description}
              onChange={e => setServiceRequest({ ...serviceRequest, description: e.target.value })} />
          </div>

          <div class="description mb-3">
            <label for="description" class="form-label">Account ID</label>
            <select class="form-select" id="account" onChange={e => setServiceRequest({ ...serviceRequest, account_id: e.target.value })}>
              <option value="label" selected disabled>Choose your account</option>
              {accounts.map((account) => (
                <option value={account.id}>Account ID: {account.id}, {account.account_type}, Balance: ${account.balance}</option>
              ))}
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>

        </form>
      </div>
  )

}

export default CreateServiceRequest
