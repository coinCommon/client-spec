import React from 'react';
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import classes from "../../css/index.module.scss";

const Search = ({device, setSearchCatalogBlur, setSearchCatalog, setActiveMobileSearch})  => {
    const navigate = useNavigate()
    const returnSearchStyle = (e) => {
        setSearchCatalogBlur(true)
        setSearchCatalog('')
        navigate(DEVICE_ROUTE + '/' + e)
        setActiveMobileSearch(0)
    }


        return (
            <div onClick={(e) => returnSearchStyle(device.id)} className={classes.search_border}>
                <a className={classes.search_a}>
                    {device.name}
                </a>
                <div className={classes.search_div}>
                    {device.price} руб
                </div>
            </div>

        );
};

export default Search;