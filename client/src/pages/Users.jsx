import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);

  // Function to handle deletion of a user
  const handleDelete = async (_id) => {
    console.log("Deleting a user: ", _id);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${_id}`, {
        method: "DELETE",
      });
      if (res.status === 404) {
        throw new Error("User not found");
      } else if (!res.ok) {
        throw new Error("Failed to delete user");
      }
      console.log("Deleted a user successfully");
      setUsers(users.filter((user) => user._id !== _id));
    } catch (error) {
      console.log(error);
    }
  };

  // Navigate to the Create User page
  const handleAddUser = () => {
    navigate("/create");
  };

  // Fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        // Ensure data is an array before setting the state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.log(data)
          console.error("Fetched data is not an array", data);
          setUsers([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="users-container page-content">
      <h2 className="users-title">Users List</h2>
      <button className="add-user-btn" onClick={handleAddUser}>
        Add New User
      </button>
      <ul className="users-list">
        {users?.map((user) => (
          <li key={user._id} className="user-card">
            <div className="user-info">
              <p>
                <strong>ID:</strong> {user._id}
              </p>
              <p>
                <strong>Name:</strong> {user.firstName} {user.lastName}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
              </p>
            </div>
            <div className="user-actions">
              <Link to={`/update/${user._id}`}>
                <button className="update-btn">Update</button>
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
