import React, { FormEvent, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useHistory } from "react-router-dom";
import { post } from '../../app/api';

import classes from '../../common/Form.module.css';

export default function AddEmployeePage(props: { match: { params: { department: string } } }) {

    const departmentId: string = props.match.params.department;
    const token = useSelector((state: RootState) => state.auth.token);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [salary, setSalary] = useState<string>('');

    const [failureMessage, setFailureMessage] = useState<string | null>(null);
    const [isFailure, setFailure] = useState<boolean>(false);
    const [typing, setTyping] = useState<boolean>(false);

    const history = useHistory();

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setFailure(false);
        setTyping(false);
        post(`/staff/employees`, token as string, {name, email, salary, department_id: departmentId})
            .then(() => {
                history.push('/dashboard/employees/' + departmentId);
            })
            .catch((err: any) => {
                setFailureMessage(err.message || 'Invalid data. Please try again.');
                setFailure(true)
            })
    }

    return (

        <div>
            <h2>Add Employee <Link to={`/dashboard/employees/${departmentId}`} className="btn btn-primary ml-auto">View
                list</Link></h2>

            <p className="mb-5">Use the form below to create a new employee, which will be created in the department you
                selected previously.</p>

            <div className={"card " + classes.tinyForm}>
                <div className="card-header">
                    Employee Details
                </div>

                <div className="card-body">
                    <form className="form pb-4" onSubmit={submitForm}>

                        <p className="text-danger font-weight-bold mt-3 mb-4">{(isFailure && !typing) ? failureMessage : '\u00A0'}</p>

                        <div className="form-group">
                            <label htmlFor="inputName">Full name</label>
                            <input type="text" id="inputName" className="form-control" autoComplete="off"
                                   placeholder="Enter a valid name" onChange={(e) => {
                                setTyping(true);
                                setName(e.target.value);
                            }} required autoFocus />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" id="inputEmail" className="form-control" autoComplete="off"
                                   placeholder="Enter a valid email address" onChange={(e) => {
                                setTyping(true);
                                setEmail(e.target.value);
                            }} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputSalary">Salary</label>
                            <input type="text" id="inputSalary" className="form-control" autoComplete="off" pattern="[0-9]+"
                                   placeholder="Enter a valid salary" onChange={(e) => {
                                setTyping(true);
                                setSalary(e.target.value);
                            }} required />
                        </div>

                        <div className="clearfix text-right">
                            <button className="btn btn-lg btn-info my-2 ml-auto" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
