import React, {useEffect, useRef, useState} from 'react';
import classes from "../../css/index.module.scss";
import OpenMenu from "../../hocks/openMenu";
import {useNavigate} from "react-router-dom";
import {AGREEMENT_ROUTE, BASKET_ROUTE, NEWS_ROUTE, POLICE_ROUTE, SERVICES_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import FeedBack from "../modals/feedBack";
import {sendEmail} from "../../http/EmailAPI";
import OpenMessage from "../../hocks/openMessage";
import ValidateEmail from "../../hocks/validateEmail";
import Loader from "../Loaders/Loader";
import LoaderRelative from "../Loaders/LoaderRelative";


const Footer = () => {
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const [blurTarget, setBlurTarget] = useState(false)

    const closeMessage = () => {
        document.getElementById('messages').style.opacity = '0'
        document.getElementById('messages').style.visibility = 'hidden'
        document.getElementById('messages').style.transform = 'translateY(150px)'
    }
    const focusMessage = () => {
        document.getElementById('messages_text').innerText = 'Закрыть'
    }

    const [height, setHeight] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        // setHeight(ref.current.clientHeight)
    },[])

    const [bool, setBool] = useState(false)


    const [footEmail, setFootEmail] = useState('')

    const SendEmail = () => {
        if (!ValidateEmail(footEmail)) {
            OpenMessage('Невалидный email', 'coral')
            document.getElementById('input_privacy').style.borderColor = 'coral'
        }
        else {
            setLoading(false)
            const formData = new FormData()
            formData.append('text', `<div style="line-height: 2em; width: 100%;"> <b style='color: orange; width: 100%; font-size: 30px; background: #444444;'>СпецПромГрупп</b> <div>Сообщение с сайта <a style="color: #2db7f5" href="https://specprom-rf.ru">specprom-rf.ru</a> </div> <div>Пользователь направил Вам email для связи <span> ${footEmail} </span></div></div>`)
            sendEmail(formData).then(data => {
            }).finally(() => {
                setLoading(true)
                setFootEmail('')
                OpenMessage('Ваше сообщение доставлено', 'lightgreen')
                document.getElementById('input_privacy').style.borderColor = '#444'
            })
        }
    }

    // if (!loading) {
    //     return <Loader/>
    // }

    return (
        <section className={classes.footer_section}>
            <div className={classes.container}>

            <div className={classes.footer_form}>
                <form>
                    <label>Введите свой email и мы с Вами свяжемся</label>
                    {!loading ? <LoaderRelative/> :
                        <input
                            value={footEmail}
                            onChange={(e) => {
                                setFootEmail(e.target.value)
                            }}
                            onBlur={e => setBlurTarget(false)}
                            onFocus={e => setBlurTarget(true)}
                            id="input_privacy"
                            type="email"
                            name="email"
                            placeholder="Ваш email"
                        />
                    }
                    <button type={'button'} onClick={() => SendEmail()} id="send_privacy"> Отправить </button>
                </form>

                <div ref={ref} style={blurTarget ? {height: `${height + 20}px`, visibility: 'visible', opacity: '1', transform: 'translateY(0)'}
                    : {}}
                     className={classes.user_agreement}>
                    Нажимая «Отправить», вы соглашаетесь с
                    <a onClick={() => {
                        navigate(POLICE_ROUTE)
                        window.scrollTo(0, 0)
                    }}> Политикой обработки персональных данных</a> и
                    <a onClick={() => {
                        navigate(AGREEMENT_ROUTE)
                        window.scrollTo(0, 0)
                    }}> Пользовательским соглашением об использовании сайта.</a>
                </div>

            </div>

            <div className={classes.footer_blocks}>
                <div className={classes.footer_contact}>
                    <h2>
                        Контакты
                    </h2>
                    <span><a href={"tel:+79648532366"}>+7(964)853-23-66</a></span>
                    <a onClick={() => window.open('https://yandex.ru/maps/geo/saransk/53105244/?ll=45.175620%2C54.206400&z=12.08')}>Саранск <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
                    <button onClick={() => window.open('https://yandex.ru/maps/42/saransk/house/ulitsa_kirova_64/YEwYdwBpS0EHQFtufX12cXVrYg==/?ll=45.180957%2C54.171276&z=17')} className={classes.button_map}>
                        На карте
                        <i className="fa fa-location-arrow"></i>
                    </button>
                    <button onClick={() => setBool(true)}>
                        Задать вопрос
                        <i className="fa fa-comment"></i>
                    </button>
                </div>
                <div className={classes.footer_blocks_a}>
                    <h3>Навигация</h3>
                    <a onClick={OpenMenu}> Каталог </a>
                    <a onClick={() => {
                        navigate(NEWS_ROUTE)
                        window.scrollTo(0, 0)
                    }}> Новости </a>
                    <a onClick={() => {
                        navigate(SERVICES_ROUTE)
                        window.scrollTo(0, 0)
                    }}> Сервисы </a>
                    <a onClick={() => {
                        navigate(BASKET_ROUTE)
                        window.scrollTo(0, 0)
                    }}> Корзина </a>
                    {/*<a style={{color: '#d1d1d1'}}> Доставка </a>*/}
                    {/*<a style={{color: '#d1d1d1'}}> Оплата </a>*/}
                </div>
                <div className={classes.footer_blocks_a}>
                    <h3>Клиентам</h3>
                    <a style={{color: '#d1d1d1'}}>Акции</a>
                    <a style={{color: '#d1d1d1'}}>Документы</a>
                    <a style={{color: '#d1d1d1'}}>Популярное</a>
                    <a onClick={() => setBool(true)}>Обратная связь</a>
                </div>
                <i className="fa-brands fa-viber"></i>
                <div className={classes.footer_blocks_messenger}>
                    <i onClick={() => window.open('https://api.whatsapp.com/send/?phone=79375144534&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C+%D1%83+%D0%BC%D0%B5%D0%BD%D1%8F+%D0%B5%D1%81%D1%82%D1%8C+%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81')} data-name='WhatsApp' className="fa fa-whatsapp"></i>
                    <i onClick={() => window.open('https://t.me/+79375144534')} data-name='Telegram' className="fa fa-telegram"></i>
                    <i data-name='Youtube' className="fa fa-youtube"></i>
                    <i data-name='VK' className="fa fa-vk"></i>
                    {/*<i className="fa fa-facebook"></i>*/}
                    {/*<i className="fa fa-twitter"></i>*/}
                </div>
            </div>

            <div className={classes.footer_line}>
                <div onClick={() => {
                    navigate(SHOP_ROUTE)
                    window.scrollTo(0, 0)
                }}>
                    <img src={require('../../img/logo.webp')}/>
                </div>
                <div>
                    <a onClick={() => {
                        navigate(POLICE_ROUTE)
                        window.scrollTo(0, 0)
                    }}>Политика обработки персональных данных</a>
                </div>
            </div>

            </div>

            <div onClick={() => closeMessage()} id={'messages'} className={classes.open_message_fixed}>
                <div className={classes.open_message}>
                    <div onMouseEnter={() => focusMessage()}  id={'messages_text'} className={classes.open_message_text}>
                    </div>
                </div>
            </div>

            <FeedBack bool={bool} setBool={setBool}/>

        </section>
    );
};

export default Footer;