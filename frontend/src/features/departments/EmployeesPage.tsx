import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

import { RootState } from "../../app/store";
import Spinner from '../../components/Spinner';
import { Link, useHistory } from "react-router-dom";
import { get, remove } from '../../app/api';

export default function EmployeesPage(props: { match: {  params: { department: string } } }) {

    const departmentId: string = props.match.params.department;
    const token = useSelector((state: RootState) => state.auth.token);

    const [loadingEmployees, setLoadingEmployees] = useState<boolean>(true);
    const [employees, setEmployees] = useState<any[]>([]);

    const [loadingDepartments, setLoadingDepartments] = useState<boolean>(true);
    const [departments, setDepartments] = useState<any[]>([]);

    const [deleteEmployeeId, setDeleteEmployeeId] = useState<number | null>(null);

    const history = useHistory();

    useEffect(() => {

        if (token && departmentId) {
            get(`/staff/employees?department_id=${departmentId}`, token)
                .then(data => {
                    setLoadingEmployees(false);

                    if (data !== null) {
                        setEmployees(data);
                    }
                })
        }

        if (token && departmentId) {
            get(`/staff/departments`, token)
                .then(data => {
                    setLoadingDepartments(false);

                    if (data !== null) {
                        setDepartments(data);
                    }
                })
        }

    }, [token, departmentId]);

    function deleteEmployee() {
        const employeeId = deleteEmployeeId;
        setDeleteEmployeeId(null);

        remove(`/staff/employees?id=${employeeId}`, token as string)
            .then(() => {
                setEmployees(employees.filter(e => e.id !== employeeId));
            })
    }

    if (loadingEmployees || loadingDepartments) {
        return (<Spinner />);
    }

    return (

        <div>
            <h2>Employees</h2>

            <p className="mb-5">A list of employees for the selected department. Click on the "Delete" button to delete
                an employee.
                To add a new employee, select the correct department and click on the blue "Add employee" button.</p>

            <div className="row mt-2 mb-4">

                <div className="col-md-8 col-lg-9">
                    <select className="form-control my-2" value={departmentId} onChange={(event) => {
                        event.preventDefault();
                        history.push(`/dashboard/employees/${event.target.value}`);
                    }}>
                        {(departments as any[]).map(department => (
                            <option key={department.id} value={department.id}>{department.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4 col-lg-3">
                    <Link className="btn btn-primary btn-block my-2"
                          to={`/dashboard/employees/${departmentId}/add`}>Add employee</Link>
                </div>
            </div>

            <div className="table-responsive-md">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Operations</th>
                    </tr>
                    </thead>

                    <tbody>
                    {(employees as any[]).map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}.</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>&euro; {employee.salary}</td>
                            <td>
                                <button onClick={() => setDeleteEmployeeId(employee.id)}
                                        className="btn btn-sm mx-2 btn-info">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>

                    {(employees.length === 0) ? <tr>
                        <td colSpan={5} className="text-center font-weight-bold py-5">No employees found. Please add
                            some.
                        </td>
                    </tr> : ''}
                </table>
            </div>

            <SweetAlert
                warning
                showCancel
                confirmBtnText="Delete!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteEmployee()}
                onCancel={() => setDeleteEmployeeId(null)}
                show={deleteEmployeeId !== null}>
                This will delete the employee from our HR database.
            </SweetAlert>
        </div>

    );
}
