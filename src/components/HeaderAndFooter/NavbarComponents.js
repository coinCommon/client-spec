import React, {useState} from 'react';
import classes from "../../css/index.module.scss";
import OpenMenu from "../../hocks/openMenu";
import HideAndShows from "../../hocks/hideAndShow";
import Search from "../search/search";
import {BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";

const NavbarComponents = ({
                              setSearchCatalogBlur,
                              blurFocus,
                              searchCatalog,
                              setSearchCatalog,
                              activeMobileSearch,
                              setActiveMobileSearch,
                              activeSearch,
                              CatalogSearch,
                              user,
                              logOut,
                              navigate,
                              basket
}) => {
    const [count, setCount] = useState(0)
    return (
        <div className={classes.catalog_line}>
            <div className={classes.catalog_line_button}>
                <button onClick={OpenMenu}>
                            <span className={classes.navbar__icon__button}>
                                <i className="fa fa-th-list" aria-hidden="true"></i>
                            </span>
                </button>
            </div>

            <a className={classes.logo_img} onClick={() => {
                navigate(SHOP_ROUTE)
                window.scrollTo(0, 0)
            }}> <img alt={'Спецпромгрупп'} src={require('../../img/logo.webp')}/></a>

            <div className={classes.catalog_line_search}>
                <form>
                    <input
                        onFocus={e => setSearchCatalogBlur(false)}
                        onBlur={(e) => blurFocus(e)}
                        value={searchCatalog}
                        onChange={e => setSearchCatalog(e.target.value)}
                        type={"text"}
                        placeholder={"Поиск товаров"}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            if (document.documentElement.clientWidth < 765) {
                                HideAndShows(activeMobileSearch, setActiveMobileSearch)
                            }
                            else {
                                console.log(document.documentElement.clientWidth + ' Search')
                            }
                        }}
                        type={"button"}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>

                    <div className={classes.search_display_none}
                         style={activeSearch ? {
                                 height: 'auto',
                                 border: 'solid 1px #444'
                             }
                             :
                             {}}
                    >
                        {CatalogSearch.length === 0 && searchCatalog !== '' ?
                            <div style={{color: '#A9A9A9', padding: '10px 5px'}}>Совпадений не найдено...</div>
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
                </form>
            </div>


            <div className={classes.catalog_line_menu}>
                {user.isAuth ?
                    <div>
                        <button>
                                <span className={classes.navbar__icon}>
                                    <i className="fa fa-user-o" aria-hidden="true"></i>
                                </span>
                            {user.name}
                        </button>
                        <button onClick={() => logOut()}>
                                <span className={classes.navbar__icon}>
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </span>
                            Выйти
                        </button>
                    </div>
                    :
                    <button onClick={() => {
                        navigate(LOGIN_ROUTE)
                        window.scrollTo(0, 0)
                    }}>
                                <span className={classes.navbar__icon}>
                                    <i className="fa fa-user-o" aria-hidden="true"></i>
                                </span>
                        Войти
                    </button>
                }

                <button onClick={() => {
                    navigate(BASKET_ROUTE)
                    window.scrollTo(0, 0)
                }}>
                            <span className={classes.navbar__icon}>
                                <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                            </span>
                    Избранное
                </button>
                <button onClick={() => {
                    navigate(BASKET_ROUTE)
                    window.scrollTo(0, 0)
                }}>
                            <span className={classes.navbar__icon}>
                                <i className="fa fa-shopping-basket" aria-hidden="true">
                                </i>
                                {basket.baskets.length === 0 ? '' : <div className={classes.basket_item}> {basket.baskets.length} </div>}
                                {/*{basket.baskets.map(m => m.status === 'BASKET' ? setCount(count+1) : '')}*/}
                            </span>
                    Корзина
                </button>
            </div>
        </div>
    );
};

export default NavbarComponents;