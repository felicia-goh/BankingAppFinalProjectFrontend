import React, { useState, useEffect } from 'react'
import UserDataService from "../services/user.service"

export default function UserDetails() {

    const [currUserID, setCurrUserID] = useState();
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
    }, [])

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
                <h4>User Details</h4>
                <p>{userDetails.customer_name}</p>
                <p>{userDetails.email}</p>
                <p>{userDetails.address}</p>
            </div>
        </div>
    )
}