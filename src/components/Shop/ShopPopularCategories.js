import React from 'react';
import classes from "../../css/index.module.scss";
import dateFormat from "dateformat";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {CATALOG_ROUTE, NEWS_ROUTE, SERVICES_ROUTE} from "../../utils/consts";

const ShopPopularCategories = observer(({services}) => {
    const navigate = useNavigate()
    return (
        <section>
            <div className={classes.container}>
                <div className={classes.popular_cat_title}>
                    <h1>Популярные категории</h1>
                </div>
                <div className={classes.popular_cat_grid}>

                    {services._popular.map(popular =>
                        <div onClick={() => navigate(CATALOG_ROUTE + '/' + popular.typeID + '/' + popular.brandID)} key={popular.id} className={classes.popular_cat_flex}>
                            <div className={classes.popular_content}>
                                <img alt={'Иконка'} src={process.env.REACT_APP_API_URL + '/' + popular.img}/>
                                <a> {popular.name} </a>
                            </div>
                        </div>
                    )}

                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_svarchik.webp')}/>*/}
                    {/*       <a href={'/'}> Спецодежда для сварщиков </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_zimn_obuv.webp')}/>*/}
                    {/*        <a href={'/'}> Зимняя обувь </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_vlagozaschita.webp')}/>*/}
                    {/*        <a href={'/'}> Влагозащитная одежда </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_zimn_specodezda.webp')}/>*/}
                    {/*        <a href={'/'}> Зимняя спецодежда </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_letn_obuv.webp')}/>*/}
                    {/*        <a href={'/'}> Летняя обувь </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_aptechki.webp')}/>*/}
                    {/*        <a href={'/'}> Аптечки </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_sredstva_gigieni.webp')}/>*/}
                    {/*        <a href={'/'}> Средства гигиены </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_odnorazovay_odezda.webp')}/>*/}
                    {/*        <a href={'/'}> Одноразовая одежда </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_zaschita_golovi.webp')}/>*/}
                    {/*        <a href={'/'}> Защита головы </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className={classes.popular_cat_flex}>*/}
                    {/*    <div className={classes.popular_content}>*/}
                    {/*        <img alt={'Иконка'} src={require('../../img/icon_ochcki.webp')}/>*/}
                    {/*        <a href={'/'}> Защита органов зрения </a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                </div>




                <div className={classes.news_grid}>

                    <div className={classes.news_flex}>
                        <div>Новости</div>
                        <div><a href={'/news'}> Все новости <i className="fa fa-angle-right" aria-hidden="true"></i> </a></div>
                    </div>

                    {services._news.map(news =>
                        <div onClick={() => navigate(NEWS_ROUTE + '/' + news.id)} key={news.id} className={classes.news_flex_content}>
                            <div> <p> {dateFormat(news.createdAt, "dd mmmm")} </p> </div>
                            <div> <a> {news.title} </a> </div>
                            <div>
                                <span> {news.description} </span>
                            </div>
                        </div>
                    )}

                </div>








                <div className={classes.services_grid}>

                    <div className={classes.services_flex}>
                        <div>Другие услуги</div>
                        <div><a href={'/services'}> Все услуги <i className="fa fa-angle-right" aria-hidden="true"></i> </a></div>
                    </div>

                    {services._service.map(service =>
                        <div onClick={() => navigate(SERVICES_ROUTE + '/' + service.id)} key={service.id} className={classes.news_flex_content}>
                            <div> <p> {dateFormat(service.createdAt, "dd mmmm")} </p> </div>
                            <div> <a> {service.title} </a> </div>
                            <div>
                                <span> {service.description} </span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>

    );
});

export default ShopPopularCategories;