import React, {useContext, useEffect, useState} from 'react';
import Footer from "../components/HeaderAndFooter/Footer";
import classes from "../css/index.module.scss";
import ServicesMap from "../components/NewsAndService/servicesMap";
import {Context} from "../index";
import {fetchServices} from "../http/servicesAPI";
import NewsMap from "../components/NewsAndService/newsMap";
import {observer} from "mobx-react-lite";
import Loader from "../components/Loaders/Loader";

const Services = observer(() => {

    const {services} = useContext(Context)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        fetchServices().then(data => services.setServices(data.rows)).finally(() => setLoader(true))
        document.title = 'Спецпромгрупп / Сервисы'
    }, [])

    if (!loader) {
        return <Loader/>
    }

    return (
        <div>
            <section className={classes.services}>
                <div className={classes.container}>
                    <h2>Сервисы</h2>
                    <div className={classes.services_grid}>

                        {services._service.map(service =>
                            <ServicesMap key={service.id} service={service}/>
                        )}

                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default Services;