import useAuth from "../../hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();
    
    return (
        <div className="p-5">
            <h2 className="text-4xl font-semibold">Hi, Welcome {user.displayName ? user.displayName + '!' : 'Back!'}</h2>

        </div>
    );
};

export default UserHome;