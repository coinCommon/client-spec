import React from 'react';
import classes from "../../css/index.module.scss";

const Loader = () => {
    return (
        <div style={{width: '100%', height: '100%', position: 'fixed', transition: '0s', background: '#fff', zIndex: '99999', top: 0, left: 0}}>
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className={classes.loader}></div>
            </div>
        </div>
    );
};

export default Loader;