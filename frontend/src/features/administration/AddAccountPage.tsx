import React, { FormEvent, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link, useHistory } from "react-router-dom";
import { post } from '../../app/api';

import classes from '../../common/Form.module.css';

export default function AddAccountPage() {

    const token = useSelector((state: RootState) => state.auth.token);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const [failureMessage, setFailureMessage] = useState<string | null>(null);
    const [isFailure, setFailure] = useState<boolean>(false);
    const [typing, setTyping] = useState<boolean>(false);

    const history = useHistory();

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setFailure(false);
        setTyping(false);
        post(`/auth/accounts`, token as string, { name, email, password })
            .then(() => {
                history.push('/dashboard/administration/list');
            })
            .catch((err: any) => {
                setFailureMessage(err.message || 'Invalid data. Please try again.');
                setFailure(true)
            })
    }

    return (
        <div>
            <h2>Add Admin Account <Link to={`/dashboard/administration/list`} className="btn btn-primary ml-auto">View
                list</Link></h2>

            <p className="mb-5">Use the form below to create a new admin account. You can specify the password yourself
                (it's a demo project, so nothing fancy).</p>

            <div className={"card " + classes.tinyForm}>
                <div className="card-header">
                    Account Details
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
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" id="inputPassword" className="form-control" autoComplete="off"
                                   placeholder="Enter a valid password" onChange={(e) => {
                                setTyping(true);
                                setPassword(e.target.value);
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
