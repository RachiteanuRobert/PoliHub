import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useOwnUser, useTokenHasExpired } from "@infrastructure/hooks/useOwnUser";
import {Outlet} from "react-router";
import { isUndefined } from "lodash";
import { useEffect } from 'react';
import {LoginPage} from "@presentation/pages/LoginPage";


const RequireAuth = ()  => {
    const location = useLocation();
    const navigate = useNavigate();
    const ownUser = useOwnUser();
    const {loggedIn, hasExpired} = useTokenHasExpired();

    const isUserAuth = !isUndefined(ownUser);

    return (loggedIn && !hasExpired)
        ? <Outlet/> :
        <Navigate to="/login" state={{prevUrl: location.pathname }} replace/>;
};

export default RequireAuth;