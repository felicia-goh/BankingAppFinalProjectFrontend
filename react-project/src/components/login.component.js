import React, { useState, useEffect } from 'react'
import LoginDataService from "../services/login.service"
import CreateUser from './user-create.component';

export default function Login() {

    const [currUserID, setCurrUserID] = useState(0);
    const [auth, setAuth] = useState({ email: '', login_password: '', isLoggedIn: false });
    const [render, setRender] = useState("");
    const [warning, setWarning] = useState(false);

    function setSessionID(id) {
        console.log("Inside setSessionID()")
        sessionStorage.setItem('mySession', id);
        setCurrUserID(id);
    }

    function getSessionID() {
        console.log("Inside getSessionID()")
        let data = sessionStorage.getItem('mySession');
        setCurrUserID(data);
        return data;
    }

    useEffect(() => {
        getSessionID();
    }, [currUserID])

    function autheticateUser(e) {
        e.preventDefault()
        LoginDataService.login(auth)
            .then(response => {
                // console.log("response: " + JSON.stringify(response));
                setSessionID(response.data.id)
                setAuth({ ...auth, email: '', login_password: '', isLoggedIn: true })
                window.location.reload(false);
            })
            .catch(e => {
                console.log(e);
                setWarning(true);
                setAuth({ ...auth, login_password: '' })
            });
    }

    return (
        render === "createUser" ?
            <CreateUser />
            :
            <div>
                <form onSubmit={autheticateUser}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="text" class="form-control" id="email" aria-describedby="emailHelp" value={auth.email} onChange={e => setAuth({ ...auth, email: e.target.value })} required />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" value={auth.login_password} onChange={e => setAuth({ ...auth, login_password: e.target.value })} required />
                    </div>
                    {
                        warning ?
                            <div>
                                <div class="form-text" style={{ color: "red" }}>* Incorrect email or password</div>
                                <br />
                            </div>
                            : null
                    }
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <button type="button" class="my-3 btn btn-secondary" onClick={() => { setRender("createUser") }}>Sign Up instead</button>
            </div>
    )
}
