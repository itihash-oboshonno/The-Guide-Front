import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/authContext/AuthContext";
import Loading from "../pages/Shared/Loading";

const PrivateRoute = ({children}) => {

    const {currentUser, loading} = useContext(AuthContext);
    const intendedLocation = useLocation();

    if(loading) {
        return <Loading></Loading>;
    }

    if (currentUser) {
        return children;
    }
    return <Navigate to="/login" state={{ from: intendedLocation }} replace></Navigate>
};

export default PrivateRoute;