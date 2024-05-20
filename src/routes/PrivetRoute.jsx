import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()

    if (loading) {
        return <Loader />
    }
    if (user) {
        return children
    }
    return <Navigate state={location?.pathname} to='/login' replace={true}></Navigate>
};

export default PrivetRoute;