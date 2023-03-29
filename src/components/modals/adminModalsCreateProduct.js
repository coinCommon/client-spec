import React, {useContext, useEffect, useMemo, useState} from 'react';
import classes from "../../css/index.module.scss";
import {Context} from "../../index";
import {createDevices} from "../../http/deviceAPI";
import {create} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import HookModalsProperty from "./hookModalsProperty";
import ClearValueInfo from "../../hocks/clearValueInfo";

const AdminModalsCreateProduct = observer(({counter, setCounter}) => {
    const {device} = useContext(Context)
    const [clothes, setClothes] = useState([])
    const [propertySelect, setPropertySelect] = useState('')

    const [types, setTypes] = useState( '')
    const [brands, setBrands] = useState( '')
    const [titles, setTitles] = useState( '')
    const [prices, setPrices] = useState( '')

    const [file, setFile] = useState( [])
    const [ratings, setRatings] = useState( '')
    const [descriptions, setDescriptions] = useState( '')

    const [floors, setFloors] = useState( {title: '', description: '', number: Date.now()})
    const [seasons, setSeasons] = useState( {title: '', description: '', number: Date.now()})
    const [colors, setColors] = useState( {title: '', description: '', number: Date.now()})
    const [materials, setMaterials] = useState( {title: '', description: '', number: Date.now()})
    const [density, setDensity] = useState( {title: '', description: '', number: Date.now()})
    const [completeness, setCompleteness] = useState( {title: '', description: '', number: Date.now()})
    const [composition, setComposition] = useState( {title: '', description: '', number: Date.now()})
    const [protective, setProtective ] = useState( {title: '', description: '', number: Date.now()})

    const [lengthFiles, setLengthFiles] = useState(0)
    const selectFile = e => {
        let array = []
        for (let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i]
            array.push({file})
        }
        setFile(array)
        setLengthFiles(e.target.files.length)
    }

    const [infoAppendSuccess, setInfoAppendSuccess] = useState([]) // Добавление свойств
    useMemo(() => { // Добавление свойств при их изменении
        setInfoAppendSuccess([floors, seasons, colors, materials, density, completeness, composition, protective].map(data => data).filter(dataFilter => dataFilter.title !== '' && dataFilter.description !== ''))
    }, [floors, seasons, colors, materials, density, completeness, composition, protective])

    useMemo(() => {
        ClearValueInfo( // Очистка полей (ХУК)
            setInfoAppendSuccess,
            setFloors,
            setSeasons,
            setColors,
            setMaterials,
            setDensity,
            setCompleteness,
            setComposition,
            setProtective,
            setClothes)
    }, [propertySelect])



    const addDevice = () => {
        const formData = new FormData()
            formData.append('name', titles)
            formData.append('price', `${prices}`)
            formData.append('rating', `${ratings}`)
            formData.append('description', `${descriptions}`)
                file.forEach(img => {
                    formData.append("img", img.file)
                })
            formData.append('typeId', types)
            formData.append('brandId', parseInt(brands))
            formData.append('typeSize', JSON.stringify(clothes))
            formData.append('info', JSON.stringify(infoAppendSuccess))
            createDevices(formData).then(data => {
                setTypes('')
                setBrands('')
                setTitles('')
                setPrices('')
                setRatings('')
                setFile([])
                ClearValueInfo( // Очистка полей (ХУК)
                    setInfoAppendSuccess,
                    setFloors,
                    setSeasons,
                    setColors,
                    setMaterials,
                    setDensity,
                    setCompleteness,
                    setComposition,
                    setProtective,
                    setClothes)
                setCounter(1)
                console.log('Товар успешно добавлен')
            })
    }


    const [emails, setEmails] = useState( '')
    const [passwords, setPasswords] = useState( '')
    const [roles, setRoles] = useState( '')
    const [names, setNames] = useState( '')

    const addUser = async () => {
        try {
            let data;
                data = await create(emails, passwords, roles, names)

        } catch (e) {
            alert(e.response.data.message)
        }
        setEmails('')
        setPasswords('')
        setRoles('')
        setNames('')
        setCounter(3)
    }


    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counter === 2 || counter === 4 ? {opacity: '1', visibility: 'visible'} :
                {}}
            >
                <div onClick={() => setCounter(counter - 1)} className={classes.modal_show}></div>
                    <div className={classes.admin_modals_product}>

            {counter === 2
                ?
                        <div  style={{background: '#ffecc2', padding: '40px 100px', zIndex: 10, height: '100%', maxHeight: '550px', overflowY: 'scroll'}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Заполните карточку товара</h2>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                                <div>
                                <h3> Описание </h3>
                            <div className={classes.admin_modals_product_flex}>
                                <select onChange={e => setTypes(e.target.value)} defaultValue={'selected'} placeholder={"Типы"}>
                                    <option value={'selected'} disabled>Выберите тип</option>
                                    {device.types.map(type =>
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className={classes.admin_modals_product_flex}>
                                <select onChange={e => setBrands(e.target.value)} defaultValue={'selected'} placeholder={"Бренды>"}>
                                    <option value={'selected'} disabled>Выберите категорию</option>
                                    {device.brands.filter(brand => brand.typeID === parseInt(types)).map(brand =>
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    )}
                                </select>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input value={titles} onChange={e => setTitles(e.target.value)} type={'text'} name={'title'} placeholder={'Название'}/>
                            </div>
                            <div className={classes.admin_modals_product_flex}>
                                <input value={prices} onChange={e => setPrices(e.target.value)} type={'number'} name={'price'} placeholder={'Стоимость'}/>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input className={classes.input_type_file} id="input__file" onChange={selectFile} type={'file'} name={'img'} multiple placeholder={'Изображение'}/>
                                    <label className={classes.input_type_file_label} htmlFor="input__file">
                                        <div style={{textAlign: 'center'}}>
                                            <i style={{color: '#fff', fontSize: '40px'}} className="fa fa-cloud-download" aria-hidden="true"></i>
                                            <div style={{fontSize: '10px'}}>Выбрано файлов {lengthFiles}</div>
                                        </div>
                                    </label>
                                <div className={classes.description_load_file}>
                                    Размеры изображений должны быть  <span style={{fontWeight: 'bold'}}>одинаковые</span>,
                                    рекомендуемый формат изображения <span style={{fontWeight: 'bold'}}>'webp'</span>, рекомендуемый размер  <span style={{fontWeight: 'bold'}}>900x900</span>
                                </div>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input value={ratings} onChange={e => setRatings(e.target.value)} type={'tel'} maxLength={1} name={'ratings'} placeholder={'Рейтинг от 1 до 5'}/>
                            </div>

                            <div>
                                <textarea
                                    className={classes.admin_create_device_textarea}
                                    value={descriptions}
                                    onChange={e => setDescriptions(e.target.value)}
                                    placeholder={"Описание"}
                                >
                                </textarea>
                            </div>
                                </div>


                                <div style={{width: '20px'}}></div>
                            <div>


                            <h3>Свойства</h3>

                                <div className={classes.admin_modals_property_select}>
                                    <select defaultValue={'1'} onChange={e => setPropertySelect(e.target.value)}>
                                        <option value={'1'} disabled>
                                            Выберите тип
                                        </option>
                                        <option value={'1'}>
                                            Одежда
                                        </option>
                                        <option value={'2'}>
                                            Обувь
                                        </option>
                                        <option value={'3'}>
                                            Безразмерные товары
                                        </option>
                                    </select>
                                </div>


                            <HookModalsProperty
                                setFloors={setFloors}
                                setSeasons={setSeasons}
                                setColors={setColors}
                                setMaterials={setMaterials}
                                setDensity={setDensity}
                                setCompleteness={setCompleteness}
                                setComposition={setComposition}
                                setProtective={setProtective}
                                propertySelect={propertySelect}
                                clothes={clothes}
                                setClothes={setClothes}
                            />

                        </div>

                            </div>
                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={addDevice} >Добавить</button>
                            </div>
                        </div>


                :
                ''
            }

            {counter === 4
            ?
                <div style={{background: '#e4f4fc', padding: '40px 100px', zIndex: 10}}>
                                    <div className={classes.admin_modals_product_flex}>
                                            <h2 style={{margin: '0 0 20px 0'}}>Заполните карточку пользователя</h2>
                                    </div>
                                    <div className={classes.admin_modals_product_flex}>
                                            <input value={names} onChange={e => setNames(e.target.value)} type={'text'} name={'name'} placeholder={'Имя'}/>
                                    </div>
                                    <div className={classes.admin_modals_product_flex}>
                                            <input value={emails} onChange={e => setEmails(e.target.value)} type={'text'} name={'email'} placeholder={'Email'}/>
                                    </div>
                                    <div className={classes.admin_modals_product_flex}>
                                            <input value={passwords} onChange={e => setPasswords(e.target.value)} type={'text'} name={'Passwords'} placeholder={'Пароль'}/>
                                    </div>

                    <div className={classes.admin_modals_product_flex_property}>
                        <select placeholder={"Права"} defaultValue={'selected'} onChange={e => setRoles(e.target.value)}>
                            <option value={'selected'} disabled> Пользователь </option>
                            <option value={'USER'}>
                                Пользователь
                            </option>
                            <option value={'ADMIN'}>
                                Администратор
                            </option>
                        </select>
                    </div>
                                    <div className={classes.admin_modals_product_flex_property}>
                                        <button onClick={addUser} >Добавить</button>
                                    </div>
                </div>

                :
                ''

        }
            </div>
            </div>
        </div>
    );
});

export default AdminModalsCreateProduct;