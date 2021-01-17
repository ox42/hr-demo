import React, { useState, MouseEvent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';

import './DashboardLayout.css';

function DashboardLayout(props: any) {

    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const dispatch = useDispatch();


    function toggleSidebar(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setShowSidebar(!showSidebar);
    }

    function logoutUser(event: MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        dispatch(logout());
    }

    return (
        <div className="Dashboard">

            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/dashboard/departments/list">Awesome
                    Co.</Link>

                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                        data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation" onClick={toggleSidebar}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="/auth/logout" onClick={logoutUser}><i
                            className="bi bi-door-closed" /> Sign out</a>
                    </li>
                </ul>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu"
                         className={"col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" + (showSidebar ? ' show' : '')}>
                        <div className="sidebar-sticky pt-3">

                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-3 mb-2 text-muted">
                                <span>Operations</span>
                            </h6>

                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/departments/add"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-people" /> Add Department
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/departments/list"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-shop" /> List Departments
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/administration/list"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-people" /> Administration
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="https://github.com/ox42/hr-demo"
                                       target="_blank" rel="noreferrer">
                                        <i className="bi bi-github" /> Source Code
                                    </a>
                                </li>
                            </ul>

                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 pt-3 mt-5 mb-2 text-muted">
                                <span>Reports</span>
                            </h6>

                            <ul className="nav flex-column mb-2">
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/reports/highest-salary"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-cash" /> Highest salary
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/reports/costly-departments"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-flag" /> Costly Departments
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/reports/departments-size"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-diagram-3" /> Department Size
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/reports/departments-spending"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-wallet2" /> Department Costs
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active"
                                             to="/dashboard/reports/expensive-employees"
                                             onClick={() => setShowSidebar(false)}>
                                        <i className="bi bi-bar-chart-line" /> Expensive People
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        <div className="max-width-1400">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>


        </div>
    );
}

export default DashboardLayout;
