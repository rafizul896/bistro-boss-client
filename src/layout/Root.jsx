import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";

const Root = () => {
    const location = useLocation();
    const noHeaderFooter1 = location.pathname.includes('login')
    const noHeaderFooter2 = location.pathname.includes('register')
    return (
        <div>
            {
                noHeaderFooter1 || noHeaderFooter2 || <Navbar></Navbar>
            }
            <div className="min-h-[calc(100vh-324px)]">
                <Outlet></Outlet>
            </div>
            {

                noHeaderFooter1 || noHeaderFooter2 || <Footer></Footer>
            }
        </div>
    );
};

export default Root;