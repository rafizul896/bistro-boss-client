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
        element: <Dashboard></Dashboard>,
        children: [
            {
                path:'/dashboard/cart',
                element: <Cart></Cart>
            }
        ]
    }
])

export default router;