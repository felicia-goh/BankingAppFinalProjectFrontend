import React, { useState, useEffect } from 'react'
import LoginDataService from "../services/login.service"
import UserDetails from './user-details.component';

export default function LandingPage() {

    const [auth, setAuth] = useState({ email: '', login_password: '', isLoggedIn: false });
    const [currUserID, setCurrUserID] = useState(0);

    function setSessionID(id) {
        console.log("Inside setSessionID()")
        sessionStorage.setItem('mySession', id);
        setCurrUserID(id);
    }

    function getSessionID() {
        console.log("Inside getSessionID()")
        let data = sessionStorage.getItem('mySession');
        return data;
    }

    function killSession() {
        sessionStorage.removeItem('mySession');
        window.location.reload(false);
    }

    useEffect(() => {
        console.log("Inside useEffect")
    }, [])

    function autheticateUser(e) {
        e.preventDefault()
        LoginDataService.login(auth)
            .then(response => {
                // console.log("response: " + JSON.stringify(response));
                setSessionID(response.data.id)
                setAuth({ ...auth, email: '', login_password: '', isLoggedIn: true })
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        getSessionID() == null ?
            <div>
                <h2>Login</h2>
                <form onSubmit={autheticateUser}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="text" class="form-control" id="email" aria-describedby="emailHelp" value={auth.email} onChange={e => setAuth({ ...auth, email: e.target.value })} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value={auth.login_password} onChange={e => setAuth({ ...auth, login_password: e.target.value })} />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            :
            <div>
                <h4>Welcome back, user id: {currUserID}!</h4>
                <UserDetails />
                <button onClick={killSession}>Logout</button>
            </div>
    )
}
