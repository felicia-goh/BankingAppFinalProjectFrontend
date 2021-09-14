import React, { useState, useEffect } from 'react'
import ServiceDateService from "../services/service.service"

function SingleService() {

  const [service, setService] = useState([]);
  const [currService] = useState(
    {
      id: 11,
      description: 'testing',
      raised_date: "2021-8-12",
      status: "purely testing",
      account_id: 5,
    });

  useEffect(() => {
    retrieveServiceStatus();
  }, [])

  function retrieveServiceStatus() {
    ServiceDateService.getServiceRequest(currService.account_id, currService.id)                     // pass session id here
      .then(response => {
        setService(response.data)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    console.log("error: " + JSON.stringify(service));
  }

  return (
    <div>
      <h4>Servcie Number: <b>{currService.id}</b></h4>
      <h4>Service Status: <b>{service}</b></h4>
    </div>
  )
}

export default SingleService
