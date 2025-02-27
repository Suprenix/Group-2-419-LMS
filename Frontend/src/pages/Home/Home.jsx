import { useGetUsersQuery } from "../../redux/users/users";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState(null); // Track selected action (signup or login)

  // fetches users
  const { data: users = [], error, isLoading } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;
  const totalUsers = users.length;

  return (
    <div className="home-body">
      <h1 className="home-header text-2xl font-bold mb-4">ILEARN-LMS</h1>
      <p className="home-subheading mb-6">
        Empowering Minds, One Click at a Time
      </p>

      {/* Role selection buttons */}
      {!selectedAction && (
        <div className="role">
          <button
            className="signup-role"
            onClick={() => setSelectedAction("signup")}
          >
            Sign-Up
          </button>
          <button
            className="login-role"
            onClick={() => setSelectedAction("login")}
          >
            Login
          </button>
        </div>
      )}

      {/* If a role is selected, show related buttons + Back button */}
      {selectedAction && (
        <div className="action">
          {selectedAction === "signup" ? (
            <>
              <button
                className="teacher-register"
                onClick={() => navigate("/teacher/register")}
              >
                Teacher Register
              </button>
              <button
                className="student-register"
                onClick={() => navigate("/student/register")}
              >
                Student Register
              </button>
            </>
          ) : (
            <>
              <button
                className="teacher-login"
                onClick={() => navigate("/teacher/login")}
              >
                Teacher Login
              </button>
              <button
                className="student-login"
                onClick={() => navigate("/student/login")}
              >
                Student Login
              </button>
            </>
          )}

          {/* Back button to return to role selection */}
          <button
            className="back-button"
            onClick={() => setSelectedAction(null)}
          >
            back
          </button>
        </div>
      )}

      {/* Render users */}
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id}>
            {user.name} {user._id} {user.role}
            <div>Total Users: {totalUsers}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
