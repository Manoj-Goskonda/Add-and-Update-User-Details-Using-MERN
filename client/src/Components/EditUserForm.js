import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUserForm = ({ editing, currentUser, setEditing, setCurrentUser, updateUser, addUser }) => {
    const apiUrl = "http://localhost:3001/data"; // Assuming your API is running locally on port 3001
    const initialFormState = { id: null, name: "", username: "" };
    const [user, setUser] = useState(editing ? currentUser : initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const resetAddUser = () => {
        setEditing(false);
        setUser(initialFormState);
        setCurrentUser(initialFormState);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!user.name || !user.username) return;

        try {
            if (editing) {
                await axios.put(`${apiUrl}/${user.id}`, user); // Make a PUT request to update the user
                updateUser(user.id, user); // Update the user in the local state
            } else {
                const response = await axios.post(apiUrl, user); // Make a POST request to add the user
                addUser(response.data); // Add the new user to the local state
            }
            resetAddUser();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={user?.name}
                onChange={handleInputChange}
            />
            <label>Username</label>
            <input
                type="text"
                name="username"
                value={user?.username}
                onChange={handleInputChange}
            />
            <button>{editing ? "Update" : "Add"}</button>
            {editing && (
                <button onClick={resetAddUser} className="button muted-button">
                    Cancel
                </button>
            )}
        </form>
    );
};

export default EditUserForm;