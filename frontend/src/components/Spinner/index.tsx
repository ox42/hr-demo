import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (
    <div className={classes.verticalCenter}>
        <div className={"spinner-border text-secondary " + classes.largeSpinner} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
)

export default Spinner;
