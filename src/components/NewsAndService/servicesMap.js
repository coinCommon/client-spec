import React from 'react';
import {useNavigate} from "react-router-dom";
import {SERVICES_ROUTE} from "../../utils/consts";
import classes from "../../css/index.module.scss";
import dateFormat from "dateformat";

const ServicesMap = ({service}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(SERVICES_ROUTE + '/' + service.id)} className={classes.NewsMap}>
            <div className={classes.NewsMap_date}>
                {dateFormat(service.createdAt, "dd mmmm")}
            </div>
            <div className={classes.NewsMap_title}>
                {service.title}
            </div>
            <div className={classes.NewsMap_img}>
                <img alt={'News'} src={process.env.REACT_APP_API_URL + '/' + service.img}/>
            </div>
            <div className={classes.NewsMap_description}>
                {service.description}
            </div>
        </div>
    );
};

export default ServicesMap;