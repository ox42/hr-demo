import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { Redirect } from "react-router-dom";
import { signIn } from "./authSlice";

import classes from './LoginPage.module.css';


export default function LoginPage() {
    const token = useSelector((state: RootState) => state.auth.token);
    const isFailure = useSelector((state: RootState) => state.auth.isFailure);
    const isAuthenticating = useSelector((state: RootState) => state.auth.isAuthenticating);


    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [typing, setTyping] = useState<boolean>(false);

    if (token) {
        return (<Redirect to='/dashboard/departments/list' />);
    }

    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setTyping(false);
        dispatch(signIn(email, password));
    }

    return (
        <div className={classes.LoginPage}>
            <form className={classes.formSignIn} onSubmit={submitForm}>

                <i className={classes.loginIcon + " bi bi-key-fill"}></i>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                <p className="text-danger font-weight-bold mt-3 mb-4">{(isFailure && !typing) ? 'Invalid email or password. Try again.' : '\u00A0'}</p>

                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className={"form-control " + classes.formField}
                       placeholder="Email address" onChange={(e) => {
                    setTyping(true);
                    setEmail(e.target.value);
                }} required autoComplete="off" autoFocus />

                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className={"form-control " + classes.formField}
                       placeholder="Password" onChange={(e) => {
                    setTyping(true);
                    setPassword(e.target.value);
                }} required />

                <button className="btn btn-lg btn-primary btn-block" disabled={isAuthenticating} type="submit">Sign in
                </button>
                <p className="mt-5 mb-3 text-muted">&copy; Awesome Co.</p>
            </form>
        </div>
    );
}
