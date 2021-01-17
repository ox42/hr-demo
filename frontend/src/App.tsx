import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from './features/auth/LoginPage';
import AddAccountPage from './features/administration/AddAccountPage';
import AccountsPage from './features/administration/AccountsPage';
import AddDepartmentPage from './features/departments/AddDepartmentPage';
import DepartmentsPage from './features/departments/DepartmentsPage';
import AddEmployeePage from './features/departments/AddEmployeePage';
import EmployeesPage from './features/departments/EmployeesPage';
import ReportsPage from './features/reports/ReportsPage';
import DashboardRoute from "./DashboardRoute";

import './App.css';

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/auth/login" component={LoginPage} />
                <DashboardRoute exact path="/dashboard/employees/:department" component={EmployeesPage} />
                <DashboardRoute exact path="/dashboard/employees/:department/add" component={AddEmployeePage} />

                <DashboardRoute exact path="/dashboard/departments/list" component={DepartmentsPage} />
                <DashboardRoute exact path="/dashboard/departments/add" component={AddDepartmentPage} />

                <DashboardRoute exact path="/dashboard/administration/list" component={AccountsPage} />
                <DashboardRoute exact path="/dashboard/administration/add" component={AddAccountPage} />

                <DashboardRoute exact path="/dashboard/reports/:type" component={ReportsPage} />

                <Redirect path="/" to="/dashboard/departments/list" />
            </Switch>
        </div>
    );
}

export default App;
