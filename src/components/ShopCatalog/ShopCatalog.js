import React, {useContext, useEffect, useState} from 'react';
import classes from "../../css/index.module.scss";
import {DEVICE_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import SetBasketData from "../../hocks/setBasketData";
import {Context} from "../../index";
import {fetchBasket} from "../../http/basketAPI";



const ShopCatalog = ({loadingCard, device, setOneDevice, setBasketModalSize}) => {

    const {basket} = useContext(Context)
    const {user} = useContext(Context)
    useEffect( () => {
        fetchBasket(user.userID).then(data => basket.setBaskets(data))
    }, [])


    const navigate = useNavigate()
        return (
            <nav style={loadingCard ? {} : {opacity: 0, visibility: 'hidden', transform: 'scale(.9)'}} className={classes.catalog_grid_content}>
                <div onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
                    <div className={classes.catalog_grid_img}>
                        <img alt={"other"} src={process.env.REACT_APP_API_URL + device.img[0]}/>
                    </div>
                    <div className={classes.catalog_grid_rating}>
                        {[1, 2, 3, 4, 5].map(i => i <= device.rating ?
                            <i key={Date.now() * Math.random()} style={{color: '#ffee00', fontSize: '20px'}} className="fa fa-star" aria-hidden="true"></i>
                            :
                            <i key={Date.now() * Math.random()} style={{color: '#ffee00', fontSize: '20px'}} className="fa fa-star-o" aria-hidden="true"></i>
                        )}
                        <p data-name={"Рейтинг " + device.rating + " из 5"}>{device.rating}</p>
                    </div>

                    <div className={classes.catalog_grid_name}>
                        <a>
                            {device.name}
                        </a>
                    </div>
                </div>
                <div className={classes.catalog_grid_price}>
                    <a> {device.price} <span>P</span></a>
                    {basket.baskets.filter(basket => basket.deviceId === device.id).length !== 0 ?
                        <i style={{fontSize: '20px', color: 'orange'}}
                           className="fa fa-paper-plane-o" aria-hidden="true"
                           data-name='В корзине'
                        >
                        </i>
                        :
                        <button
                            style={device.typeSize.length === 0 ? {background: 'gray'} : {}}
                            disabled={device.typeSize.length === 0 ? true : ''}
                            type={"button"}
                            onClick={(e) => SetBasketData(JSON.parse(JSON.stringify([device])), device.id, setOneDevice, setBasketModalSize, basket)}
                            data-name={device.typeSize.length === 0 ? "Нет в наличии" : "Добавить в корзину"}>
                            <i
                                style={device.typeSize.length === 0 ? {color: '#fff'} : {}}
                                className="fa fa-shopping-basket" aria-hidden="true">
                            </i>
                        </button>
                    }
                </div>
                <div className={classes.catalog_grid_price}>
                    {device.typeSize.length === 0 ? <p> Нет в наличии </p> : <p> В наличии </p>}
                </div>
            </nav>
        );
};

export default ShopCatalog;

