import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import classes from "../css/index.module.scss";
import AdminModalsCreateProduct from "../components/modals/adminModalsCreateProduct";
import {
    deleteOneBrands,
    deleteOneDevices, deleteOnePopular, deleteOneSlider, deleteOneTypes,
    fetchBrands,
    fetchDevices, fetchDevicesRecommended,
    fetchPopularCat, fetchSlider,
    fetchTypes
} from "../http/deviceAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AdminDataDevice from "../components/Admin/adminDataDevice";
import {deleteOneUser, fetchUser} from "../http/userAPI";
import AdminDataUser from "../components/Admin/adminDataUser";
import AdminModalsCreateTypeAndBrand from "../components/modals/adminModalsCreateTypeAndBrand";
import AdminDataType from "../components/Admin/adminDataType";
import AdminDataBrand from "../components/Admin/adminDataBrand";
import AdminModalsEditProduct from "../components/modals/adminModalsEditProduct";
import AdminDataNews from "../components/Admin/adminDataNews";
import AdminDataService from "../components/Admin/adminDataService";
import AdminModalsCreateNewsAndServices from "../components/modals/adminModalsCreateNewsAndServices";
import {
    deleteOneNews,
    deleteOneServices,
    fetchNews,
    fetchServices
} from "../http/servicesAPI";
import HideAndShows from "../hocks/hideAndShow";
import AdminDataSlider from "../components/Admin/adminDataSlider";
import AdminDataPopular from "../components/Admin/adminDataPopular";
import AdminModalsCreateSlideAndPopular from "../components/modals/adminModalsCreateSlideAndPopular";
import EditNews from "../components/modals/EditNews";
import EditServices from "../components/modals/EditServices";
import EditSlider from "../components/modals/EditSlider";
import EditPopular from "../components/modals/EditPopular";
import AdminDataUserBasket from "../components/Admin/adminDataUserBasket";
import {fetchBasket} from "../http/basketAPI";


