import React, {useContext, useEffect, useState} from 'react';
import classes from "../../css/index.module.scss";
import {createBrand, createType, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {Context} from "../../index";

const  AdminModalsCreateTypeAndBrand = ({counter, setCounter}) => {
    const {device} = useContext(Context)

    const [selectType, setSelectType] = useState( '') // По данному состоянию отрабатывает useEffect
    const [selectBrand, setSelectBrand] = useState(0)

    const [nameType, setNameType] = useState( '')
    const [nameBrand, setNameBrand] = useState( '') // По данному состоянию отрабатывает useEffect

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        // Функция возвращает максимальное число в массиве
        const selectBrandMax = []
        const brandMax = device.brands.filter(brand => brand.typeID === parseInt(selectType))
        const jsonBrandMAx = JSON.parse(JSON.stringify(brandMax))
        for (let i = 0; i < jsonBrandMAx.length; i++) {
            let arrayBrandMax = jsonBrandMAx[i]
            selectBrandMax.push(arrayBrandMax.typeClass)
        }
            setSelectBrand(Math.max.apply(false, selectBrandMax))
        // Функция возвращает максимальное число в массиве
    },[nameBrand, selectType])

    // Добавление типов
    const [file, setFile] = useState('')
    const addType = () => {
        if (!file) {
            alert('Загрузите изображение')
        } else {
        const formData = new FormData()
            formData.append('name', nameType)
            formData.append('icon', file)
            createType(formData).then(data => {
                setFile('')
                setNameType('')
                setCounter(5)
                // OpenMessage('Тип добавлен', 'green')
            })
        }
    }


    const selectFile = e => {
        setFile(e.target.files[0])
    }


    // Добавление типов
    // Добавление подТипов
    const addBrand = () => {
        const formData = new FormData()
        formData.append('name', `${nameBrand}`)
        formData.append('typeID', parseInt(`${selectType}`))
        formData.append('typeClass', selectBrand === -Infinity ? 1 : `${selectBrand + 1}`)
        createBrand(formData).then(data => {
            setNameBrand('')
            setCounter(7)
            console.log('Подтип успешно добавлен...')
        })
    }
    // Добавление подТипов




    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counter === 6 || counter === 8 ? {height: '100%', opacity: '1', visibility: 'visible'} :
                    {}}
            >
                <div onClick={() => setCounter(counter - 1)} className={classes.modal_show}></div>
            <div style={counter === 2 ? {padding: '100px'} :
                {padding: '0'}} className={classes.admin_modals_product}>

                    {counter === 6
                        ?
                        <div style={{background: '#e4f4fc', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Введите название типа</h2>
                            </div>
                            <div className={classes.admin_modals_product_flex}>
                                <input value={nameType} onChange={e => setNameType(e.target.value)} type={'text'} name={'nameType'} placeholder={'Имя типа'}/>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input className={classes.input_type_file} id="input__file" onChange={selectFile} type={'file'} name={'icon'} placeholder={'Изображение'}/>
                                <label className={classes.input_type_file_label} htmlFor="input__file">
                                    <div style={{textAlign: 'center'}}>
                                        <i style={{color: '#fff', fontSize: '40px'}} className="fa fa-cloud-download" aria-hidden="true"></i>
                                        <div style={{fontSize: '10px'}}>Выбранный файл {file.name} </div>
                                    </div>
                                </label>
                                <div className={classes.description_load_file}>
                                    Размеры изображений должны быть  <span style={{fontWeight: 'bold'}}>одинаковые</span>,
                                    рекомендуемый формат изображения <span style={{fontWeight: 'bold'}}>'webp'</span>, рекомендуемый размер  <span style={{fontWeight: 'bold'}}>900x900</span>
                                </div>
                            </div>

                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={addType} >Добавить</button>
                            </div>
                        </div>

                        :
                        ''

                    }
                {counter === 8
                    ?
                    <div style={{background: '#e4f4fc', padding: '40px 100px', zIndex: 10}}>
                        <div className={classes.admin_modals_product_flex}>
                            <h2 style={{margin: '0 0 20px 0'}}>Выберите тип и введите название подтипа</h2>
                        </div>

                        <div className={classes.admin_modals_product_flex}>
                            <select onChange={e => setSelectType(e.target.value)} defaultValue={'selected'} placeholder={"Типы"}>
                                <option value={'selected'} disabled>Выберите тип</option>
                                {device.types.map(type =>
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div className={classes.admin_modals_product_flex}>
                            <input value={nameBrand} onChange={e => setNameBrand(e.target.value)} type={'text'} name={'nameBrand'} placeholder={'Имя подтипа'}/>
                        </div>

                        <div className={classes.admin_modals_product_flex_property}>
                            <button onClick={addBrand} >Добавить</button>
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

export default AdminModalsCreateTypeAndBrand;