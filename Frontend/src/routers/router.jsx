import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import StudentRegister from "../pages/student/StudentRegister";
import StudentLogin from "../pages/student/StudentLogin";
import StudentDashboard from "../pages/student/StudentDashboard";
import StudentCourses from "../pages/student/StudentCourses";
import StudentCourseDetails from "../pages/student/StudentCourseDetails";
import TeacherRegister from "../pages/Teacher/TeacherRegister";
import TeacherLogin from "../pages/Teacher/TeacherLogin";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import TeacherCourses from "../pages/Teacher/TeacherCourses";
import TeacherCourseDetails from "../pages/Teacher/TeacherCourseDetails";
import TeacherEditCourses from "../pages/Teacher/TeacherEditCourses";
import TeacherAddCourses from "../pages/Teacher/TeacherAddCourses";
import AdminRegister from "../pages/Admin/AdminRegister";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUserList from "../pages/Admin/AdminUserList";
import AdminCourseList from "../pages/Admin/AdminCourseList";
import ProtectedRoute from "./ProtectedRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App includes your universal NavBar (and Footer if desired)
    children: [
      { path: "", element: <Home /> },
      {
        path: "student",
        children: [
          { path: "register", element: <StudentRegister /> },
          { path: "login", element: <StudentLogin /> },
          {
            path: "dashboard",
            element: (
              <ProtectedRoute allowedRoles={["student"]}>
                {/* ProtectedRoute must render <Outlet /> for its children */}
                <StudentDashboard />
              </ProtectedRoute>
            ),
          },
          { path: "courses/:id", element: <StudentCourseDetails /> },
          {
            path: "dashboard/courses",
            children: [
              { path: "edit", element: <StudentCourses /> },
              {/* path: "add", element: <TeacherAddCourses /> */},
            ],
          },
        ],
      },
      {
        path: "teacher",
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
          { path: "courses/:id", element: <TeacherCourseDetails /> },
          {
            path: "dashboard/courses",
            children: [
              { path: "edit", element: <TeacherCourses /> },
              { path: "edit/:id", element: <TeacherEditCourses /> },
              { path: "add", element: <TeacherAddCourses /> },
            ],
          },
        ],
      },
      {
        path: "admin",
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
          { path: "dashboard/users", element: <AdminUserList /> },
          { path: "dashboard/courses", element: <AdminCourseList/> },
        ],
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
