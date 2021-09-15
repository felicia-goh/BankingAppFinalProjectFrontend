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
            <h4>Welcome back, {userDetails.customer_name} !</h4><br />
            <div>
                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="formGroupExampleInput" value={userDetails.email} />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="formGroupExampleInput2" value={userDetails.address} />
                        </div>
                        <label class="col-sm-2 col-form-label"><a href=""><small>Update address</small></a></label>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Login Password</label>
                        <div class="col-sm-6">
                            <input type="password" class="form-control" id="formGroupExampleInput2" value={userDetails.login_password} />
                        </div>
                        <label class="col-sm-2 col-form-label"><a href=""><small>Change password</small></a></label>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label">Transaction Password</label>
                        <div class="col-sm-6">
                            <input type="password" class="form-control" id="formGroupExampleInput2" value={userDetails.transaction_password} />
                        </div>
                        <label class="col-sm-2 col-form-label"><a href=""><small>Change password</small></a></label>
                    </div>
                </form>
            </div>
        </div>
    )
}