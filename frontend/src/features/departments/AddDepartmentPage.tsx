import React, { FormEvent, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useHistory } from "react-router-dom";
import { post } from '../../app/api';

import classes from '../../common/Form.module.css';

export default function AddDepartmentPage() {

    const token = useSelector((state: RootState) => state.auth.token);

    const [name, setName] = useState<string>('');
    const [isFailure, setFailure] = useState<boolean>(false);
    const [typing, setTyping] = useState<boolean>(false);

    const history = useHistory();

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || name.trim().length === 0) {
            setFailure(true);
            return;
        }

        setFailure(false);
        setTyping(false);
        post('/staff/departments', token as string, {name})
            .then(() => {
                history.push('/dashboard/departments/list');
            })
            .catch(() => setFailure(true))
    }

    return (

        <div>
            <h2>Add Department <Link to="/dashboard/departments/list" className="btn btn-primary ml-auto">View
                list</Link></h2>

            <p className="mb-5">Use the form below to create a new department, which will be instantiated with zero
                employees.</p>


            <div className={"card " + classes.tinyForm}>
                <div className="card-header">
                    Department Details
                </div>

                <div className="card-body">
                    <form className="form pb-4" onSubmit={submitForm}>

                        <p className="text-danger font-weight-bold mt-3 mb-4">{(isFailure && !typing) ? 'Invalid form data. Try again.' : '\u00A0'}</p>

                        <div className="form-group">
                            <label htmlFor="inputName">Department name</label>
                            <input type="text" id="inputName" className="form-control" autoComplete="off"
                                   placeholder="Enter a valid name" onChange={(e) => {
                                setTyping(true);
                                setName(e.target.value);
                            }} required autoFocus />
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
