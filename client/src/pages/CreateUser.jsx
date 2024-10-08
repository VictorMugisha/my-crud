import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

export default function CreateUser() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        isAdmin: false,
    });

    const navigate = useNavigate();

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
        // Simulate form submission and navigate back to the user list
        async function createUser() {
            try {
                const api = API_URL + "/create";
                const res = await fetch(
                    api,
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                );
                const data = await res.json()
                console.log("After creating user in form", data)
            } catch (error) {
                console.log("ERROR CREATING USER: ", error)
            }
        }
        createUser();
        navigate('/');
    };

    return (
        <div className="create-user-container page-content">
            <h2 className="create-user-title">Create New User</h2>
            <form className="create-user-form" onSubmit={handleSubmit}>
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
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
}
