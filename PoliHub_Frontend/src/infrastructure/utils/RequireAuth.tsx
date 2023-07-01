import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useOwnUser } from "@infrastructure/hooks/useOwnUser";
import {Outlet} from "react-router";
import { isUndefined } from "lodash";
import { useEffect } from 'react';
import {LoginPage} from "@presentation/pages/LoginPage";


const RequireAuth = ()  => {
    const location = useLocation();
    const navigate = useNavigate();
    const ownUser = useOwnUser();
    const isUserAuth = !isUndefined(ownUser);

    return isUserAuth
        ? <Outlet/> :
        <Navigate to="/login" state={{from: location}} replace/>;
};

export default RequireAuth;