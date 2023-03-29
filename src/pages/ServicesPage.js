import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneServices} from "../http/servicesAPI";
import classes from "../css/index.module.scss";
import {SERVICES_ROUTE} from "../utils/consts";
import Footer from "../components/HeaderAndFooter/Footer";

const ServicesPage = () => {
    const {id} = useParams()
    const [services, setServices] = useState([])
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetchOneServices(id).then(data => {
            setServices(data)
            document.title = data.title
        }).finally(() =>setLoad(true))
    }, [])

    if (!load) {
        return false
    }

    return (
        <section>
            <div className={classes.container}>
                <div className={classes.services_news_page}>
                    <div className={classes.flex_start}>
                        <p onClick={() => navigate(SERVICES_ROUTE)}>Все сервисы</p>
                        <i style={{marginLeft: '10px', fontSize: '16px'}} className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>

                    <div className={classes.services_news_page_grid}>
                        <div className={classes.services_news_page_grid_left}>
                            <img alt={services.title} src={process.env.REACT_APP_API_URL + '/' + services.img}/>
                        </div>

                        {/*<div className={classes.none}>*/}

                        {/*</div>*/}

                        <div className={classes.services_news_page_grid_right}>
                            <div className={classes.title}>
                                {services.title}
                            </div>
                            <div className={classes.description}>
                                {services.description}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </section>
    );
};

export default ServicesPage;