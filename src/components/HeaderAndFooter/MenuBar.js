import React, {useContext, useEffect, useState} from 'react';
import classes from "../../css/index.module.scss";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import {CATALOG_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";


const MenuBar = observer(() => {
    const {device} = useContext(Context)
    const navigate = useNavigate()



    const [typeBr, setTypeBr] = useState(device.selectedType.id);
    useEffect(() => {
        fetchDevices().then(data => device.setDevices(data.rows))
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        setTypeBr(device.selectedType.id)
    }, [device.selectedType.id])

    useEffect( () => {
        const rawType =  sessionStorage.getItem('typeBr')
            setTypeBr(parseInt(rawType))
    },[])
    useEffect(() => {
        sessionStorage.setItem('typeBr', JSON.stringify(typeBr))
    }, [typeBr])



    function buttonMenuClose() {
        const menuBar = document.getElementById('menuBar');
        const menuBarContent = document.getElementById('menuBarContent');
        menuBar.style.opacity = '0';
        setTimeout(function () {
            menuBar.style.visibility = 'hidden';
        }, 200)
        menuBarContent.style.transform = 'translateX(-1500px)';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.overflow = 'unset';
    }

    return (
        <section id={"menuBar"} className={classes.menu_bar}>

            <div onClick={buttonMenuClose}
                 style={{
                     position: 'absolute',
                     top: 0,
                     right: 0,
                     width: '100%',
                     height: '100%'
            }}>
            </div>


            <div id={"menuBarContent"} className={classes.menu_bar_content}>


                <div className={classes.menu_bar_grid}>
                    <div className={classes.menu_bar_left}>
                        <a className={classes.logo_img} href="/client/src/pages">
                            <img alt={"logo"} src={require('../../img/logo.webp')}/>
                        </a>
                        <h3>Каталог</h3>
                        <nav className={classes.menu_bar_left_nav}>
                            <ul>
                                {device.types.map(type =>
                                    <li key={type.id}>
                                        <img key={type.id} alt={"icon"} src={process.env.REACT_APP_API_URL + type.icon}/>
                                        <a
                                            style={type.id === typeBr ? {fontWeight: 'bold'} : {}}
                                            onClick={() => device.setSelectedType(type)}
                                        >
                                            {type.name}
                                            <i
                                                style={type.id === typeBr ? {display: 'inline-block'} : {display: 'none'}}
                                                className="fa fa-angle-right" aria-hidden="true"
                                            >
                                            </i>
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>

                    <div className={classes.menu_bar_right}>
                        <nav>
                            <ul>
                                {device.types.map(type =>
                                    <p key={type.id}>
                                        {type.id === typeBr ? type.name : false}
                                    </p>
                                )}


                                {device.brands.filter(brand => brand.typeID === typeBr).map(brand =>
                                    <div key={brand.id} onClick={async () => navigate(CATALOG_ROUTE + '/' + brand.typeID + '/' + brand.id)}>
                                        <div onClick={buttonMenuClose}>
                                            <a onClick={() => device.setSelectedBrand(brand)}>
                                                {brand.name}
                                            </a>
                                        </div>
                                    </div>
                                )}


                            </ul>
                        </nav>


                        <div className={classes.menu_close} onClick={buttonMenuClose}>
                            <svg className={classes.svg} id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377.04 377.04">
                                <line className={classes.cls1} x1="7.5" y1="369.54" x2="369.54" y2="7.5"/>
                                <line className={classes.cls2} x1="7.5" y1="7.5" x2="369.54" y2="369.54"/>
                            </svg>
                        </div>
                    </div>
                </div>







                <div className={classes.menu_bar_grid_mobile}>
                    <div className={classes.menu_bar_mobile}>

                        <h3>Каталог</h3>
                        <nav className={classes.menu_bar_mobile_nav}>
                            <ul>
                                {device.types.map(type =>
                                    <li key={type.id}>
                                        <img key={type.id} alt={"icon"} src={process.env.REACT_APP_API_URL + type.icon}/>
                                        <a style={type.id === typeBr ? {color: 'orange'} : {}}
                                            onClick={() => device.setSelectedType(type)}>

                                            {type.name}

                                            <i style={type.id === typeBr ? {display: 'inline-block'} : {display: 'none'}}
                                                className="fa fa-angle-right" aria-hidden="true">
                                            </i>
                                        </a>

                                    <div className={classes.brand_mobile_padding}>
                                        {device.brands.filter(brand => brand.typeID ===  type.id).map(brand =>
                                            <div className={classes.brand_mobile} key={brand.id} onClick={async () => navigate(CATALOG_ROUTE + '/' + brand.typeID + '/' + brand.id)}>
                                                {/*<div className={classes.brand_mobile_div} onClick={buttonMenuClose}>*/}
                                                {/*    <a style={brand.typeID ===  typeBr ? {display: 'block', opacity: '1', visibility: 'visible'} : {opacity: '0', visibility: 'hidden', display: 'none'}} onClick={() => device.setSelectedBrand(brand)}>*/}
                                                {/*        {brand.name}*/}
                                                {/*    </a>*/}
                                                {/*</div>*/}
                                                {brand.typeID ===  typeBr ?
                                                        <div className={classes.brand_mobile_div} onClick={buttonMenuClose}>
                                                            <div style={{display: 'block', opacity: '1', visibility: 'visible'}} onClick={() => device.setSelectedBrand(brand)}>
                                                                {brand.name}
                                                            </div>
                                                        </div>
                                                        :
                                                        ''
                                                }

                                            </div>
                                        )}
                                    </div>

                                    </li>
                                )}

                            </ul>
                        </nav>

                            <div className={classes.menu_close} onClick={buttonMenuClose}>
                                <svg className={classes.svg} id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377.04 377.04">
                                    <line className={classes.cls1} x1="7.5" y1="369.54" x2="369.54" y2="7.5"/>
                                    <line className={classes.cls2} x1="7.5" y1="7.5" x2="369.54" y2="369.54"/>
                                </svg>
                            </div>

                    </div>
                </div>












            </div>
        </section>
    );
});

export default MenuBar;