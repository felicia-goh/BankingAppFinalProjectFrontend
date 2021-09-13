import React, { useState, useEffect } from 'react'
import UserDataService from "../services/user.service"

export default function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        retrieveUsers();
    }, [])

    function retrieveUsers() {
        UserDataService.getAll()
            .then(response => {
                setUsers(response.data)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        console.log("user list: " + JSON.stringify(users));
    }

    return (
        <div>
            <div>
                <h4>User List</h4>
                <ul>
                    {users.map((user) => (
                        <li>{user.id}, {user.customer_name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}