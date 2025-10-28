import React, { useState } from "react";
import { use } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    // For simplicity, we are not sending the user data in the request body
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("User added:", data);
        const updatedUsers = [...users, data];
        setUsers(updatedUsers);
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("Failed to add user. Please try again.");
      });
  };
  return (
    <div>
      <div>
        <h1>Add a user</h1>
        <form onSubmit={handleAddUser}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter name"
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter email"
          />
          <br />
          <button>Add User</button>
        </form>{" "}
      </div>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.name} - {user.email}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
