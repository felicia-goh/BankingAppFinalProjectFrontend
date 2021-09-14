import React, { useState, useEffect } from 'react'
import ServiceDateService from "../services/service.service"

function SingleService() {

  const [service, setService] = useState({account_id: '', service_id: ''});
  const [currService, setCurrService] = useState([])


  // const [currService, setCurrService] = useState(
  //   {
  //     id: 11,
  //     description: 'testing',
  //     raised_date: "2021-8-12",
  //     status: "purely testing",
  //     account_id: 5,
  //   });

  useEffect(() => {
    retrieveServiceStatus();
  }, [])

  

  function pureTesting() {
    return (<div>hello1111</div>)
  }



  function retrieveServiceStatus() {
    ServiceDateService.getServiceRequest(service.account_id, service.service_id)                     // pass session id here
      .then(response => {
        setCurrService(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("error: " + JSON.stringify(service));
  }

  return (

    currService != "" ? 

    <div>
      <h4>Servcie Number: <b>{currService.id}</b></h4>
      <h4>Service Status: <b>{currService}</b></h4>
    </div>

    :

    <div>
      <h2>Get Service Request Status</h2>
      <form onSubmit={pureTesting}>
      <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Account ID</label>
          <input type="text" class="form-control" id="account_id" aria-describedby="service_id" value={service.account_id} onChange={e => setService({account_id : e.target.value})} />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Service ID</label>
          <input type="text" class="form-control" id="service_id" aria-describedby="service_id" value={service.service_id} onChange={e => setService({service_id : e.target.value})} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div>test</div>
    </div>

  )
}

export default SingleService
