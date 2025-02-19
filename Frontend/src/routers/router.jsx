import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import StudentLogin from "../pages/student/StudentLogin";
import StudentRegister from "../pages/student/StudentRegister";
import StudentDashboard from "../pages/student/StudentDashboard";
import Home from "../pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import TeacherRegister from "../pages/Teacher/TeacherRegister";
import TeacherLogin from "../pages/Teacher/TeacherLogin";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminRegister from "../pages/Admin/AdminRegister";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [{ path: "/", element: <Home /> }],
    },
    {
        path: "/student",
        children: [
            { path: "register", element: <StudentRegister /> },
            { path: "login", element: <StudentLogin /> },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["student"]}>
                        <StudentDashboard />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/teacher",
        children: [
            { path: "register", element: <TeacherRegister /> },
            { path: "login", element: <TeacherLogin /> },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["teacher"]}>
                        <TeacherDashboard />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/admin",
        children: [
            { path: "register", element: <AdminRegister /> },
            { path: "login", element: <AdminLogin /> },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    { path: "*", element: <Navigate to="/" replace /> }, // Catch-all redirect
]);

export default router;
