import React, { useState, useEffect } from 'react'
import AccountList from './account-list.component';
import UserDetails from './user-details.component';
import TransactionList from './transaction-list.component';
import SingleService from './single-service';
import CreateServiceRequest from './create-service-request.component';
import CreateTransaction from './transaction-create.component';
import Login from './login.component';
import Banner from '../images/Banner.png'
import Logo from '../images/Logo.png'
import csr from '../images/csr.jpg'
import emoji from '../images/emoji.jpg'
import Footer from './footer.component';
import PayeeList from './payee-list.component';
import AddPayee from './add-payee.component';

export default function LandingPage() {

    const [myComp, setComp] = useState("");

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
        getSessionID();
    }, [])

    return (
        getSessionID() == null ?
            <div>
                <div>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#"><img src={Logo} height="56px" onClick={() => { window.location.reload(false) }} /></a>
                            <button type="button" class="btn btn-primary loginBtn" onClick={() => { setComp("Login") }}>Login</button>
                        </div>
                    </nav>
                    <Footer />
                </div>
                {myComp === "Login" ? <Login /> :
                    <div>
                        <img src={Banner} width="100%" class="img-fluid" alt="img" />
                    </div>
                }
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
                                    <a class={myComp === "GetServiceStatus" ? "nav-link active" : "nav-link"} href="#" onClick={() => { setComp("GetServiceStatus") }}>Get Service Status</a>
                                </li>
                                <li class="nav-item">
                                    <a class={myComp === "CreateServiceRequest" ? "nav-link active" : "nav-link"} href="#" onClick={() => { setComp("CreateServiceRequest") }}>Create Service Request</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={() => { setComp("GetPayees") }}>Get All Payees</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" onClick={() => { setComp("AddPayee") }}>Add Payee</a>
                                </li>
                            </ul>
                            <button type="button" class="btn btn-primary loginBtn" onClick={killSession}>Logout</button>
                        </div>
                    </div>
                </nav>

                <div class="wrapper">
                    {myComp === "" ? <UserDetails /> : null}
                    {myComp === "Profile" ? <UserDetails /> : null}
                    {myComp === "Account" ? <AccountList /> : null}
                    {myComp === "Transaction" ? <div><TransactionList /><br /><br /><CreateTransaction /></div> : null}
                    {myComp === "MyProfile" ? <UserDetails /> : null}
                    {myComp === "GetServiceStatus" ? <SingleService /> : null}
                    {myComp === "CreateServiceRequest" ? <CreateServiceRequest /> : null}
                </div>

                <Footer />
                {myComp === "GetPayees" ? <PayeeList /> : null}
                {myComp === "AddPayee" ? <AddPayee /> : null}
            </div>

    )
}