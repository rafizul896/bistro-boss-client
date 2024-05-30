import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Authenication/Login";
import Register from "../pages/Authenication/Register";
import Dashboard from "../layout/Dashboard";
import Cart from "../dashboard/Cart";
import PrivetRoute from "./PrivetRoute";
import AllUsers from "../dashboard/Admin Panel/AllUsers";
import AddItems from "../dashboard/Admin Panel/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../dashboard/Admin Panel/ManageItems";
import Payment from "../dashboard/Payment/Payment";
import PaymentHistory from "../dashboard/Payment/PaymentHistory/PaymentHistory";
import AdminHome from "../dashboard/Admin Panel/AdminHome";
import UserHome from "../dashboard/User Panel/UserHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/menu",
                element: <Menu></Menu>
            },
            {
                path: "/order",
                element: <Order></Order>
            },
            {
                path: "/order/:category",
                element: <Order></Order>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute>
            <Dashboard></Dashboard>
        </PrivetRoute>,
        children: [
            // normal user routes
            {
                path: 'userHome',
                element: <UserHome />
            },
            {
                path: '/dashboard/cart',
                element: <Cart></Cart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory />
            },
            {

            },

            // admin routes
            {
                path: 'adminHome',
                element: <AdminRoute>
                    <AdminHome />
                </AdminRoute>
            },
            {
                path: 'allUsers',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute>
                    <AddItems></AddItems>
                </AdminRoute>
            },
            {
                path: 'manageItems',
                element: <ManageItems></ManageItems>
            },
            {

            },
        ]
    }
])

export default router;