import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

import { RootState } from "../../app/store";
import Spinner from '../../components/Spinner';
import { Link } from "react-router-dom";
import { get, remove } from '../../app/api';

export default function DepartmentsPage() {

    const token = useSelector((state: RootState) => state.auth.token);

    const [loading, setLoading] = useState<boolean>(true);
    const [departments, setDepartments] = useState<any[]>([]);

    const [deleteDepartmentId, setDeleteDepartmentId] = useState<number | null>(null);

    useEffect(() => {

        if (token && departments.length === 0) {
            get('/staff/departments', token)
                .then(data => {
                    setLoading(false);

                    if (data !== null) {
                        setDepartments(data);
                    }
                })
        }

    }, [token, departments]);

    function deleteDepartment() {

        const departmentId = deleteDepartmentId;
        setDeleteDepartmentId(null);

        remove(`/staff/departments?id=${departmentId}`, token as string)
            .then(() => {
                setDepartments(departments.filter(d => d.id !== departmentId));
            })
    }

    if (loading) {
        return (<Spinner />);
    }

    return (

        <div>

            <h2>Departments <Link to="/dashboard/departments/add" className="btn btn-primary ml-auto">Add</Link></h2>

            <p className="mb-5">A list of departments. Click on the "View" button to get a list of employees, or click
                "Delete" to remove a department. To add a new department, click on the blue "Add" button (see
                above).</p>

            <div className="table-responsive-md">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Operations</th>
                    </tr>
                    </thead>

                    <tbody>
                    {(departments as any[]).map(department => (
                        <tr key={department.id}>
                            <td>{department.id}.</td>
                            <td>{department.name}</td>
                            <td>
                                <Link to={`/dashboard/employees/${department.id}`}
                                      className="btn btn-sm mx-2 btn-secondary">View</Link>

                                <button onClick={() => setDeleteDepartmentId(department.id)}
                                        className="btn btn-sm mx-2 btn-info">Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                    {(departments.length === 0) ? <tr>
                        <td colSpan={3} className="text-center font-weight-bold py-5">No departments found. Please
                            create one.
                        </td>
                    </tr> : ''}
                    </tbody>
                </table>
            </div>


            <SweetAlert
                warning
                showCancel
                confirmBtnText="Delete!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteDepartment()}
                onCancel={() => setDeleteDepartmentId(null)}
                show={deleteDepartmentId !== null}>
                This will delete the department (and all employees there) from our HR database.
            </SweetAlert>
        </div>

    );
}
