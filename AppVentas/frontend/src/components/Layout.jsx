import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

function Layout() {
  return (
    <div className="p-d-flex p-flex-column" style={{ minHeight: "100vh" }}>
      <header className="p-d-flex">
        <h1 className="ml-5 font-bold">Celtaced</h1>
        <Navbar />
      </header>
      <main className="p-flex-grow-1">
        <div className="main-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