const Admin = observer(() => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const {services} = useContext(Context)

    const lastElement = useRef()
    const refObserver = useRef()
    const [counter, setCounter] = useState(1);

    const [counterInt, setCounterInt] = useState(0)
    const [recommend, setRecommend] = useState([])


    // Для редактирования
    const [counterEdit, setCounterEdit] = useState([{type: 0, brand: 0, device: 0, user: 0, news: 0, services: 0, slide: 0, popular: 0, basket: 0}])
    const [targetEdit, setTargetEdit] = useState([{type: false, brand: false, device: false, user: false, news: false, service: false, slide: false, popular: false, basket: false}])
    // Для редактирования
    useEffect( () => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchUser().then(data => user.setUser(data))

        fetchNews().then(data => services.setNews(data.rows))
        fetchServices().then(data => services.setServices(data.rows))

        fetchSlider().then(data => services.setSlide(data))
        fetchPopularCat().then(data => services.setPopular(data))

        fetchDevicesRecommended().then(data => {
            setRecommend(data.rows.map(m => m.deviceId))
        })
        document.title = 'Админ-панель СпецПромГрупп'
    }, [counter, counterInt, counterEdit])



    const [basketId, setBasketId] = useState(0)
    const [basketUser, setBasketUser] = useState([])
    useEffect(() => {
        fetchBasket(basketId).then(data => setBasketUser(data))
    }, [basketId, counterInt])






    // Удаление
    const functionDeleteAll = (api, id) => {
        if (id === 0) {
            alert(id + ' Непредвиденная ошибка!')
        }
        else {
            let conf = window.confirm('Данные нельзя восстановить. Вы действительно желате удалить данные?')
            if (conf) {
                    api(id).then(data => {
                        setCounterInt(counterInt + 1)
                    })
            }
            else {
                alert('Отменено пользователем')
            }
        }
    }
    // Удаление

    // Удаление товара из корзины пользователя
    const functionDelete = (api, id, userId) => {
        console.log(id, userId)
        if (id === 0) {
            alert(id + ' Непредвиденная ошибка!')
        }
        else {
            let conf = window.confirm('Данные нельзя восстановить. Вы действительно желате удалить данные?')
            if (conf) {
                if (userId === '') {
                    api(id).then(data => {
                        setCounterInt(counterInt + 1)
                    })
                }
                else {
                    api({id: id, basketId: userId}).then(data => {
                        setCounterInt(counterInt + 1)
                    })
                }
            }
            else {
                alert('Отменено пользователем')
            }
        }
    }
    // Удаление товара из корзины пользователя


    // Редактирование
    const [data, setData] = useState([])
     const functionEdit = (api, id, what) => {
        if (id === 0) {console.log(id)}
        else {
            api(id).then(data => setData(data)).finally(() => setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, [what] : true} : m)))
            setCounterEdit(counterEdit.map(m => m.length !== 0 ? {...m, [what] : id} : m))
        }
    }
    // Редактирование




        // Добавление элементов при скролле
    const [isPostLoading, setIsPostLoading] = useState(true)
    const [isPostLimit, setIsPostLimit] = useState(true)
    const [isPostTotal, setIsPostTotal] = useState(true)
    useEffect( () => {
        if(isPostLoading) return;
        if(observer.current) observer.current.disconnect()
        let callback = function (entries, refObserver) {
            if(entries[0].isIntersecting && device.limit <= isPostTotal) {
                device.setLimit(device.limit + 6)
                setIsPostLimit(device.limit)
            }
        };
        refObserver.current = new IntersectionObserver(callback)
        refObserver.current.observe(lastElement.current)
    }, [isPostLoading])

    useEffect( () => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            setIsPostTotal(data.count)
            setFiltersDevices(JSON.parse(JSON.stringify(device.devices)))
        }).finally(() => setIsPostLoading(false))
    }, [isPostLimit, device.selectedType, device.selectedBrand, counter, counterInt]); // counterEdit Обновление при редактировании
    // Добавление элементов при скролле

    // Сортировака по типам
    const [filtersDevices, setFiltersDevices] = useState(JSON.parse(JSON.stringify(device.devices)))
    const getSortedDevice = (e) => {
        if (e !== 'undefined') {
            const filterDevices = device.devices.filter(device => device.typeId === parseInt(e))
            setFiltersDevices(JSON.parse(JSON.stringify(filterDevices)))
        }
        else {
            fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
                setFiltersDevices(JSON.parse(JSON.stringify(device.devices)))
            })
        }
    }
    // Сортировака по типам

    // Поиск по имени
    const [filtersName, setFiltersName] = useState('')
    const filteredDeviceName = useMemo( () => {
        return filtersDevices.filter(filtersDevices => filtersDevices.name.toLowerCase().includes(filtersName.toLowerCase()))
    }, [filtersName, filtersDevices])
    // Поиск по имени

    // Запрет прокрутки при открытии попап
    useMemo(() => {
        counter === 2 || counter === 4 || counter === 6 || counter === 8 ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
    }, [counter])


    //
    const [createDevice, setCreateDevice] = useState(0)
    const [createUsers, setCreateUsers] = useState(0)
    const [createOther, setCreateOther] = useState(0)



    return (
        <div className={classes.admin}>
            <div className={classes.container}>
                <div className={classes.admin_content}>

                    <div className={classes.admin_menu}>

                        <div onClick={() => HideAndShows(createDevice, setCreateDevice)} className={classes.menu_unwrap}>
                            Товары
                            <i style={{marginLeft: '10px'}} className=
                                {createDevice === 1 ?
                                    "fa fa-angle-up"
                                    :
                                    "fa fa-angle-down"}
                               aria-hidden="true">
                            </i>
                        </div>

                        <div style={createDevice === 1 ? {height: "auto", opacity: 1, visibility: "visible"} : {}} className={classes.menu_unwrap_content}>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(5)}> Все типы </button>
                                <button className={classes.button_right} onClick={() => setCounter(6)}> Добавить </button>
                            </div>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(7)}> Все подтипы </button>
                                <button className={classes.button_right} onClick={() => setCounter(8)}> Добавить </button>
                            </div>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(1)}> Все товары </button>
                                <button className={classes.button_right} onClick={() => setCounter(2)}> Добавить </button>
                            </div>
                        </div>


                        <div onClick={() => HideAndShows(createUsers, setCreateUsers)} className={classes.menu_unwrap}>
                            Пользователи
                            <i style={{marginLeft: '10px'}} className=
                                {createUsers === 1 ?
                                    "fa fa-angle-up"
                                    :
                                    "fa fa-angle-down"}
                               aria-hidden="true">
                            </i>
                        </div>
                        <div style={createUsers === 1 ? {height: "auto", opacity: 1, visibility: "visible"} : {}} className={classes.menu_unwrap_content}>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(3)}> Пользователи </button>
                                <button className={classes.button_right} onClick={() => setCounter(4)}> Добавить </button>
                            </div>
                        </div>

                        <div onClick={() => HideAndShows(createOther, setCreateOther)} className={classes.menu_unwrap}>
                            Прочее
                            <i style={{marginLeft: '10px'}} className=
                                {createOther === 1 ?
                                    "fa fa-angle-up"
                                    :
                                    "fa fa-angle-down"}
                               aria-hidden="true">
                            </i>
                        </div>
                        <div style={createOther === 1 ? {height: "auto", opacity: 1, visibility: "visible"} : {}} className={classes.menu_unwrap_content}>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(9)}> Новости </button>
                                <button className={classes.button_right} onClick={() => setCounter(10)}> Добавить </button>
                            </div>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(11)}> Сервисы </button>
                                <button className={classes.button_right} onClick={() => setCounter(12)}> Добавить </button>
                            </div>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(13)}> Слайдер </button>
                                <button className={classes.button_right} onClick={() => setCounter(14)}> Добавить </button>
                            </div>
                            <div className={classes.flex_space}>
                                <button className={classes.button_left} onClick={() => setCounter(15)}> Популярные кат. </button>
                                <button className={classes.button_right} onClick={() => setCounter(16)}> Добавить </button>
                            </div>
                        </div>

                    </div>


                    <div className={classes.admin_content_block}>
                        {counter === 1 || counter === 2
                            ?
                            <div>
                            <div className={classes.admin_right_content_table_device}>
                                <a>ID</a>
                                <a>Тип</a>
                                <a>Цена (руб)</a>
                                <a>Название</a>
                                <a>Изображение</a>
                                <a>Редактировать/Удалить</a>
                            </div>
                                <div className={classes.admin_right_content_table_type}>
                                    <select onChange={e => getSortedDevice(e.target.value)} defaultValue={'selected'}>
                                        <option value={'selected'} disabled>Сортировка</option>
                                        <option value={'undefined'}>Показать все</option>
                                        {device.types.map(type =>
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                        )}
                                    </select>
                                    <input
                                        type={'name'}
                                        value={filtersName}
                                        onChange={e => setFiltersName(e.target.value)}
                                        placeholder={'Поиск по названию'}
                                    />
                                </div>

                                {isPostLoading ? <h2 style={{padding: '20px'}}>Загрузка содержимого...</h2> :
                                    filteredDeviceName.map(filteredDeviceName =>
                                        <AdminDataDevice recommend={recommend} key={filteredDeviceName.id} device={filteredDeviceName} functionDeleteAll={functionDeleteAll} functionEdit={functionEdit}/>
                                    )}
                            </div>
                            :
                            ''
                        }
                        {counter === 3 || counter === 4
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_userAndBrand}>
                                    <a>Имя</a>
                                    <a>Email</a>
                                    <a>Роль</a>
                                    <a>Действие</a>
                                </div>
                                {user._user.map(user =>
                                        <AdminDataUser functionDeleteAll={functionDeleteAll} key={user.id} user={user} functionEdit={functionEdit} basketId={basketId} setBasketId={setBasketId} counter={counter} setCounter={setCounter}/>
                                    )}
                            </div>
                            :
                            ''
                        }
                        {counter === 5 || counter === 6
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_type}>
                                    <a>ID</a>
                                    <a>Название</a>
                                    <a>Действие</a>
                                </div>
                                {device.types.map(type =>
                                    <AdminDataType functionDeleteAll={functionDeleteAll} key={type.id} type={type} />
                                )}
                            </div>
                            :
                            ''
                        }
                        {counter === 7 || counter === 8
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_userAndBrand}>
                                    <a>ID</a>
                                    <a>Отношение к типу</a>
                                    <a>Название</a>
                                    <a>Действие</a>
                                </div>
                                {device.brands.map(brand =>
                                    <AdminDataBrand key={brand.id} brand={brand} functionDeleteAll={functionDeleteAll} />
                                )}
                            </div>
                            :
                            ''
                        }







                        {counter === 9 || counter === 10
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_userAndBrand}>
                                    <a>Заголовок</a>
                                    <a>Описание</a>
                                    <a>Изображение</a>
                                    <a>Действие</a>
                                </div>
                                {services.getNews.map(news =>
                                    <AdminDataNews key={news.id} news={news} functionDeleteAll={functionDeleteAll} functionEdit={functionEdit} />
                                )}
                            </div>
                            :
                            ''
                        }

                        {counter === 11 || counter === 12
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_userAndBrand}>
                                    <a>ID</a>
                                    <a>Заголовок</a>
                                    <a>Описание</a>
                                    <a>Действие</a>
                                </div>
                                {services.service.map(service =>
                                    <AdminDataService key={service.id} service={service} functionDeleteAll={functionDeleteAll} functionEdit={functionEdit} />
                                )}
                            </div>
                            :
                            ''
                        }

                        {counter === 13 || counter === 14
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_popular_slider}>
                                    <a>Заголовок</a>
                                    <a>Ссылка</a>
                                    <a>Изображение</a>
                                    <a>Действие</a>
                                </div>
                                {services._slide.map(slider =>
                                    <AdminDataSlider key={slider.id} slider={slider} functionDeleteAll={functionDeleteAll} functionEdit={functionEdit} />
                                )}
                            </div>
                            :
                            ''
                        }

                        {counter === 15 || counter === 16
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_popular_slider}>
                                    <a>ID</a>
                                    <a>Название</a>
                                    <a>Изображение</a>
                                    <a>Действие</a>
                                </div>
                                {services._popular.map(popular =>
                                    <AdminDataPopular key={popular.id} popular={popular} functionDeleteAll={functionDeleteAll} functionEdit={functionEdit} />
                                )}
                            </div>
                            :
                            ''
                        }


                        {counter === 17 || counter === 18
                            ?
                            <div>
                                <div className={classes.admin_right_content_table_device}>
                                    <a>ID</a>
                                    <a>Цена</a>
                                    <a>Размеры</a>
                                    <a>Название</a>
                                    <a>Изображение</a>
                                    <a>Редактировать/Удалить</a>
                                </div>

                                {basketUser.length === 0 ? <div style={{
                                    boxSizing: 'border-box',
                                    width: '99%',
                                    border: 'solid 1px #333',
                                    margin:'5px auto',
                                    padding: '30px 20px',
                                    borderRadius: '5px'
                                }}
                                    > На данный момент у выбранного пользователя отсутствуют товары в корзине </div>
                                    : '' }
                                {basketUser.map(data =>
                                        <AdminDataUserBasket basketUser={data} key={data.id} functionDelete={functionDelete}/>
                                    )}
                            </div>
                            :
                            ''
                        }

                    </div>
                </div>
                    <AdminModalsCreateProduct counter={counter} setCounter={setCounter}/>
                    <AdminModalsCreateTypeAndBrand counter={counter} setCounter={setCounter}/>
                    <AdminModalsCreateNewsAndServices counter={counter} setCounter={setCounter}/>
                    <AdminModalsCreateSlideAndPopular counter={counter} setCounter={setCounter} device={device}/>

                {targetEdit[0].device ?
                    <AdminModalsEditProduct setCounterInt={setCounterInt} counterInt={counterInt} counterEdit={counterEdit} setCounterEdit={setCounterEdit} devices={data} setTargetEdit={setTargetEdit} targetEdit={targetEdit}/>
                    :
                    ''
                }
                {targetEdit[0].news ?
                    <EditNews news={data} counterEdit={counterEdit} setCounterEdit={setCounterEdit} setTargetEdit={setTargetEdit} targetEdit={targetEdit}/>
                    :
                    ''
                }
                {targetEdit[0].service ?
                    <EditServices service={data} counterEdit={counterEdit} setCounterEdit={setCounterEdit} setTargetEdit={setTargetEdit} targetEdit={targetEdit}/>
                    :
                    ''
                }
                {targetEdit[0].slide ?
                    <EditSlider slide={data} counterEdit={counterEdit} setCounterEdit={setCounterEdit} setTargetEdit={setTargetEdit} targetEdit={targetEdit}/>
                    :
                    ''
                }
                {targetEdit[0].popular ?
                    <EditPopular popular={data} counterEdit={counterEdit} setCounterEdit={setCounterEdit} setTargetEdit={setTargetEdit} targetEdit={targetEdit}/>
                    :
                    ''
                }




            </div>
            <div ref={lastElement} style={{height: '1px'}}></div>
        </div>
    );
});

export default Admin;