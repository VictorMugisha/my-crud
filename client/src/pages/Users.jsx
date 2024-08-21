import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Users() {
    const navigate = useNavigate();

    // Mock data for users
    const [users, setUsers] = React.useState([
        { userId: 1, firstName: "John", lastName: "Doe", role: "Developer", email: "john.doe@example.com", isAdmin: false },
        { userId: 2, firstName: "Jane", lastName: "Smith", role: "Designer", email: "jane.smith@example.com", isAdmin: true },
        { userId: 3, firstName: "Alice", lastName: "Johnson", role: "Project Manager", email: "alice.johnson@example.com", isAdmin: false },
    ]);

    // Function to handle deletion of a user
    const handleDelete = (userId) => {
        setUsers(users.filter(user => user.userId !== userId));
    };

    // Function to handle update (can be linked to routing in a real app)
    const handleUpdate = (userId) => {
        console.log(`Update user with ID: ${userId}`);
    };

    // Navigate to the Create User page
    const handleAddUser = () => {
        navigate('/create');
    };

    return (
        <div className="users-container">
            <h2 className="users-title">Users List</h2>
            <button className="add-user-btn" onClick={handleAddUser}>Add New User</button>
            <ul className="users-list">
                {users.map(user => (
                    <li key={user.userId} className="user-card">
                        <div className="user-info">
                            <p><strong>ID:</strong> {user.userId}</p>
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
                        </div>
                        <div className="user-actions">
                            <Link to={`/update/${user.userId}`}>
                                <button className="update-btn" onClick={() => handleUpdate(user.userId)}>Update</button>
                            </Link>
                            <button className="delete-btn" onClick={() => handleDelete(user.userId)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
