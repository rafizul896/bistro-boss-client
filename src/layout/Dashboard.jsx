import { FaAd, FaCalendar, FaHome } from "react-icons/fa";
import { MdContactMail, MdPayment, MdShoppingBag } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import { PiCalendarStarFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiHome8Fill } from "react-icons/ri";

const Dashboard = () => {
    return (
        <div className="flex max-w-[1540px] mx-auto">
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu space-y-1">
                    <div className="flex flex-col justify-center items-center mt-5 mb-3">
                        <h1 className="text-2xl font-bold text-black">BISTRO BOSS</h1>
                        <h3 className="font-semibold ">R E S T A U T A N T</h3>
                    </div>
                    <li>
                        <NavLink to="/dashboard/userHome">
                            <FaHome />
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation">
                            <FaCalendar />
                            Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <MdPayment />
                            Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                            <FiShoppingCart />
                            My Cart
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                            <FaAd />
                            Add Review
                        </NavLink>
                    </li>
                    <li className="pb-5">
                        <NavLink to="/dashboard/booking">
                            <PiCalendarStarFill />
                            My Booking
                        </NavLink>
                    </li>
                    <div className="border"></div>
                    {/*  */}
                    <li className="pt-5">
                        <NavLink to="/">
                            <RiHome8Fill />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order">
                            <GiHamburgerMenu />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/booking">
                            <MdShoppingBag />
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            <MdContactMail />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;