import React from "react";

const UserTable = ({ users, editRow }) => (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.length > 0 ? (
                users.map((user, i) => (
                    <tr key={i}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>
                            <button
                                className="button muted-button"
                                onClick={() => {
                                    editRow(user);
                                }}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No users</td>
                </tr>
            )}
        </tbody>
    </table>
);

export default UserTable;
