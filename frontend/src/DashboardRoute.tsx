import React from 'react';
import { RootState } from './app/store';
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

interface RouteProps {
    exact?: boolean;
    path: string;
    component: React.ComponentType<any>;
}

const DashboardRoute = ({ component: Component, ...rest }: RouteProps) => {
    const authToken = useSelector((state: RootState) => state.auth.token);

    return (<Route {...rest} render={(props) => (
        (authToken !== undefined && authToken !== null)
            ? <DashboardLayout><Component {...props} /></DashboardLayout>
            : <Redirect to='/auth/login' />
    )} />)
}

export default DashboardRoute;
