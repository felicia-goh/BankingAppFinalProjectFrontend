import React, { useState, useEffect } from 'react'
import UserDataService from "../services/user.service"

export default function UserDetails() {

    const [currUserID, setCurrUserID] = useState(0);
    const [userDetails, setUserDetails] = useState([]);

    function getSessionID() {
        console.log("Inside getSessionID()")
        let data = sessionStorage.getItem('mySession');
        setCurrUserID(data);
        return data;
    }

    useEffect(() => {
        getSessionID();
        retrieveUserDetails();
    }, [currUserID])

    function retrieveUserDetails() {
        UserDataService.get(currUserID)
            .then(response => {
                setUserDetails(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        console.log("user list: " + JSON.stringify(userDetails));
    }

    return (
        <div>
            <div>
                <h4>{userDetails.customer_name}</h4>
                <p>Current user id: {currUserID}</p>
                <p>{userDetails.email}</p>
                <p>{userDetails.address}</p>
            </div>
        </div>
    )
}