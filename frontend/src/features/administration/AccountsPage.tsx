import React, { useEffect, useState } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../app/store";
import Spinner from '../../components/Spinner';
import { get, remove } from '../../app/api';

export default function AccountsPage() {

    const token = useSelector((state: RootState) => state.auth.token);

    const [loading, setLoading] = useState<boolean>(true);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [deleteAccountId, setDeleteAccountId] = useState<number | null>(null);

    useEffect(() => {

        if (token) {
            get(`/auth/accounts`, token)
                .then(data => {
                    setLoading(false);

                    if (data !== null) {
                        setAccounts(data);
                    }
                })
        }

    }, [token]);

    function deleteAccount() {
        const accountId = deleteAccountId;
        setDeleteAccountId(null);

        remove(`/auth/accounts?id=${accountId}`, token as string)
            .then(() => {
                setAccounts(accounts.filter(a => a.id !== accountId));
            })
    }

    if (loading) {
        return (<Spinner />);
    }

    return (

        <div>
            <h2>Admin Accounts <Link to="/dashboard/administration/add" className="btn btn-primary ml-auto">Add</Link>
            </h2>

            <p className="mb-5">A list of admin accounts that can be used to login to the HR system. Click on the
                "Delete" button to delete
                an account. To add a new account, click on the blue "Add" button (see above).</p>

            <div className="table-responsive-md">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Operations</th>
                    </tr>
                    </thead>

                    <tbody>
                    {(accounts as any[]).map(account => (
                        <tr key={account.id}>
                            <td>{account.id}.</td>
                            <td>{account.name}</td>
                            <td>{account.email}</td>
                            <td>
                                <button onClick={() => setDeleteAccountId(account.id)}
                                        className="btn btn-sm mx-2 btn-info">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <SweetAlert
                warning
                showCancel
                confirmBtnText="Delete!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={() => deleteAccount()}
                onCancel={() => setDeleteAccountId(null)}
                show={deleteAccountId !== null}>
                This will delete the account from our HR database.
            </SweetAlert>
        </div>
    );
}
