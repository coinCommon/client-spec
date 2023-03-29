import React, {useState} from 'react';
import classes from "../../css/index.module.scss";
import HideAndShows from "../../hocks/hideAndShow";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";

const BasketArray = ({basket, destroyBasket}) => {

    const navigate = useNavigate()

    const reduceQuantity = basket.quantity.reduce((a, b)=> a + parseInt(b.quantity) , 0)
    const [show, setShow] = useState(0)

    return (
            <div style={basket.status === 'SEND' ? {background: '#ecfdf4'} : {}} className={classes.basket_array} >

                <div
                    className={classes.basket_img}
                    onClick={() => navigate(DEVICE_ROUTE + '/' + basket.deviceId)}
                >
                    <img src={process.env.REACT_APP_API_URL + basket.img}/>
                </div>

                <div style={{display: 'block', justifyContent: 'space-between', width: '100%', overflow: 'hidden'}}>
                    <h3
                        className={classes.basket_name}
                        onClick={() => navigate(DEVICE_ROUTE + '/' + basket.deviceId)}
                    >
                        {basket.deviceName}
                    </h3>
                    {/*{basket.status === 'SEND' ? <div className={classes.basket_status} data-name="Заявка отправлена"><i className='fa fa-check' aria-hidden='true'></i></div> : ''}*/}
                </div>

                <div className={classes.basket_flex}>
                    <div className={classes.basket_price}>
                        <h3 className={classes.basket_price}>
                            {basket.price} руб
                        </h3>
                    </div>
                    {basket.status === 'SEND' ?
                        <div className={classes.basket_status} data-name="Заявка отправлена">
                            <i className='fa fa-check' aria-hidden='true'></i>
                        </div> :
                        ''}
                </div>


                    <button
                        onClick={() => HideAndShows(show, setShow)}
                        className={classes.basket_size_i}>
                        Размеры
                        <i className=
                               {show === 1 ?
                                   "fa fa-angle-up"
                                   :
                                   "fa fa-angle-down"}
                           aria-hidden="true">
                        </i>
                    </button>

                {/*<button*/}
                {/*    onClick={() => HideAndShows(show, setShow)}*/}
                {/*    className={classes.basket_size_i}>*/}
                {/*    Размеры*/}
                {/*    <i className=*/}
                {/*           {show === 1 ?*/}
                {/*               "fa fa-angle-up"*/}
                {/*               :*/}
                {/*               "fa fa-angle-down"}*/}
                {/*       aria-hidden="true">*/}
                {/*    </i>*/}
                {/*</button>*/}

                <div style={{position: 'relative', width: '100%'}}>

                    <div
                        className={classes.basket_size_size_quan}
                        style={show === 1 ? {opacity: 1, visibility: 'visible', transform: 'translateY(0)', width: '100%'} : {}}
                    >
                        <div style={{padding: '5px', width: '100%'}}>
                            <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'space-between'}}>
                                <div style={{marginRight: '10px', transition: '.3s'}}>
                                    {basket.quantity.map(q => <div style={{padding: '3px 0', fontSize: '12px'}} key={parseInt(q.value) * q.number}> <span style={{fontSize: '12px'}}>  {q.value} </span> </div>)}
                                </div>
                                <div>
                                    {basket.quantity.map(q => <div style={{padding: '3px 0', fontSize: '12px'}} key={q.quantity * q.number}> <span style={{fontSize: '12px'}}>  {q.quantity} </span> </div>)}
                                </div>
                            </div>
                            {/*<div className={classes.basket_size_size_quan_button}>*/}
                            {/*    <button value={basket.id} onClick={(e) => BasketOne(e.target.value)}>Редактировать</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>


                </div>



                <div className={classes.basket_button_clear}>
                    <button onClick={e => destroyBasket(basket.id)}>
                        Убрать
                        {/*<i className="fa fa-times" aria-hidden="true"></i>*/}
                    </button>
                </div>

                <div className={classes.basket_size_price}>
                    Всего:
                    <span>
                            {reduceQuantity ? ' ' + reduceQuantity * basket.price : 0} руб
                        </span>
                </div>

            </div>
    );
};

export default BasketArray;