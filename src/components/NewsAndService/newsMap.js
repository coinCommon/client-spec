import React, {useEffect} from 'react';
import dateFormat from 'dateformat';
import classes from "../../css/index.module.scss";
import {useNavigate} from "react-router-dom";
import {NEWS_ROUTE} from "../../utils/consts";

const NewsMap = ({news}) => {

    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(NEWS_ROUTE + '/' + news.id)} className={classes.NewsMap}>
            <div className={classes.NewsMap_date}>
                {dateFormat(news.createdAt, "dd mmmm")}
            </div>
            <div className={classes.NewsMap_title}>
                {news.title}
            </div>
            <div className={classes.NewsMap_img}>
                <img alt={'News'} src={process.env.REACT_APP_API_URL + '/' + news.img}/>
            </div>
            <div className={classes.NewsMap_description}>
                {news.description}
            </div>
        </div>
    );
};

export default NewsMap;