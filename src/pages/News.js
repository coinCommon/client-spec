import React, {useContext, useEffect, useState} from 'react';
import Footer from "../components/HeaderAndFooter/Footer";
import classes from "../css/index.module.scss";
import NewsMap from "../components/NewsAndService/newsMap";
import {fetchNews} from "../http/servicesAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import Loader from "../components/Loaders/Loader";

const News = observer(() => {
    const {services} = useContext(Context)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        fetchNews().then(data => services.setNews(data.rows)).finally(() => setLoader(true))
        document.title = 'Спецпромгрупп / Новости'
    }, [])

    if (!loader) {
        return <Loader/>
    }


    return (
        <div>
            <section className={classes.news}>
                <div className={classes.container}>
                    <h2>Новости</h2>
                    <div className={classes.services_grid}>
                    {services._news.map(news =>
                        <NewsMap key={news.id} news={news}/>
                    )}

                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default News;