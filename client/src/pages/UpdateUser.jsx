import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock initial user data - replace this with actual data fetching logic
    const initialUserData = {
        firstName: 'John',
        lastName: 'Doe',
        role: 'Developer',
        email: 'johndoe@example.com',
        isAdmin: true,
    };

    const [formData, setFormData] = useState(initialUserData);

    // Simulate fetching user data on component mount
    useEffect(() => {
        // Fetching user from the backend using "http://localhost:5000/users/:id" endpoint
        async function fetchUser() {
            try {
                const user = await fetch(`http://localhost:5000/${id}`);
                const data = await user.json();
                setFormData(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated user data:', formData);
        // Simulate updating user data and navigate back to the user list
        // Example: updateUser(id, formData).then(() => navigate('/'));
        navigate('/');
    };

    return (
        <div className="update-user-container page-content">
            <h2 className="update-user-title">Update User</h2>
            <form className="update-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group checkbox-group">
                    <label htmlFor="isAdmin">Admin</label>
                    <input
                        type="checkbox"
                        id="isAdmin"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-btn">Update</button>
            </form>
        </div>
    );
}
