import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./Components/UserTable";
import EditUserForm from "./Components/EditUserForm";

const apiUrl = "http://localhost:3001/data"; // Assuming your API is running locally on port 3001

const App = () => {
  const initialFormState = { id: null, name: "", username: "" };

  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addUser = async (user) => {
    try {
      const response = await axios.post(apiUrl, user);
      setUsers([...users, response.data]);
      setAddCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, updatedUser);
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setEditing(false);
      setCurrentUser(null);
      setUpdateCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container">
      <h1>Add and Update User Details</h1>
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>{editing ? "Edit User" : "Add User"}</h2>
            <EditUserForm
              editing={editing}
              setEditing={setEditing}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              updateUser={updateUser}
              addUser={addUser}
            />
          </div>
          <div>
            <h2>Count</h2>
            <p>Add Count: {addCount}</p>
            <p>Update Count: {updateCount}</p>
          </div>
        </div>
        <div className="flex-large">
          <h2>View Users</h2>
          <UserTable
            users={users}
            apiUrl={apiUrl}
            editRow={editRow}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
