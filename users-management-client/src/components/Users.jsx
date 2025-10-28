import React, { useState } from 'react';
import { use } from 'react';

const Users = ({usersPromise}) => {
 
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);
    
    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;

        // For simplicity, we are not sending the user data in the request body
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
        .then(res => res.json())
        .then(data=>{
            console.log("User added:", data);
            const updatedUsers = [...users, data];
            setUsers(updatedUsers);
            e.target.reset();
        })
    }

    return (
        <div>
            <div>
                <h1>Add a user</h1>
                <form onSubmit={handleAddUser} >
                <input type="text" name='name'/>
                <br />
                <input type="email" name='email' />
                <br />
                <button>Add User</button>
                </form>
            </div>
           <div>
             {
                users.map(user=> <p key={user.id} >{user.name} - {user.email}</p>)
            }
           </div>
        </div>
    );
};

export default Users;