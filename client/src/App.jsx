import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";

export default function App() {
  return (
    <main className="app-container">
      <BrowserRouter>
        <nav className="navbar">
          <h1 className="navbar-brand">User Management</h1>
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'active-link' : 'link'}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) => isActive ? 'active-link' : 'link'}
              >
                Create User
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
