import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Updated initial user data with empty strings and false for isAdmin
  const initialUserData = {
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    isAdmin: false, // changed from null to false
  };

  const [formData, setFormData] = useState(initialUserData);

  const [updateStatus, setUpdateStatus] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:5000/${id}`);
        const data = await response.json();
        // Ensure all fields are handled correctly
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          role: data.role || "",
          email: data.email || "",
          isAdmin: data.isAdmin !== undefined ? data.isAdmin : false, // Default to false if undefined
        });
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
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated user data:", formData);

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data) {
        setUpdateStatus(true);
        navigate("/", { state: { updateStatus: true } });
      }
    } catch (error) {
      console.log(error);
    }
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
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
    </div>
  );
}
