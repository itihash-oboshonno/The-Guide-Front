import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet/>
            <Footer></Footer>
        </div>
    );
};

export default Root;