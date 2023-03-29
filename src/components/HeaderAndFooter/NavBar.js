import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Context} from "../../index";
import classes from "../../css/index.module.scss";
import {observer} from "mobx-react-lite";
import {BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, SERVICES_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";
import Search from "../search/search";
import {fetchDevices} from "../../http/deviceAPI";
import OpenMenu from "../../hocks/openMenu";
import HideAndShows from "../../hocks/hideAndShow";
import NavbarComponents from "./NavbarComponents";
import FeedBack from "../modals/feedBack";


const NavBar = observer( () => {
    const [searchDevice, setSearchDevice] = useState([])
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const {basket} = useContext(Context)


    const [scroll, setScroll] = useState(0);
    const handleScroll = () => {
        setScroll(window.scrollY)
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect( () => {
        fetchDevices().then(data => device.setDevices(data.rows))
        fetchDevices().then(data => setSearchDevice(data.rows))
    }, [])


    const navigate = useNavigate()
    const logOut = () => {
        basket.setBaskets([])
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAuth(false)
        localStorage.setItem('token', '')
        window.location.href = '/'
        // navigate('/')
    }


    const [activeSearch, setActiveSearch] = useState(false)
    const [searchCatalog, setSearchCatalog] = useState('')
    const [searchCatalogBlur, setSearchCatalogBlur] = useState(false)

    const CatalogSearch = useMemo( () => {
        const arrayDevice = searchDevice.filter(device => device.name.toLowerCase().includes(searchCatalog.toLowerCase()))
        if (searchCatalog === '' || searchCatalogBlur === true) {
            setActiveSearch(false)
            setSearchCatalog('')
            return []
        } else {
            setActiveSearch(true)
            setSearchCatalogBlur(false)
            return arrayDevice.slice(0,10) // поиск
        }
    }, [searchCatalog])

    const blurFocus = (e) => setTimeout( () => {
        if (e.currentTarget === e.target) {
        } else {
        }
        setActiveSearch(false)
        setSearchCatalog('')
    }, 300)


    const [refNavbarHeight, setRefNavbarHeight] = useState()
    const navbarRef = useRef()
    useEffect(() => {
        setRefNavbarHeight(navbarRef.current.clientHeight)
    }, [])


    const [activeMobileSearch, setActiveMobileSearch] = useState(0)
    useMemo(() => {
        if (activeMobileSearch === 1 && document.documentElement.clientWidth < 765) {
            window.document.body.style = 'overflow: hidden'
        } else {
            window.document.body.style = 'overflowY: scroll'
        }
    }, [activeMobileSearch])

    return (
        <div ref={navbarRef} id={'navbar'} className={classes.navbar}>
            <div className={classes.container}>
                <div className={classes.navbar_justify}>
                    <a className={classes.logo_img} onClick={() => {
                        navigate(SHOP_ROUTE)
                        window.scrollTo(0, 0)
                    }}> <img alt={'Спецпромгрупп'} src={require('../../img/logo.webp')}/> </a>

                    <nav className={classes.navbar_city}>
                        <a onClick={() => window.open('https://yandex.ru/maps/geo/saransk/53105244/?ll=45.175620%2C54.206400&z=12.08')}>Саранск <i className="fa fa-angle-down" aria-hidden="true"></i> </a>
                        <span> <a href={"tel:+79648532366"}>+7(964)853-23-66</a> </span>
                    </nav>

                    <nav className={classes.navbar_nav}>
                        <a onClick={() => {
                            navigate(NEWS_ROUTE)
                            window.scrollTo(0, 0)
                        }}> Новости </a>
                        <a onClick={() => {
                            navigate(SERVICES_ROUTE)
                            window.scrollTo(0, 0)
                        }}> Сервисы</a>
                        <a onClick={() => {
                            navigate(SERVICES_ROUTE)
                            window.scrollTo(0, 0)
                        }}>Доставка</a>
                        {/*<a onClick={() => navigate(SERVICES_ROUTE)}>Доставка</a>*/}
                        <a onClick={OpenMenu}>Каталог</a>
                    </nav>
                </div>
            </div>


            <div
                style={scroll > (document.documentElement.clientHeight + refNavbarHeight) - document.documentElement.clientHeight ?
                    {opacity: '0', visibility: 'hidden'} : {}} className={classes.navbar_noChange}
            >
                <div className={classes.container}>
                    <NavbarComponents
                        setSearchCatalogBlur={setSearchCatalogBlur}
                        blurFocus={blurFocus}
                        searchCatalog={searchCatalog}
                        setSearchCatalog={setSearchCatalog}
                        activeMobileSearch={activeMobileSearch}
                        setActiveMobileSearch={setActiveMobileSearch}
                        activeSearch={activeSearch}
                        CatalogSearch={CatalogSearch}
                        user={user}
                        logOut={logOut}
                        navigate={navigate}
                        basket={basket} />
                </div>
            </div>








        <div className={classes.navbar_change}
             style={scroll > (document.documentElement.clientHeight + refNavbarHeight) - document.documentElement.clientHeight ?
            {opacity: '1', visibility: 'visible', transform: 'translateY(0)'} : {}}
        >
            <div className={classes.container}>
                <NavbarComponents
                setSearchCatalogBlur={setSearchCatalogBlur}
                blurFocus={blurFocus}
                searchCatalog={searchCatalog}
                setSearchCatalog={setSearchCatalog}
                activeMobileSearch={activeMobileSearch}
                setActiveMobileSearch={setActiveMobileSearch}
                activeSearch={activeSearch}
                CatalogSearch={CatalogSearch}
                user={user}
                logOut={logOut}
                navigate={navigate}
                basket={basket} />
            </div>
        </div>



            {/*Поиск в мобильной версии на весь экран*/}
        <div style={activeMobileSearch === 1 ? {display: 'block'} : {}}
             className={classes.position_absolute_search_mobile_one}>
            <div className={classes.position_relative_search_mobile}>
                <div
                    className={classes.position_absolute_search_mobile}
                    style={activeMobileSearch === 1 ? {
                            opacity: '1',
                            visibility: 'visible'
                        }
                        :   {}}
                >
                    <div className={classes.container}>
                        <div className={classes.flex_space}>
                            <input
                                className={classes.search_mobile_input}
                                onFocus={e => setSearchCatalogBlur(false)}
                                onBlur={(e) => blurFocus(e)}
                                value={searchCatalog}
                                onChange={e => setSearchCatalog(e.target.value)}
                                type={"text"}
                                placeholder={"Поиск товаров"}
                            />
                            <button
                                onClick={() => HideAndShows(activeMobileSearch, setActiveMobileSearch)}
                                type={"button"}>
                                    <div>
                                        <svg style={{maxWidth: '20px'}} id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377.04 377.04">
                                            <line style={{stroke: '#767676', strokeWidth: '30px'}} x1="7.5" y1="369.54" x2="369.54" y2="7.5"/>
                                            <line style={{stroke: '#767676', strokeWidth: '30px'}} x1="7.5" y1="7.5" x2="369.54" y2="369.54"/>
                                        </svg>
                                    </div>
                            </button>
                        </div>
                        {CatalogSearch.length === 0 && searchCatalog !== '' ?
                            <a style={{color: '#A9A9A9'}}>Совпадений не найдено...</a>
                            :
                            CatalogSearch.map(CatalogSearch =>
                                <Search
                                    key={CatalogSearch.id}
                                    setSearchCatalog={setSearchCatalog}
                                    setSearchCatalogBlur={setSearchCatalogBlur}
                                    device={CatalogSearch}
                                    setActiveMobileSearch={setActiveMobileSearch}
                                />
                            )}
                    </div>
                </div>
            </div>
        </div>
            {/*Поиск в мобильной версии на весь экран*/}






            <div className={classes.navbar_fixed}>
                <div className={classes.container}>
                    <div className={classes.catalog_line}>

                        <div className={classes.catalog_line_menu}>
                            <div>
                                <button onClick={() => {
                                    navigate(SHOP_ROUTE)
                                    window.scrollTo(0, 0)
                                }}>
                                    <span className={classes.navbar__icon}>
                                        <i className="fa fa-home" aria-hidden="true"></i>
                                    </span>
                                    Главная
                                </button>
                            </div>
                            <div>
                                <button onClick={OpenMenu}>
                                    <span className={classes.navbar__icon}>
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </span>
                                    Каталог
                                </button>
                            </div>
                            <div style={{position: 'relative'}}>
                                <button onClick={() => {
                                    navigate(BASKET_ROUTE)
                                    window.scrollTo(0, 0)
                                }}>
                                    <span className={classes.navbar__icon}>
                                        <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                        {basket.baskets.length === 0 ? '' : <div className={classes.basket_item}> {basket.baskets.length} </div>}
                                    </span>
                                    Корзина
                                </button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    navigate(BASKET_ROUTE)
                                    window.scrollTo(0, 0)
                                }}>
                                    <span className={classes.navbar__icon}>
                                        <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                                    </span>
                                    Избранное
                                </button>
                            </div>

                            {user.isAuth ?
                                <div>
                                        <button onClick={() => logOut()}>
                                            {/*{user.name}*/}
                                            <span className={classes.navbar__icon}>
                                                <i className="fa fa-user" aria-hidden="true"></i>
                                            </span>
                                            Выйти
                                        </button>
                                </div>
                                :
                                <div>
                                    <button onClick={() => {
                                        navigate(LOGIN_ROUTE)
                                        window.scrollTo(0, 0)
                                    }}>
                                        <span className={classes.navbar__icon}>
                                            <i className="fa fa-user-o" aria-hidden="true"></i>
                                        </span>
                                        Войти
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

    </div>

    );
});

export default NavBar;