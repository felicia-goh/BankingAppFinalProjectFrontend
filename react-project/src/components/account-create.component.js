import React, { useState, useEffect } from 'react'
import AccountDataService from "../services/account.service"

export default function CreateAccount() {

    const [currUserID, setCurrUserID] = useState(0);
    const [data, setData] = useState({ account_type: "", balance: 0 });

    useEffect(() => {
        getSessionID();
        console.log("account: " + JSON.stringify(data))
    }, [data])

    function getSessionID() {
        console.log("Inside getSessionID()")
        let data = sessionStorage.getItem('mySession');
        setCurrUserID(data);
        return data;
    }

    function createNewAccount(e) {
        e.preventDefault()
        if (data.account_type !== "") {
            AccountDataService.create(currUserID, data)
                .then(response => {
                    // console.log("response: " + JSON.stringify(response));
                    setData({ ...data, account_type: "", balance: 0 })
                    window.location.reload(false);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            alert("Please select Account Type in the drop down")
        }
    }

    return (
        <div>
            <h4>Request for an Account</h4>
            <form onSubmit={createNewAccount}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Account type</label>
                    <select class="form-select" aria-label="Default select example" onChange={e => setData({ ...data, account_type: e.target.value })}>
                        <option value="" selected>-- Select the type of account -- </option>
                        <option value="saving">Saving</option>
                        <option value="current">Current</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Balance</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input type="number" min="100" class="form-control" id="balance" onChange={e => setData({ ...data, balance: e.target.value })} required />
                    </div>
                    <div id="" class="form-text">A minimum of $100 is required to create an account</div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
