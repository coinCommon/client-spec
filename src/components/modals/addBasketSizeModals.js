import React, {useContext, useMemo, useRef, useState} from 'react';
import classes from "../../css/index.module.scss";
import {Context} from "../../index";
import AddBasket from "../../hocks/addBasket";
import {fetchBasket} from "../../http/basketAPI";

const AddBasketSizeModals = ({oneDevice, basketModalSize, setBasketModalSize}) => {

    const {basket} = useContext(Context)
    const {user} = useContext(Context)
    const [itemAll, setItemAll] = useState(0)
    useMemo( () => {
        fetchBasket(user.userID).then(data => basket.setBaskets(data))
    }, [itemAll])

    const [hideShow, setHideShow] = useState(0)
    const [mapAr, setMapArr] = useState([])
    const [arrayReduce, setArrayReduce] = useState(1)
    const [size, setSize] = useState([{value: '', quantity: 1, number: Date.now()}])


    // const array1 = [1, 2, 3, 4, 5] // Размеры в наличии
    // const array2 = [1] // Размеры, которые добавляются, если в нем есть что то из array1, оно не будет показываться
    // console.log(array1.filter(e => !~array2.indexOf(e)))

    //
    useMemo(() => {
        setSize([{value: '', quantity: 1, number: Date.now()}])
    }, [basketModalSize])
    //

    //
    const [errorText, setErrorText] = useState('')
    const addSize = () => {
        if (size.length === oneDevice.typeSize.length) {
            setErrorText('Достигнут максимум')
        }
        else {
            setSize([...size, {value: '', quantity: 1, number: Date.now()}])
            setHideShow(0)
            setErrorText('')
        }
    }
    const removeSize = (number) => {
        setSize(size.filter(i => i.number !== number))
        setErrorText('')
    }



    const changeSize = (key, value, number, maxCount, quan) => {
        if (key === 'quantity' && value < 1) {

        }
        else if (key === 'quantity' && value > maxCount) {

        }
        else if (key === 'value') {
            setSize(size.map(i => i.number === number ? {...i, [key] : value, quantity: 1} : i))
        } else {
            setSize(size.map(i => i.number === number ? {...i, [key]: key === 'quantity' ? parseInt(value) : value} : i))
        }
    }
    //



    useMemo( () => {
        setMapArr(size.map(i => i.quantity))
    },[size])
    useMemo( () => {
        setArrayReduce(mapAr.reduce((a, b) => parseInt(a)+parseInt(b), 0))
    }, [mapAr])
    //

    // Запрет прокрутки при открытии попап
    useMemo(() => {
        basketModalSize ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [basketModalSize])


    return (
        <div style={basketModalSize ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility: 'hidden'}} className={classes.modals_basket_absolute}>
            <div className={classes.modals_basket_relative}>
                <div onClick={() => setBasketModalSize(false)} className={classes.modal_show}></div>

                <div style={basketModalSize ? {transform: 'translateY(0)'} : {transform: 'translateY(-250px)'}} className={classes.modal_size}>

                    <div onClick={() => setBasketModalSize(false)} className={classes.modal_arrow_show}>
                        <svg style={{maxWidth: '20px'}} id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377.04 377.04">
                            <line style={{stroke: '#767676', strokeWidth: '30px'}} x1="7.5" y1="369.54" x2="369.54" y2="7.5"/>
                            <line style={{stroke: '#767676', strokeWidth: '30px'}} x1="7.5" y1="7.5" x2="369.54" y2="369.54"/>
                        </svg>
                    </div>


                    <div className={classes.basketArray_modals}>
                        <h3>{oneDevice.name}</h3>
                        <a>Стоимость {oneDevice.price} р. </a>
                        <a>
                            Всего {!arrayReduce ? 0 : arrayReduce * oneDevice.price} р.
                        </a>
                    </div>

                    <div className={classes.modals_overflowY}>

                        {/*{basketModalSize ?*/}
                        {/*    <div>*/}
                        {/*        <p style={{fontSize: '10px', padding: 0}}>Размеры в наличии</p>*/}
                        {/*        <div className={classes.size_grid}>*/}
                        {/*        {oneDevice.typeSize.map(j =>*/}
                        {/*            <div key={j.number} style={{height: '100%', opacity: 1, visibility: 'visible'}} className={classes.size_flex}>*/}
                        {/*                <div style={{margin: 0}} className={classes.size_flex}>*/}
                        {/*                    <div className={classes.size_font_size}>{j.value} - </div>*/}
                        {/*                    <div className={classes.size_font_size} style={{marginLeft: '10px'}}>{j.quantity}</div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        )}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    : ''*/}
                        {/*}*/}

                        {basketModalSize ?
                            size.map(i =>
                                <div style={hideShow === 1 ? {height: 0, opacity: 0, visibility: 'hidden'} : {height: '100%', opacity: 1, visibility: 'visible'}} key={i.number} className={classes.size_flex}>

                                    {size.length > 1 ?
                                    <button className={classes.size_flex_button_remove} onClick={() => removeSize(i.number)}>Убрать</button>
                                        : ''}

                                    <select onChange={(e) => changeSize('value', e.target.value, i.number, oneDevice.typeSize.filter(e => e.value === i.value).map(g => g.quantity), i.quantity)} defaultValue={'def'} >
                                        <option value={'def'} disabled>Выберите размер</option>
                                        {oneDevice.typeSize.map(j =>
                                            <option value={j.value} key={j.value}>
                                                {j.value}
                                            </option>
                                        )}
                                    </select>

                                    {/*Удаление из массива повторяюзихся значений*/}
                                    {/*<select onChange={(e) => changeSize('value', e.target.value, i.number)} defaultValue={'def'} >*/}
                                    {/*    <option value={'def'} disabled>Выберите размер</option>*/}
                                    {/*    {oneDevice.typeSize.map(s => s.value).filter(f => !~size.map(i => i.value).indexOf(f)).map(i =>*/}
                                    {/*        <option value={i} key={i}>*/}
                                    {/*            {i}*/}
                                    {/*        </option>*/}
                                    {/*    )}*/}
                                    {/*</select>*/}

                                        <button
                                            style={i.value === '' || i.value === 'def' ? {display: 'none'} : {display: 'block'}}
                                            className={classes.button_next_prev} onClick={(e) =>  changeSize('quantity', (i.quantity - 1), i.number, oneDevice.typeSize.filter(e => e.value === i.value).map(g => g.quantity))}
                                        >
                                            -
                                        </button>

                                        <input
                                            style={i.value === '' || i.value === 'def' ? {display: 'none'} : {display: 'block'}}
                                            type={'tel'}
                                            value={i.quantity}
                                            min="1"
                                            maxLength='3'
                                            onChange={(e) =>  changeSize('quantity', e.target.value.replace(/\D/,''), i.number, parseInt(oneDevice.typeSize.filter(e => e.value === i.value).map(g => g.quantity)))}
                                            placeholder={'Кол-во'}
                                        />

                                        <button
                                            style={i.value === '' || i.value === 'def' ? {display: 'none'} : {display: 'block'}}
                                            className={classes.button_next_prev} onClick={(e) =>  changeSize('quantity', i.quantity+1, i.number, oneDevice.typeSize.filter(e => e.value === i.value).map(g => g.quantity))}
                                        >
                                            +
                                        </button>
                                </div>
                            )
                            : ''
                        }

                    </div>

                    <div className={classes.addPanelBottom}>
                        <div className={classes.addSize_a}>
                            <a onClick={addSize}>Добавить размер</a>
                        </div>
                        {errorText !== '' ? <div style={{color: "gray", fontSize: '12px'}}> {errorText}</div> : ''}
                        <div className={classes.saveSize}>
                            <button onClick={e => AddBasket(size, oneDevice.price, oneDevice.id, oneDevice.name, oneDevice.typeId, user, itemAll, setItemAll, setBasketModalSize, oneDevice.img[0])}>Добавить в корзину</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AddBasketSizeModals;