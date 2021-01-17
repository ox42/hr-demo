import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { get } from '../../app/api';
import Spinner from "../../components/Spinner";

export default function ReportsPage(props: { match: { params: { type: string } } }) {

    const type: string = props.match.params.type;
    const token = useSelector((state: RootState) => state.auth.token);

    const [reportInfo, setReportInfo] = useState<{ name: string, description: string, data: any[] } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        if (token) {
            get(`/staff/reports?type=${type}`, token)
                .then(data => {
                    setLoading(false);

                    if (data !== null) {
                        setReportInfo(data);
                    }
                })
        }

    }, [token, type]);

    if (loading || reportInfo === null) {
        return (<Spinner />);
    }


    const reportData = reportInfo!.data;
    const keys = (reportData.length > 0) ? Object.keys(reportData[0]) : ['#'];
    return (

        <div>
            <h2>Report &raquo; {reportInfo.name}</h2>

            <p className="mb-5">{reportInfo.description}</p>

            <div className="table-responsive-md">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        {keys.map(key => (<th key={key}>{key}</th>))}
                    </tr>
                    </thead>

                    <tbody>
                    {(reportData as any[]).map(row => (
                        <tr key={row.id || row.name}>
                            {keys.map(key => (<td key={key}>{row[key] || 0}</td>))}
                        </tr>
                    ))}
                    </tbody>

                    {(reportData.length === 0) ? <tr>
                        <td colSpan={keys.length} className="text-center font-weight-bold py-5">No rows found. Empty
                            result set.
                        </td>
                    </tr> : ''}
                </table>
            </div>
        </div>
    );
}
