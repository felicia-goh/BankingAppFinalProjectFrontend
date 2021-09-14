import React, { useState, useEffect } from 'react'
import LoginDataService from "../services/login.service"
import { Switch, Route, Link } from "react-router-dom";
import SingleService from './single-service';
import AccountList from './account-list.component';
import UserList from './user-list.component';





export default function LandingPage() {

    const [auth, setAuth] = useState({ email: '', login_password: '', isLoggedIn: false });
    const [currUser, setCurrUser] = useState([]);   // id, name, type

    // function setSessionID() {                                   // setSession() should be done when login
    //     setCurrUser({ id: 20, name: 'jane', email: 'janedoe@gmail.com' });;
    //     sessionStorage.setItem('mySession', JSON.stringify(currUser));
    // }

    useEffect(() => {

    }, [])

    function autheticateUser(e) {
        e.preventDefault()
        console.log(auth);
        LoginDataService.login(auth)
            .then(response => {
                setCurrUser(response.data)
                setAuth({ ...auth, email: '', login_password: '', isLoggedIn: true })
                console.log("response: " + JSON.stringify(response));
            })
            .catch(e => {
                console.log(e.detailedMsg);
            });
    }

    return (
        auth.isLoggedIn ?
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/users" className="navbar-brand">
                        Online Banking System
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/getservicestatus"} className="nav-link">
                                Get Service Status
                            </Link>
                        </li>
                    </div>
                </nav>


                <div>
                    <h4>Welcome back, {currUser.customer_name} !</h4>
                </div>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/getservicestatus" component={SingleService}></Route>
                    </Switch>
                </div>
            </div>

            :

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
    )
}
