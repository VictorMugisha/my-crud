import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = React.useState([]);

    // Function to handle deletion of a user
    const handleDelete = (_id) => {
        setUsers(users.filter(user => user._id !== _id));
    };

    // Function to handle update (can be linked to routing in a real app)
    const handleUpdate = (_id) => {
        console.log(`Update user with ID: ${_id}`);
    };

    // Navigate to the Create User page
    const handleAddUser = () => {
        navigate('/create');
    };

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await fetch("http://localhost:5000/");
                const data = await res.json()
                setUsers(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [])

    return (
        <div className="users-container page-content">
            <h2 className="users-title">Users List</h2>
            <button className="add-user-btn" onClick={handleAddUser}>Add New User</button>
            <ul className="users-list">
                {users.map(user => (
                    <li key={user._id} className="user-card">
                        <div className="user-info">
                            <p><strong>ID:</strong> {user._id}</p>
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
                        </div>
                        <div className="user-actions">
                            <Link to={`/update/${user._id}`}>
                                <button className="update-btn" onClick={() => handleUpdate(user._id)}>Update</button>
                            </Link>
                            <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
