import React, { useState, useEffect } from 'react'
import LoginDataService from "../services/login.service"
import AccountList from './account-list.component';
import UserDetails from './user-details.component';
import TransactionList from './transaction-list.component';
import SingleService from './single-service';
import CreateServiceRequest from './create-service-request.component';

export default function LandingPage() {

    const [auth, setAuth] = useState({ email: '', login_password: '', isLoggedIn: false });
    const [currUserID, setCurrUserID] = useState(0);
    const [myComp, setComp] = useState("");

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
    }, [currUserID])

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
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class={myComp === "Profile" ? "nav-link active" : "nav-link"} aria-current="page" href="#" onClick={() => { setComp("Profile") }}>Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a class={myComp === "Account" ? "nav-link active" : "nav-link"} href="#" onClick={() => { setComp("Account") }}>Account</a>
                                </li>
                                <li class="nav-item">
                                    <a class={myComp === "Transaction" ? "nav-link active" : "nav-link"} href="#" onClick={() => { setComp("Transaction") }}>Transaction</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={() => { setComp("GetServiceStatus") }}>Get Service Status</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={() => { setComp("CreateServiceRequest") }}>Create Service Request</a>
                                </li>
                            </ul>
                            <button type="button" class="btn btn-primary" onClick={killSession}>Logout</button>
                        </div>
                    </div>
                </nav>

                {myComp === "" ? <UserDetails /> : null}
                {myComp === "Profile" ? <UserDetails /> : null}
                {myComp === "Account" ? <AccountList /> : null}
                {myComp === "MyProfile" ? <UserDetails /> : null}
                {myComp === "Transaction" ? <TransactionList /> : null}
                {myComp === "GetServiceStatus" ? <SingleService /> : null}
                {myComp === "CreateServiceRequest" ? <CreateServiceRequest /> : null}
                <button onClick={killSession}>Logout</button>
                {myComp === "Transaction" ? <div><TransactionList /><CreateTransaction /></div> : null}
            </div>

    )

