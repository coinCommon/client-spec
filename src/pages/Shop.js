import React, {useContext, useEffect, useState} from 'react';
import ShopCaroselBox from "../components/Shop/ShopCaroselBox";
import ShopPopularCategories from "../components/Shop/ShopPopularCategories";
import Footer from "../components/HeaderAndFooter/Footer";
import {Context} from "../index";
import {fetchBasket} from "../http/basketAPI";
import {fetchNews, fetchServices} from "../http/servicesAPI";
import RecommendedSlider from "../components/Recommended/recommendedSlider";
import {fetchDevicesRecommended, fetchPopularCat, fetchSlider} from "../http/deviceAPI";


const Shop = () => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const {services} = useContext(Context)
    const {device} = useContext(Context)

    const [load, setLoad] = useState(false)

    useEffect( () => {
        fetchBasket(`${user.userID}`).then(data => basket.setBaskets(data))
        fetchNews(1, 4).then(data => services.setNews(data.rows))
        fetchServices(1, 4).then(data => services.setServices(data.rows))
        fetchDevicesRecommended().then(data => device.setRecommendedDevice(data.rows))

        fetchPopularCat().then(data => services.setPopular(data))
        fetchSlider().then(data => services.setSlide(data)).finally(() => setLoad(true))
        document.title = 'Интернет-магазин / Спецпромгрупп / Спецодежда'
    }, [])

    if (!load) {
        return false
    }

    return (
        <div>
            <ShopCaroselBox services={services}/>
            <ShopPopularCategories services={services}/>
            <RecommendedSlider device={device}/>
            <Footer/>
        </div>
    );
};

export default Shop;