import React, {useContext, useEffect, useState} from 'react';
import classes from "../css/index.module.scss";
import Footer from "../components/HeaderAndFooter/Footer";
import {useNavigate, useParams} from "react-router-dom";
import {fetchBrands, fetchOneDevices, fetchTypes} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";
import CarImgDeviceImg from "../components/DevicePage/CarImgDeviceImg";
import HideAndShows from "../hocks/hideAndShow";
import SetBasketData from "../hocks/setBasketData";
import AddBasketSizeModals from "../components/modals/addBasketSizeModals";
import {Context} from "../index";
import {fetchBasket} from "../http/basketAPI";
import {CATALOG_ROUTE} from "../utils/consts";


const DevicePage = observer( () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const {slide} = useContext(Context)
    const [device, setDevice] = useState({info: []})
    const [typeName, setTypeName] = useState([])
    const [brandName, setBrandName] = useState([])
    const [load, setLoad] = useState(false)
    //
    useEffect( () => {
        setLoad(false) // при измненеии id останавливаем загрузку, (это от неправильного рендера карусели)
        fetchOneDevices(id).then(data => slide.setImgSlide(data.img))
        fetchTypes().then(data => setTypeName(data))
        fetchBrands().then(data => setBrandName(data))
        fetchOneDevices(id).then(data => {
            setDevice(data)
            document.title = data.name
        }).finally(() => {
            setLoad(true)
        }) // запускаем загрузку
    }, [id])
    //


    const {basket} = useContext(Context)
    const {user} = useContext(Context)
    useEffect( () => {
        fetchBasket(user.userID).then(data => basket.setBaskets(data))
    }, [])


    //
    const [item, setItem] = useState(1)
    const [sizeShow, setSizeShow] = useState(0) // Показать / скрыть
    const [oneDevice, setOneDevice] = useState([[]])
    const [basketModalSize, setBasketModalSize] = useState(false)
    //


    if (!load) {
        return false
    }







    return (
        <div>
        <div className={classes.device}>
            <div className={classes.container}>

                <div className={classes.device_title_type}>

                    <div className={classes.device_title_type_back}>
                        {typeName.map(type => type.id === parseInt(device.typeId) ?
                            <div key={type.id}>
                                <div className={classes.type}>
                                    {type.name}
                                </div>
                            </div>
                            :
                            ''
                        )}
                        {brandName.map(brand => brand.id === parseInt(device.brandId) ?
                            <div className={classes.brand_div_i} key={brand.id}>
                                <div className={classes.brand} onClick={async () => navigate(CATALOG_ROUTE + '/' + brand.typeID + '/' + brand.id)}>
                                    {brand.name}
                                </div>
                                <i style={{marginLeft: '10px'}} className="fa fa-angle-left" aria-hidden="true"></i>
                            </div>
                            :
                            ''
                        )}
                    </div>

                </div>



                <div className={classes.device_flex}>
                    <CarImgDeviceImg items={JSON.parse(JSON.stringify(slide.slides))} loading={load}/>
                    <div className={classes.device_flex_title}>
                            <h2>{device.name}</h2>
                        <div className={classes.device_title_rating}>
                            <div className={classes.device_title_star}>
                                {[1, 2, 3, 4, 5].map(i => i <= device.rating ?
                                    <i key={Date.now() * Math.random()} style={{color: '#ffee00', fontSize: '20px'}} className="fa fa-star" aria-hidden="true"></i>
                                    :
                                    <i key={Date.now() * Math.random()} style={{color: '#ffee00', fontSize: '20px'}} className="fa fa-star-o" aria-hidden="true"></i>
                                )}
                                <p>{device.rating}</p>


                            </div>
                            <div className={classes.device_title_cod}>
                                Код товара: {device.id}
                            </div>
                        </div>



                        <div className={classes.device_block_title}>
                            <a> {device.price} <span>P</span></a>
                            {basket.baskets.filter(basket => basket.deviceId === device.id).length !== 0 ?
                                <button
                                    style={{background: 'none', border: 'solid 1px orange', color: 'orange', cursor: 'default'}}
                                >
                                    <i style={{fontSize: '20px', color: 'orange'}}
                                       className="fa fa-paper-plane-o" aria-hidden="true"
                                       data-name='В корзине'
                                    >
                                    </i>
                                    В корзине
                                </button>
                                :
                                <button
                                    style={device.typeSize.length === 0 ? {background: 'gray'} : {}}
                                    disabled={device.typeSize.length === 0 ? true : ''}
                                    onClick={(e) => SetBasketData([device], device.id, setOneDevice, setBasketModalSize, basket)}
                                >
                                    <i className={device.typeSize.length === 0 ? "fa fa-clock-o" : "fa fa-shopping-basket"} aria-hidden="true"></i>
                                    {device.typeSize.length === 0 ? 'Нет в наличии' : 'В корзину' }
                                </button>
                            }


                            <div className={classes.show_and_hide_size}>
                                {device.typeSize.length === 0 ? ''
                                    :
                                    <div className={classes.show_and_hide_size_padding}
                                        onClick={() => HideAndShows(sizeShow, setSizeShow)}
                                    >
                                        {sizeShow === 1 ?
                                            'Скрыть размеры'
                                            :
                                            'Показать размеры'}
                                        <i style={{marginLeft: '10px'}} className=
                                            {sizeShow === 1 ?
                                                "fa fa-angle-up"
                                                :
                                                "fa fa-angle-down"}
                                           aria-hidden="true">

                                        </i>
                                    </div>
                                }

                                {sizeShow === 1 ?
                                    <div className={classes.device_size_remainder}>
                                        <div className={classes.device_size_remainder_flex}>
                                            <div style={{fontWeight: '600'}} className={classes.device_size}>Размер</div>
                                            <div style={{fontWeight: '600'}} className={classes.device_remainder}>В наличии</div>
                                        </div>
                                        {device.typeSize.map(i =>
                                            <div className={classes.device_size_remainder_flex} key={i.number}>
                                                <div className={classes.device_size}>{i.value}</div>
                                                <div className={classes.device_remainder}>{i.quantity}</div>
                                            </div>
                                        )}
                                    </div>
                                    :
                                    ''
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className={classes.device_specifications}>
                    <div className={classes.device_specifications_flex}>
                        <a
                            style={item === 1 ? {fontWeight: 'bold', textDecoration: 'overline'} : {fontWeight: ''}}
                            onClick={() => setItem(1)}
                        >
                            О товаре </a>
                        <a
                            style={item === 2 ? {fontWeight: 'bold', textDecoration: 'overline'} : {fontWeight: ''}}
                            onClick={() => setItem(2)}
                        >
                            Характеристики </a>
                        <a
                            style={item === 3 ? {fontWeight: 'bold', textDecoration: 'overline'} : {fontWeight: ''}}
                            onClick={() => setItem(3)}
                        >
                            Отзывы </a>
                    </div>

                    <div className={classes.device_specifications_content}>
                        {item === 1
                        ?
                            <div className={classes.device_specifications_content_flex}>
                                <h2> О товаре </h2>
                                <div className={classes.device_specifications_content_flex_div}>
                                    {device.description}
                                </div>
                            </div>
                            :
                            ''
                        }
                        {item === 2
                            ?
                            <div className={classes.device_specifications_content_flex}>
                                <h2>Характеристики</h2>
                                <div className={classes.device_specifications_content_flex_specifications}>
                                    <div className={classes.device_specifications_content_flex_specifications_flex}>
                                        {device.info.map((info, index) =>
                                        <div className={classes.info_flex} key={info.id} >
                                            <div className={classes.info_flex_title}>
                                                {info.title}
                                            </div>

                                            <div className={classes.device_specifications_content_dots}>
                                            </div>

                                            <span>
                                                {info.description}
                                            </span>
                                        </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                            :
                            ''
                        }
                        {item === 3
                            ?
                            <div className={classes.device_specifications_content_flex}>
                                <h2>Отзывы</h2>
                                <div className={classes.device_specifications_content_flex_div}>

                                    <button className={classes.button_otz} type={'button'}>
                                        Оставить отзыв
                                    </button>

                                    {/*<div className={classes.device_specifications_content_flex_div_otz}>*/}
                                    {/*    <div className={classes.flex_space}>*/}
                                    {/*        <h4>Алена</h4>*/}
                                    {/*        <div className={classes.device_title_star}>*/}
                                    {/*            {[1, 2, 3, 4, 5].map(i => i <= device.rating ?*/}
                                    {/*                <i key={Date.now() * Math.random()} style={{color: 'yellow', fontSize: '20px'}} className="fa fa-star" aria-hidden="true"></i>*/}
                                    {/*                :*/}
                                    {/*                <i key={Date.now() * Math.random()} style={{color: 'yellow', fontSize: '20px'}} className="fa fa-star-o" aria-hidden="true"></i>*/}
                                    {/*            )}*/}
                                    {/*            <p>{device.rating}</p>*/}
                                    {/*        </div>*/}
                                    {/*        <p>10 Марта</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={classes.description}>Хорошее качество, быстрая доставка. Все в порядке. Заказ дошел в целости и сохранности</div>*/}
                                    {/*</div>*/}

                                    {/*<div className={classes.device_specifications_content_flex_div_otz}>*/}
                                    {/*    <div className={classes.flex_space}>*/}
                                    {/*        <h4>Наталья</h4>*/}
                                    {/*        <div className={classes.device_title_star}>*/}
                                    {/*            {[1, 2, 3, 4, 5].map(i => i <= device.rating ?*/}
                                    {/*                <i key={Date.now() * Math.random()} style={{color: 'yellow', fontSize: '20px'}} className="fa fa-star" aria-hidden="true"></i>*/}
                                    {/*                :*/}
                                    {/*                <i key={Date.now() * Math.random()} style={{color: 'yellow', fontSize: '20px'}} className="fa fa-star-o" aria-hidden="true"></i>*/}
                                    {/*            )}*/}
                                    {/*            <p>{device.rating}</p>*/}
                                    {/*        </div>*/}
                                    {/*        <p>12 Апреля</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={classes.description}>Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Буквенных дорогу грамматики предложения подпоясал она, свой. Заглавных, власти. Свое прямо заголовок своих послушавшись по всей наш от всех залетают несколько свою щеке, агентство ее собрал взобравшись вскоре о! Которое, образ жизни своего послушавшись пустился точках, выйти, реторический продолжил силуэт вопрос приставка.</div>*/}
                                    {/*</div>*/}


                                    <div className={classes.device_specifications_content_flex_div_otz}>
                                        <div className={classes.flex_space}>
                                            <h4>Имя</h4>
                                            <div className={classes.device_title_star}>
                                                {[1, 2, 3, 4, 5].map(i => i <= device.rating ?
                                                    <i key={Date.now() * Math.random()} style={{color: 'yellow', fontSize: '20px'}} className="fa fa-star" aria-hidden="true"></i>
                                                    :
                                                    <i key={Date.now() * Math.random()} style={{color: 'yellow', fontSize: '20px'}} className="fa fa-star-o" aria-hidden="true"></i>
                                                )}
                                                <p>{device.rating}</p>
                                            </div>
                                            <p>12 Апреля</p>
                                        </div>
                                        <div className={classes.description}>
                                            Отзывы отсутствуют
                                        </div>
                                    </div>


                                </div>
                            </div>
                            :
                            ''
                        }
                    </div>
                </div>


            </div>
        </div>
            <AddBasketSizeModals oneDevice={oneDevice[0]} basketModalSize={basketModalSize} setBasketModalSize={setBasketModalSize}/>
    <Footer/>
</div>
    );
});

export default DevicePage;
