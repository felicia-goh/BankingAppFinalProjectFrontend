import React, { useState, useEffect } from 'react'
import UserDataService from "../services/user.service"

export default function CreateUser() {

    const [currUserID, setCurrUserID] = useState(0);
    const [user, setUser] = useState({ customer_name: '', email: '', address: '', pancard: '', login_password: '', secret_question: '', transaction_password: '' })

    function getSessionID() {
        console.log("Inside getSessionID()")
        let data = sessionStorage.getItem('mySession');
        setCurrUserID(data);
        return data;
    }

    function setSessionID(id) {
        console.log("Inside setSessionID()")
        sessionStorage.setItem('mySession', id);
        setCurrUserID(id);
    }

    useEffect(() => {
        getSessionID();
    }, [currUserID])

    function createNewUser(e) {
        console.log(user);
        UserDataService.create(user)
            .then(response => {
                setSessionID(response.data.id)
                setUser({ ...user, isLoggedIn: true })
                console.log("response: " + JSON.stringify(response));
                window.location.reload(false);
            })
            .catch(e => {
                console.log(e.detailedMsg);
            });
    }

    return (
        <div class="wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={createNewUser}>
                <div class="mb-3">
                    <label for="customer_name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="customer_name" value={user.customer_name} onChange={e => setUser({ ...user, customer_name: e.target.value })} />
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address" value={user.address} onChange={e => setUser({ ...user, address: e.target.value })} />
                </div>

                <div class="mb-3">
                    <label for="pancard" class="form-label">NRIC</label>
                    <input type="text" class="form-control" id="pancard" value={user.pancard} onChange={e => setUser({ ...user, pancard: e.target.value })} />
                </div>

                <div class="mb-3">
                    <label for="login_password" class="form-label">Login Password</label>
                    <input type="password" class="form-control" id="login_password" value={user.login_password} onChange={e => setUser({ ...user, login_password: e.target.value })} />
                </div>

                <div class="mb-3">
                    <label for="secret_question" class="form-label">Secret Question</label>
                    <input type="text" class="form-control" id="secret_question" value={user.secret_question} onChange={e => setUser({ ...user, secret_question: e.target.value })} />
                </div>

                <div class="mb-3">
                    <label for="transaction_password" class="form-label">Transaction Password</label>
                    <input type="password" class="form-control" id="transaction_password" value={user.transaction_password} onChange={e => setUser({ ...user, transaction_password: e.target.value })} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}