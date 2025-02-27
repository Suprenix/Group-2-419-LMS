import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./footer";
import TeacherLogin from "./pages/Teacher/TeacherLogin";

export default function App() {
return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
