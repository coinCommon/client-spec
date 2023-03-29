import React, {useContext, useEffect, useState} from 'react';
import Footer from "../components/HeaderAndFooter/Footer";
import classes from "../css/index.module.scss";
import {Context} from "../index";
import {DestroyBasket, fetchBasket, UpdateBasket} from "../http/basketAPI";
import {observer} from "mobx-react-lite";
import BasketArray from "../components/Basket/basketArray";
import OpenMessage from "../hocks/openMessage";
import RecommendedSlider from "../components/Recommended/recommendedSlider";
import {fetchDevicesRecommended} from "../http/deviceAPI";
import {sendEmail} from "../http/EmailAPI";
import Loader from "../components/Loaders/Loader";


const Basket = observer( () => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const {device} = useContext(Context)


    // // Для редактирования размеров
    // const [fetchOneBasket, setFetchOneBasket] = useState(false)
    // const [oneDevice, setOneDevice] = useState([])
    // const BasketOne = (id) => {
    //     fetchOneBasketDevices(id).then(data => setOneDevice(data)).finally(() => setFetchOneBasket(true))
    // }


    const [item, setItem] = useState(0)
    useEffect( () => {
        fetchDevicesRecommended().then(data => device.setRecommendedDevice(data.rows))
        fetchBasket(`${user.userID}`).then(data => {
            basket.setBaskets(data)
            document.title = `${user.name === '' ? 'Требуется авторизация' : 'Корзина пользователя ' + user.name} `
        })
    }, [item, user.userID])

    const destroyBasket = (e) => {
        DestroyBasket({id: e, basketId: `${user.userID}`}).then(data => {
            setItem(item + 1)
        }).finally(OpenMessage('Удалено из корзины','#98FB98'))
    }

    // const {user} = useContext(Context)
    // const editBasket = (e) => {
    //     UpdateBasket(
    //         {
    //             id: parseInt(e),
    //             quantity: size, // <---
    //             basketId: `${user.userID}`
    //         }).then(data => {
    //         // setBasketExit(0)
    //         alert('Обновлено')
    //     })
    // }
    const [loader, setLoader] = useState(false)

    const EmailMakeAnOrder = () => {
        let boolSend = false
        const statusCheck = basket.baskets.map(basket => basket.status === 'BASKET').filter(f => f === true ? boolSend = true : boolSend = false)

            const formData = new FormData()
            formData.append('text',
                `<div style="line-height: 2em; width: 100%;"> <b style='color: orange; width: 100%; font-size: 30px; background: #444444;'>СпецПромГрупп</b> 
                        <div>Сообщение с сайта <a style="color: #2db7f5" href="https://specprom-rf.ru">specprom-rf.ru</a></div> 
                        <div>Новый заказ от пользователя: <span> ${user.name} </span></div>
                        <div>Email: <span> ${user._email} </span> </div>
                        
                        ${basket.baskets.map(basket => basket.status === 'BASKET' ?
                            `<div style="line-height: 1.6; margin-top: 10px; display: grid; grid-template-columns: 3fr 1fr 1fr; grid-gap: 5px 10px">
                                <div style="font-size: 12px;"> 
                                    Название: ${basket.deviceName} <span style="font-weight: bold; font-size: 12px;"> Цена: ${basket.price} руб </span>
                                </div> 
                                
                                <div style="display: flex; align-items: center; padding: 5px; justify-content: space-between; background: #96dbfa"> 
                                    <div>${basket.quantity.map(q => `<div style="font-size: 10px;"> <span style="font-size: 12px;">  ${q.value} </span> </div>`).join('')}</div>
                                    <div>${basket.quantity.map(q => `<div style="font-size: 10px;"> <span style="font-size: 12px;">  ${q.quantity} </span> </div>`).join('')}</div>
                                </div>
                                <div style="font-weight: bold; font-size: 10px;">
                                    Итого: ${basket.quantity.reduce((a, b)=> a + parseInt(b.quantity) , 0) ? ' ' + basket.quantity.reduce((a, b)=> a + parseInt(b.quantity) , 0) * basket.price : 0} руб
                                </div>
                            </div>` : ''
                                ).join('')}
                        </div>`
            )

            if (boolSend) {
                setLoader(true)
                sendEmail(formData).then(data => {
                }).finally(() =>
                    UpdateBasket({
                        id: parseInt(basket.id),
                        basketId: `${user.userID}`,
                        status: 'SEND'}).then(data => console.log(data)
                    ).finally(() => {
                        setLoader(false)
                        setItem(item + 1)
                        OpenMessage('Заказ оформлен', 'lightgreen')
                    })
                )
            }
            else {
                OpenMessage('Вы уже оформляли данные товары', 'coral')
            }

    }




    return (
        <div>
            {loader ? <Loader/> : ''}
            <div className={classes.basket}>
                <div className={classes.container}>
                    <div className={classes.basket_back}>
                        <h2>Корзина</h2>
                        {basket.baskets.length !== 0
                            ?
                            <div className={classes.basket_grid}>
                                {basket.baskets.map(basket => basket.status === 'BASKET' ?
                                    <BasketArray destroyBasket={destroyBasket} key={basket.id} basket={basket} />
                                    :
                                    <div className={classes.basket_show_hide}>
                                        <BasketArray destroyBasket={destroyBasket} key={basket.id} basket={basket} />
                                    </div>
                                )}
                            </div>
                        :
                            <div className={classes.basket_there_are_no_products}>
                                <div className={classes.basket_none}>
                                    <p>Ваша корзина пуста.</p>
                                    Что бы добавить товар в корзину, нужно перейти в <span>каталог > </span>
                                    выбрать интересующую Вас <span> категорию > </span>
                                    нажать на кнопку <span> "Добавить в корзину" </span>
                                    <button
                                        className={classes.basket_none}
                                        type={"button"}
                                        disabled={true}>
                                        <i
                                            className="fa fa-shopping-basket" aria-hidden="true">
                                        </i>
                                    </button>
                                </div>
                                <div className={classes.basket_none}>
                                    <p>Ваша корзина пуста.</p>
                                    Что бы добавить товар в корзину, нужно перейти в <span>каталог > </span>
                                    выбрать интересующую Вас <span> категорию > </span>
                                    нажать на кнопку <span> "Добавить в корзину" </span>
                                    <button
                                        className={classes.basket_none}
                                        type={"button"}
                                        disabled={true}>
                                        <i
                                            className="fa fa-shopping-basket" aria-hidden="true">
                                        </i>
                                    </button>
                                </div>
                                <div className={classes.basket_none}>
                                    <p>Ваша корзина пуста.</p>
                                    Что бы добавить товар в корзину, нужно перейти в <span>каталог > </span>
                                    выбрать интересующую Вас <span> категорию > </span>
                                    нажать на кнопку <span> "Добавить в корзину" </span>
                                    <button
                                        className={classes.basket_none}
                                        type={"button"}
                                        disabled={true}>
                                        <i
                                            className="fa fa-shopping-basket" aria-hidden="true">
                                        </i>
                                    </button>
                                </div>
                                {/*<div className={classes.basket_there_are_no_products_img}>*/}
                                {/*    <img src={process.env.REACT_APP_API_URL + 'smile.png'}/>*/}
                                {/*</div>*/}
                            </div>
                        }
                        {basket.baskets.length !== 0 ? <button onClick={() => EmailMakeAnOrder()} className={classes.button_processing}>Сделать заказ</button> : ''}
                    </div>
                </div>
            </div>
            <RecommendedSlider device={device}/>
            <Footer/>
        </div>
    );
});

export default Basket;