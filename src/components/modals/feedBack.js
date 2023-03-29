import React, {useMemo, useState} from 'react';
import classes from "../../css/index.module.scss";
import InputMask from 'react-input-mask';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {sendEmail} from "../../http/EmailAPI";
import OpenMessage from "../../hocks/openMessage";
import ValidateEmail from "../../hocks/validateEmail";
import Loader from "../Loaders/Loader";
import LoaderRelative from "../Loaders/LoaderRelative";

const FeedBack = ({bool, setBool}) => {

    const [loading, setLoading] = useState(true)

    const [topic, setTopic] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')


    const checkBorderTheme = () => {
        let inputBorder = document.querySelectorAll('.border')
        if (inputBorder[0].value === '') {
            inputBorder[0].style.borderColor = 'coral'
            OpenMessage('Выберите тему обращения', 'coral')
            return false
        }
        else {
            inputBorder[0].style.borderColor = 'rgb(223, 223, 225)'
        }
        if (inputBorder[1].value.replace(/\s/g, "").length < 20) {
            inputBorder[1].style.borderColor = 'coral'
            OpenMessage('Текст сообщения должен содержать не менее 20 символов', 'coral')
            return false
        }
        else {
            inputBorder[1].style.borderColor = 'rgb(223, 223, 225)'
        }
        if (!ValidateEmail(email)) {
            inputBorder[2].style.borderColor = 'coral'
            OpenMessage('Невалидный email', 'coral')
        }
        else {
            inputBorder[2].style.borderColor = 'rgb(223, 223, 225)'
        }
    }


    const SendEmail = () => {
        checkBorderTheme()

        // // Проверка номера телефона <--- Рабочая
        // let phoneVerify
        // const successPhone = [phone].map(m => m[4, 5, 6, 9, 10, 11, 13, 14, 16, 17] === '_' || m === '').filter(f => f === true ? phoneVerify = false : phoneVerify = true)
        if (topic === '' || message.replace(/\s/g, "").length < 20 || !ValidateEmail(email)) {
            return false
        }

        else {
            setLoading(false)
            const formData = new FormData()
            formData.append('text', `<div style="line-height: 2em; width: 100%;"> <b style='color: orange; width: 100%; font-size: 30px; background: #444444;'>СпецПромГрупп</b> <div>Сообщение с сайта <a style="color: #2db7f5" href="https://specprom-rf.ru">specprom-rf.ru</a> </div> <div>Пользователь желает: <span style="color: dodgerblue; font-weight: bold"> ${topic} </span></div>  <div style="line-height: 2em;">Сообщение: <span style="color: dodgerblue; font-weight: bold"> ${message} </span></div> <div style="line-height: 2em;">Email: <span style="color: lightcoral;"> ${email} </span></div> <div style="line-height: 2em;">Телефон: <span style="color: lightcoral;"> ${phone} </span></div> </div>`)
            sendEmail(formData).then(data => {
                OpenMessage('Ваше сообщение доставлено', 'lightgreen')
            }).finally(() => {
                setLoading(true)
                setBool(false)
                setTopic('')
                setMessage('')
                setEmail('')
                setPhone('')
                document.getElementById('label1').style.top = '5px'
                document.getElementById('label1').style.fontSize = '14px'
                document.getElementById('label2').style.top = '5px'
                document.getElementById('label2').style.fontSize = '14px'
                document.getElementById('label3').style.top = '5px'
                document.getElementById('label3').style.fontSize = '14px'
            })
        }

    }


    // Запрет прокрутки при открытии попап
    useMemo(() => {
        bool ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [bool])



    const labelPosition = (type, id, idDiv) => {
        const div = document.getElementById(idDiv)
        const label = document.getElementById(id)

        if (type === 'focus') {
            label.style.top = '-20px'
            label.style.fontSize = '12px'
            div.style.display = 'block'
            return false
        }
        if (type === 'blur') {
            if (id !== 'label1' && email === '') {
                label.style.top = '5px'
                label.style.fontSize = '14px'
            }
            setTimeout(() => {
                div.style.display = 'none'
            }, 300)
        }
    }
    const labelPosition2 = (type, id) => {
        const label = document.getElementById(id)
        if (type === 'focus') {
            label.style.top = '-20px'
            label.style.fontSize = '12px'
            return false
        }
        if (type === 'blur' && email === '') {
            label.style.top = '5px'
            label.style.fontSize = '14px'
        }
        if (type === 'blurPhone' && phone === '+7 (___)-___-__-__') {
            label.style.top = '5px'
            label.style.fontSize = '14px'
        }

    }

    const setState = (set, e, id) => {
        set(e)
        const clear = document.getElementById(id)
        if (e !== '') {
            clear.style.display = 'block'
        }
        else {
            clear.style.display = 'none'
        }
    }



    return (
        <section style={bool ? {opacity: '1', visibility: 'visible'}: {transition: '.5s'}} className={classes.feed_back}>

            <div className={classes.position_absolute}>
                <div className={classes.position_relative}>
                    {!loading ? <Loader/> : ''}
                    <div onClick={() => setBool(false)} className={classes.feed_back_close}></div>
                    <div style={bool ? {transform: 'translateY(0)'}: {transform: 'translateY(-999px)'}} className={classes.feed_back_content}>

                        <div onClick={() => setBool(false)} className={classes.feed_back_close_x}>
                            <FontAwesomeIcon fontSize={'20px'} icon={faXmark} />
                        </div>

                        <div className={classes.feed_back_padding}>

                            <div className={classes.flex_space}>
                                <div className={classes.feed_back_title}>Обратная связь</div>
                            </div>

                            <div className={classes.feed_back_grid}>
                                <div className={classes.feed_back_input}>
                                    <label id={'label1'}>Тема обращения</label>
                                    <input value={topic}
                                           // onChange={(e) => setTopic(e.target.value)}
                                           onFocus={(e) => labelPosition('focus', 'label1', 'div1')}
                                           onBlur={(e) => labelPosition('blur', 'label1', 'div1')}
                                           type={'text'}
                                           readOnly
                                           id={'inputTheme'}
                                           className={'border'}/>

                                    <div id={'div1'} className={classes.change_input_topic}>
                                        <div onClick={(e) => {
                                            setTopic(e.target.innerHTML)
                                        }} className={classes.background}>задать вопрос</div>
                                        <div onClick={(e) => {
                                            setTopic(e.target.innerHTML)
                                        }} className={classes.background}>внести предложение</div>
                                        <div onClick={(e) => {
                                            setTopic(e.target.innerHTML)
                                        }} className={classes.background}>оставить контактные данные</div>
                                        <div onClick={(e) => {
                                            setTopic(e.target.innerHTML)
                                        }} className={classes.background}>оставить коммерческое предложение</div>
                                    </div>
                                </div>

                                <div className={classes.feed_back_input}>
                                    <div className={classes.textarea_message}>
                                        <div>Сообщение до 1000 символов</div>
                                        <div className={classes.textarea_message_length}>{message.replace(/\s/g, "").length}</div>
                                    </div>
                                    <textarea
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value)
                                            checkBorderTheme()
                                        }}
                                        maxLength={1000}
                                        id={'textarea'}
                                        className={'border'}
                                    >

                                    </textarea>
                                </div>


                                <div className={classes.feed_back_input}>
                                    <label id={'label2'}>Email для ответа *</label>
                                    <div id={'clearInput'} onClick={() => {
                                        setEmail('')
                                        document.getElementById('inputEmail').focus()
                                        document.getElementById('clearInput').style.display = 'none'
                                    }} className={classes.input_clear}>
                                        <FontAwesomeIcon icon={faDeleteLeft}/>
                                    </div>
                                    <input value={email}
                                           onChange={(e) => setState(setEmail, e.target.value, 'clearInput')}
                                           onFocus={(e) => labelPosition2('focus', 'label2')}
                                           onBlur={(e) => labelPosition2('blur', 'label2')}
                                           type={'email'}
                                           maxLength={40}
                                           className={'border'}
                                           id={'inputEmail'}/>
                                </div>

                                <div className={classes.feed_back_input}>
                                    <label id={'label3'}>Телефон</label>
                                    <InputMask
                                        style={phone === '+7 (___)-___-__-__' ? {color: '#e1e1e1'} : {}}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        onFocus={(e) => labelPosition2('focus', 'label3')}
                                        onBlur={(e) => labelPosition2('blurPhone', 'label3')}
                                        mask="+7 (999)-999-99-99"
                                        id={'inputPhone'}
                                    />
                                </div>

                                <div className={classes.feed_back_input}>
                                    <button onClick={() => SendEmail()} type={'button'}>Отправить</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
};

export default FeedBack;