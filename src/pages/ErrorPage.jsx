import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div>
                error
            </div>
            <Link to='/'>Go to Home</Link>
        </div>
    );
};

export default ErrorPage;