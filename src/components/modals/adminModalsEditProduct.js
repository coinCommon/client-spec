import React, {useEffect, useState} from 'react';
import classes from "../../css/index.module.scss";
import {
    createDevicesRecommend, deleteOneDevicesRecommend,
    editOneDevices, fetchDevicesRecommended,
} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const AdminModalsEditProduct = ({setCounterInt, counterInt, counterEdit, setCounterEdit, devices, setTargetEdit, targetEdit}) => {

    const [titles, setTitles] = useState(devices.name)
    const [prices, setPrices] = useState(devices.price)
    const [ratings, setRatings] = useState( devices.rating)
    const [descriptions, setDescriptions] = useState( devices.description)


    const [deviceRecommend, setDeviceRecommend] = useState(false)
    const [count, setCount] = useState(0)
    useEffect(() => {
        fetchDevicesRecommended(devices.id).then(data => data.rows.length > 0 ? setDeviceRecommend(true) : setDeviceRecommend(false))
    }, [count])

    const editDevice = () => {
        editOneDevices(
            {
                id: parseInt(counterEdit[0].device),
                name: titles,
                rating: parseInt(ratings),
                price: parseInt(prices),
                description: descriptions,
                typeSize: clothes}).then(data => {
            setCounterEdit(counterEdit.map(m => m.device !== 'NaN1' ? {...m, ['device'] : 0} : m))
            setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['device'] : false} : m))
            alert('Данные обновлены!')
        })
    }

    const editDeviceRecommend = (deviceId, name, price, rating, img) => {
        fetchDevicesRecommended(deviceId).then(data => data.rows.length > 0 ?  {} : createDevicesRecommend(deviceId, name, price, rating, img).then(data => {
            alert('Добавлено в избранное!')
            setCount(count + 1)
            setCounterInt(counterInt+1)
        }))
    }
    const deleteDeviceRecommend = (id) => {
        deleteOneDevicesRecommend(id).then(data => {
            alert('Удалено из избранного!')
            setCount(count + 1)
            setCounterInt(counterInt+1)
        })
    }



    const [sizeClothesV1] = useState([
        'no size',
        '44-46/158-164', '44-46/170-176', '44-46/182-188',
        '48-50/158-164', '48-50/170-176', '48-50/182-188',
        '52-54/158-164', '52-54/170-176', '52-54/182-188',
        '56-58/158-164', '56-58/170-176', '56-58/182-188',
        '60-62/158-164', '60-62/170-176', '60-62/182-188',
        '64-68/158-164', '64-68/170-176', '64-68/182-188',
        '70-72/158-164', '70-72/170-176', '70-72/182-188',
        '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47',
    ])



    const [clothes, setClothes] = useState(devices.typeSize)

    const addSizeAdm = (nameLength) => {
        setClothes([...clothes, {value: 'no size', quantity: '', number: Date.now()}])
    }
    const removeSizeAdm = (number) => {
        setClothes(clothes.filter(i => i.number !== number))
    }
    const changeClothes = (key, value, number) => {
        setClothes(clothes.map(i => i.number === number ? {...i, [key]: value} : i))
    }



    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counterEdit[0].device !== 0 ? {height: '100%', opacity: '1', visibility: 'visible'}
                    : {}}
            >
                <div onClick={() => {
                    setCounterEdit(counterEdit.map(m => m.device !== 'NaN1' ? {...m, ['device']: 0} : m))
                    setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['device'] : false} : m))
                }} className={classes.modal_show}></div>
                <div className={classes.admin_modals_product}>

                    {counterEdit[0].device !== 0
                        ?
                        <div className={classes.overflow} style={{background: 'beige', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Редактирование товара</h2>

                                {deviceRecommend ?
                                    <button
                                        onClick={e => deleteDeviceRecommend(devices.id)}
                                        className={classes.admin_menu_modal_rec}
                                    >
                                        Убрать из избранного
                                    </button> :
                                    <button
                                        style={{color: '#5ba154', borderColor: '#5ba154'}}
                                        onClick={e => editDeviceRecommend(devices.id, devices.name, devices.price, devices.rating, devices.img)}
                                        className={classes.admin_menu_modal_rec}
                                    >
                                        В избранное
                                    </button>
                                }
                            </div>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                        {/*<h3>Описание</h3>*/}
                                            <label style={{fontSize: '10px'}}>Название</label>
                                        <div className={classes.admin_modals_product_flex}>
                                            <input value={titles} onChange={e => setTitles(e.target.value)} type={'text'} name={'title'} placeholder={'Название'}/>
                                        </div>
                                            <label style={{fontSize: '10px'}}>Цена</label>
                                        <div className={classes.admin_modals_product_flex}>
                                            <input value={prices} onChange={e => setPrices(e.target.value)} type={'number'} name={'price'} placeholder={'Стоимость'}/>
                                        </div>
                                            <label style={{fontSize: '10px'}}>Рейтинг</label>
                                        <div className={classes.admin_modals_product_flex}>
                                            <input value={ratings} onChange={e => setRatings(e.target.value)} type={'number'} name={'ratings'} placeholder={'Рейтинг'}/>
                                        </div>

                                        <div>
                                            <label style={{fontSize: '10px'}}>Описание</label>
                                            <div className={classes.admin_modals_product_flex}>
                                                <textarea
                                                    value={descriptions}
                                                    onChange={e => setDescriptions(e.target.value)}
                                                    placeholder={"Описание"}
                                                    style={{width: '100%', maxWidth: '497px',
                                                        height: '50px', border: 'none',
                                                        color: '#333', background: '#fff',
                                                        outline: 'none', padding: '10px',
                                                        fontSize: '14px', marginTop: '5px'
                                                    }}
                                                >
                                                </textarea>
                                            </div>
                                        </div>




                                    {clothes.map(i =>
                                        <div className={classes.clothes_flex} style={{opacity: 1, visibility: 'visible'}} key={i.number}>
                                            <select onChange={(e) => changeClothes('value', e.target.value, i.number)} defaultValue={i.value} >
                                                {/*<option value={'def'} disabled>Выберите размер</option>*/}
                                                {sizeClothesV1.map(j =>
                                                    <option value={j} key={j}>
                                                        {j}
                                                    </option>
                                                )}
                                            </select>
                                            <input
                                                type={'tel'}
                                                value={i.quantity}
                                                min="1"
                                                max='999'
                                                maxLength='3'
                                                onChange={(e) =>  changeClothes('quantity', e.target.value.replace(/\D/,''), i.number)}
                                                placeholder={'Кол-во'}
                                            />
                                            <button onClick={() => removeSizeAdm(i.number)}>Убрать</button>
                                        </div>
                                    )}

                                    <div className={classes.clothes_flex_property}>
                                        <button onClick={() => addSizeAdm()}>Добавить размер</button>
                                    </div>






                                    </div>
                                </div>

                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={editDevice}> Сохранить </button>
                            </div>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminModalsEditProduct;