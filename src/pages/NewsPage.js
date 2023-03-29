import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneNews} from "../http/servicesAPI";
import classes from "../css/index.module.scss";
import Footer from "../components/HeaderAndFooter/Footer";
import {NEWS_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NewsPage = observer(() => {

    const {id} = useParams()
    const [news, setNews] = useState([])
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)


    useEffect(() => {
        fetchOneNews(id).then(data => {
            setNews(data)
            document.title = data.title
        }).finally(() => setLoad(true))
    }, [])


    if (!load) {
        return false
    }

    return (
        <section>
            <div className={classes.container}>
                <div className={classes.services_news_page}>
                    <div className={classes.flex_start}>
                        <p onClick={() => navigate(NEWS_ROUTE)}>Все новости</p>
                        <i style={{marginLeft: '10px', fontSize: '16px'}} className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>

                    <div className={classes.services_news_page_grid}>
                        <div className={classes.services_news_page_grid_left}>
                            <img alt={news.title} src={process.env.REACT_APP_API_URL + news.img}/>
                        </div>
                        {/*<div className={classes.none}>*/}

                        {/*</div>*/}
                        <div className={classes.services_news_page_grid_right}>
                            <div className={classes.title}>
                                {news.title}
                            </div>
                            <div className={classes.description}>
                                {news.description}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </section>
    );
});

export default NewsPage;