import React, {useContext, useEffect, useMemo, useState} from 'react';
import classes from "../../css/index.module.scss";
import {fetchOneBasketDevices, UpdateBasket} from "../../http/basketAPI";
import {Context} from "../../index";

const BasketModals = ({addBasket, setBasketExit, oneDevice}) => {

    // const [sizeQuantity, setSizeQuantity] = useState([])
    // console.log(sizeQuantity)
    // useEffect(() => {
    //     setSizeQuantity(oneDevice.quantity)
    // }, [])
    //
    // const [size, setSize] = useState([])
    //
    // const [hideShow, setHideShow] = useState(0)
    // const [hideShowCount, setHideShowCount] = useState(1)
    // const [mapAr, setMapArr] = useState([])
    // const [arrayReduce, setArrayReduce] = useState(1)
    //
    // const addSize = () => {
    //     setSize([...size, {size: '', quantity: '', number: Date.now()}])
    //     setHideShow(0)
    //     setHideShowCount(0)
    // }
    // const removeSize = (number) => {
    //     setSize(size.filter(i => i.number !== number))
    // }
    // const changeSize = (key, value, number) => {
    //     setSize(size.map(i => i.number === number ? {...i, [key]: value} : i))
    // }
    //
    //
    // useMemo( () => {
    //     setMapArr(size.map(i => i.quantity))
    // },[size])
    // useMemo( () => {
    //     setArrayReduce(mapAr.reduce((a, b) => parseInt(a)+parseInt(b), 0))
    // }, [mapAr])
    //
    //
    // const {user} = useContext(Context)
    // const editBasket = (e) => {
    //     UpdateBasket(
    //         {
    //             id: parseInt(e),
    //             quantity: size, // <---
    //             basketId: `${user.userID}`
    //         }).then(data => {
    //         setBasketExit(0)
    //         alert('Размеры обновлены!')
    //     })
    // }

    return (
        <div style={addBasket === 1 ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility: 'hidden'}}
             className={classes.modals_basket_absolute}
        >
            {/*<div className={classes.modals_basket_relative}>*/}
            {/*    <div onClick={setBasketExit} className={classes.modal_show}></div>*/}
            {/*    <div style={addBasket === 1 ? {transform: 'translateY(0)'} : {transform: 'translateY(-250px)'}}*/}
            {/*         className={classes.modal_size}*/}
            {/*    >*/}

            {/*        <div className={classes.basketArray_modals}>*/}
            {/*            <h3>{oneDevice.deviceName}</h3>*/}
            {/*            <a>Стоимость {oneDevice.price} р. </a>*/}
            {/*            <a>*/}
            {/*                Всего {!arrayReduce ? 0 : arrayReduce * oneDevice.price} р.*/}
            {/*            </a>*/}
            {/*        </div>*/}

            {/*        <div className={classes.modals_overflowY}>*/}


            {/*            {hideShowCount === 1 ?*/}
            {/*                <div>*/}
            {/*                    <p style={{fontSize: '10px', padding: 0}}>Текущие размеры</p>*/}
            {/*                    {sizeQuantity.map(j =>*/}
            {/*                        <div style={{height: '100%', opacity: 1, visibility: 'visible'}} className={classes.size_flex} key={j.number}>*/}
            {/*                            <div style={{margin: 0}} className={classes.size_flex}>*/}
            {/*                                <div>{j.size} - </div>*/}
            {/*                                <div style={{marginLeft: '10px'}}>{j.quantity}</div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    )}*/}
            {/*                </div>*/}
            {/*            : ''*/}
            {/*            }*/}



            {/*    {size.map(i =>*/}
            {/*        <div style={hideShow === 1 ? {height: 0, opacity: 0, visibility: 'hidden'} : {height: '100%', opacity: 1, visibility: 'visible'}} key={i.number} className={classes.size_flex}>*/}
            {/*            <select onChange={(e) => changeSize('size', e.target.value, i.number)} defaultValue={'def'} >*/}
            {/*                <option value={'def'} disabled>Выберите размер</option>*/}
            {/*                {oneDevice.typeSize.map(j =>*/}
            {/*                    <option value={j.value} key={j.value}>*/}
            {/*                        {j.value}*/}
            {/*                    </option>*/}
            {/*                )}*/}
            {/*            </select>*/}
            {/*            <input*/}
            {/*                type={'tel'}*/}
            {/*                value={i.quantity}*/}
            {/*                min="1"*/}
            {/*                max='999'*/}
            {/*                maxLength='3'*/}
            {/*                onChange={(e) =>  changeSize('quantity', e.target.value.replace(/\D/,''), i.number)}*/}
            {/*                placeholder={'Кол-во'}*/}
            {/*            />*/}
            {/*            <button onClick={() => removeSize(i.number)}>Убрать</button>*/}
            {/*        </div>*/}
            {/*    )}*/}


            {/*        </div>*/}
            {/*        <div className={classes.addPanelBottom}>*/}
            {/*            <div className={classes.addSize_a}>*/}
            {/*                <a onClick={addSize}>Добавить размер</a>*/}
            {/*                {hideShowCount === 1 ?*/}
            {/*                    <p style={{fontSize: '10px', padding: '10px 0', width: '80%'}}>Внимание! После добавления нового размера, предыдущие размеры удалятся</p>*/}
            {/*                    : ''*/}
            {/*                }*/}
            {/*            </div>*/}
            {/*            <div className={classes.saveSize}>*/}
            {/*                <button onClick={e => editBasket(oneDevice.id)}>Сохранить</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default BasketModals;