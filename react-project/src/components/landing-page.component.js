import React, { useState, useEffect } from 'react'
import LoginDataService from "../services/login.service"
import AccountList from '../components/account-list.component';

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
                <h4>Welcome back, {currUser.customer_name} !</h4>
                <AccountList />
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
