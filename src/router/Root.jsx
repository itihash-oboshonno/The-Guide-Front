import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Root = () => {
  return (
    <div>
      <div className="sticky top-0 z-50"><Navbar></Navbar></div>
      <div className="min-h-[calc(100vh-493px)]">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
