import React from 'react';
import classes from "../../css/index.module.scss";

const LoaderRelative = () => {
    return (
        <div style={{width: '100%', height: 'auto', position: 'relative', background: '#fff', padding: '10px 0 70px 0'}}>
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className={classes.loader_relative}></div>
            </div>
        </div>
    );
};

export default LoaderRelative;