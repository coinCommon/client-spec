import React, {useContext, useEffect, useState} from "react";
import classes from "../css/index.module.scss";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Footer from "../components/HeaderAndFooter/Footer";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import HideAndShows from "../hocks/hideAndShow";

const Auth = observer( () => {
    useEffect(() => {
        document.title = 'Авторизация / Регистрация'
    }, [])
    const {user} = useContext(Context)
    // const {basket} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const [eyeSlash, setEyeSlash] = useState(0)
    const string = "abcdefghijklmnopqrstuvwxyz";
    const numeric = "0123456789";
    const length = 10;
    const [password, setPassword] = useState("");

    const generatePassword = (e) => {
        const formValid = +length > 0;
        if (!formValid) {
            return;
        }
        let character = "";
        let password = "";
        while (password.length < length) {
            const entity1 = Math.ceil(string.length * Math.random() * Math.random());
            const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());

            let hold = string.charAt(entity1);
            hold = password.length % 3 === 1 ? hold.toUpperCase() : hold;
            character += hold;
            character += numeric.charAt(entity2);
            password = character;
        }
        password = password
            .split("")
            .sort(() => {
                return 0.5 - Math.random();
            })
            .join("");
        setPassword(password.substr(0, length));
    };


    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password, name)
            }
            user.setEmail(data.email)
            user.setUser(user)
            user.setIsAuth(true)
            user.setUserID(data.id)
            user.setName(data.name)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            {/*<section className={classes.section_auth} style={{height: window.innerHeight - 250}}>*/}
        <section className={classes.section_auth}>
            <div className={classes.container}>
                <div className={classes.auth_flex}>
                    <form>
                        {isLogin ?
                            <div className={classes.auth_label}>
                                <NavLink style={{background: '#FFF', color: '#333'}} to={LOGIN_ROUTE}>Вход</NavLink> &nbsp; / &nbsp;
                                <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div>
                            :
                            <div className={classes.auth_label}>
                                <NavLink to={LOGIN_ROUTE}>Вход</NavLink> &nbsp; / &nbsp;
                                <NavLink style={{background: '#FFF', color: '#333'}} to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div>
                        }
                        {isLogin ?
                            <div>
                                <div className={classes.auth_input}>
                                    <input
                                        type={"email"}
                                        name={"email"}
                                        placeholder={"Email"}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={classes.auth_input}>
                                    <input
                                        type={"password"}
                                        name={"password"}
                                        placeholder={"Пароль"}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            :
                            <div>
                                <div className={classes.auth_input}>
                                    <input
                                    type={"name"}
                                    name={"name"}
                                    placeholder={"Имя"}
                                    maxLength={25}
                                    value={name}
                                    // value={name.replace(/[^А-Яа-я]/, ' ')}
                                    onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className={classes.auth_input}>
                                    <input
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"Email"}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={classes.auth_input}>
                                    <input
                                    type={eyeSlash === 0 ? "password" : "text"}
                                    name={"password"}
                                    placeholder={"Пароль"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                    <div
                                        onClick={() => HideAndShows(eyeSlash, setEyeSlash)}
                                        className={classes.auth_show_password}
                                    >
                                        <i className={eyeSlash === 0 ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        }


                        {isLogin ?
                            <div className={classes.auth_flex_item}>
                            <div className={classes.auth_help}>Нет аккаунта?</div> &nbsp; <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            </div>
                            :
                            <div className={classes.auth_flex_item}><button type={'button'} onClick={() => generatePassword()}> Сгенерировать пароль </button> </div>
                        }
                            <div className={classes.auth_input}>
                                <button type={'button'} onClick={click}> {isLogin ? "Войти" : "Зарегистрироваться" }</button>
                            </div>
                    </form>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
    )
});

export default Auth;