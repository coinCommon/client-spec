import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import classes from "../css/index.module.scss";
import ShopCatalog from "../components/ShopCatalog/ShopCatalog";
import Footer from "../components/HeaderAndFooter/Footer";
import {fetchBrands, fetchDevicesCatalog, fetchTypes} from "../http/deviceAPI";
import {useParams} from "react-router-dom";
import AddBasketSizeModals from "../components/modals/addBasketSizeModals";
import RangeCatalog from "../components/ShopCatalog/rangeCatalog";
import HideAndShows from "../hocks/hideAndShow";



const Catalog = observer( () => {
    const {typeId} = useParams()
    const {brandId} = useParams()
    const {device} = useContext(Context)

    const [loadingCard, setLoadingCard] = useState(false)
    const [isPostTotal, setIsPostTotal] = useState(true) // total


    const PageCount = (count) => {
        if (device.limit > isPostTotal) {

        } else {
            device.setLimit(device.limit + count)
        }
    }




    const [loading, setLoading] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    const InitialPrice = () => {
        setMinPrice(Math.min.apply(null, device.devices.map(m => m.price)))
        setMaxPrice(Math.max.apply(null, device.devices.map(m => m.price)))
        setMinValue(Math.min.apply(null, device.devices.map(m => m.price)))
        setMaxValue(Math.max.apply(null, device.devices.map(m => m.price)))
            setLoading(true)
    }


    // Сортировка
    const [selectedSort, setSelectedSort] = useState('name')
    const CatalogSort = (sort) => {
        setSelectedSort(sort)
        if (sort === 'name') {
            device.setDevices([...device.devices].sort((a, b) => a[sort].localeCompare(b[sort])))
        }
        if (sort === 'rating') {
            device.setDevices([...device.devices].sort((a, b) => b[sort] - a[sort]))
        }
        if (sort === 'price') {
            device.setDevices([...device.devices].sort((a, b) => a[sort] - b[sort]))
        }
        setLoadingCard(false) // При обновлении данных скрываем карточки
        setTimeout(() => {
            setLoadingCard(true) // При обновлении данных скрываем карточки
        }, 300)
    }
    // Сортировка


    useEffect( () => {
        setLoadingCard(false) // При обновлении данных скрываем карточки
        fetchTypes().then(data => {
            device.setTypes(data)
        })
        fetchBrands().then(data => {
            device.setBrands(data)
            document.title = data.map(data => data.id === parseInt(brandId) ? data.name : '').join('')
        })
        fetchDevicesCatalog(typeId, brandId, '', '').then(data => setIsPostTotal(data.rows.length))
            fetchDevicesCatalog(typeId, brandId, device.limit, '').then(data => {
                device.setDevices([...data.rows].sort((a, b) => a['name'].localeCompare(b['name'])))
                // setIsPostTotal(data.count)
            }).finally(() => {
                InitialPrice()
                setSelectedSort('') // При обновлении данных обнуляем сортировку

                setTimeout(() => {
                    setLoadingCard(true) // показываем карточки
                }, 300)
            })
    },[device.limit, typeId, brandId])

    useEffect(() => { // при изменеии useParams обнуляем счетчики
        device.setLimit(16)
    }, [typeId, brandId])




    const [hide, setHide] = useState(0)

    const [oneDevice, setOneDevice] = useState([[]])
    const [basketModalSize, setBasketModalSize] = useState(false)

    if (!loading) {
        return false
    }

    return (
        <div>
            <section className={classes.catalog_section}>
                <div className={classes.container}>
                    <div className={classes.catalog_top_link}>

                        {device.types.map(type =>
                            <a key={type.id}>
                                {type.id === parseInt(typeId) ? type.name : ''}
                            </a>
                        )}

                        <h3>
                            {device.brands.map(brand =>
                                <div key={brand.id}>
                                    {brand.id === parseInt(brandId) ? brand.name : ''}

                                </div>
                            )}
                            {device.devices.map(device =>
                                <div key={device.id}>
                                    {/*{device.id === parseInt(brandId) ? device.name : ''}*/}
                                    {}
                                </div>
                            )}
                        </h3>

                    </div>

                    <div className={classes.catalog_sort}>
                        <p style={selectedSort === 'rating' ? {fontWeight: 'bold', textDecoration: 'overline'} : {}}
                            onClick={() => CatalogSort('rating')}>
                            по популярности
                        </p>
                        <p style={selectedSort === 'price' ? {fontWeight: 'bold', textDecoration: 'overline'} : {}}
                            onClick={() => CatalogSort('price')}>
                            по цене
                        </p>
                        <p style={selectedSort === 'name' ? {fontWeight: 'bold', textDecoration: 'overline'} : {}}
                            onClick={() => CatalogSort('name')}>
                            по названию
                        </p>
                    </div>


                    <div className={classes.catalog_flex}>
                        <div className={classes.catalog_areas}>
                            <div className={classes.catalog_grid_scroll}>
                                <div className={classes.catalog_grid}>
                                    {device.devices.filter(device => device.price >= minValue && device.price <= maxValue).map(device => device).length === 0 ? 'Нет результатов' : ''}
                                    {device.devices.filter(device => device.price >= minValue && device.price <= maxValue).map(device =>
                                        <ShopCatalog loadingCard={loadingCard} device={device} setOneDevice={setOneDevice} setBasketModalSize={setBasketModalSize} key={device.id}/>
                                    )}
                                </div>
                            </div>
                            <div className={classes.catalog_flex_button}>
                                <button
                                    style={device.limit >= isPostTotal ? {color: '#a9a9a9', borderColor: '#a9a9a9'} : {}}
                                    disabled={device.limit >= isPostTotal ? true : ''}
                                    className={classes.catalog_button}
                                    type={'button'}
                                    onClick={() => PageCount(8)}
                                >
                                    Показать еще
                                </button>
                            </div>
                        </div>

                        {/*{JSON.parse(JSON.stringify(device.devices.info)).map((info, index) =>*/}
                        {/*    <div className={classes.info_flex} key={info.id} >*/}
                        {/*        {info.title}*/}
                        {/*        <span>*/}
                        {/*            {info.description}*/}
                        {/*        </span>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        <div className={classes.catalog_grid_property}>
                            <div className={classes.catalog_grid_property_fixed}>
                                <div className={classes.property_mobile_flex}>
                                    <h3 onClick={() => HideAndShows(hide, setHide)}
                                        style={hide === 1 ? {fontWeight: 'bold'} : {}}
                                    >
                                        Фильтры
                                        <i className={hide === 1 ? "fa fa-angle-up" : "fa fa-angle-down"} aria-hidden="true"></i>
                                    </h3>
                                    <div className={classes.property_mobile_absolute} style={hide === 1 ? {opacity: '1', visibility: 'visible', height: '100%'} : {}}>
                                        <p>Цена</p>
                                        <RangeCatalog minPrice={minPrice} maxPrice={maxPrice} minValue={minValue} setMinValue={setMinValue} maxValue={maxValue} setMaxValue={setMaxValue}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className={classes.catalog_flex_button}>*/}
                    {/*    <button className={classes.catalog_button} type={'button'} onClick={() => PageCount(4)}>Показать еще</button>*/}
                    {/*</div>*/}

                </div>
            </section>
            {/*{isPostLoading ? <LoaderRelative/> : ''}*/}
            {/*<div style={{width: '100%', height: '1px', background: 'none'}}></div>*/}
            <AddBasketSizeModals oneDevice={oneDevice[0]} basketModalSize={basketModalSize} setBasketModalSize={setBasketModalSize}/>
            <Footer/>
        </div>

    );

});

export default Catalog;