import React, {useState} from 'react';
import {createNews, createServices} from "../../http/servicesAPI";
import classes from "../../css/index.module.scss";
import {createPopularCat, createSlider} from "../../http/deviceAPI";

const AdminModalsCreateSlideAndPopular = ({counter, setCounter, device}) => {
    const [slide, setSlide] = useState([{title: '', href: '', img: ''}])
    const [popular, setPopular] = useState([{name: '', typeID: '', brandID: '', img: ''}])

    const [types, setTypes] = useState( '')


    const selectFile = e => {
        setSlide(slide.map(m => m.img !== 0 ? {...m, ['img']: e.target.files[0]} : m))
    }
    const selectFileServices = e => {
        setPopular(popular.map(m => m.img !== 0 ? {...m, ['img']: e.target.files[0]} : m))
    }


    const addSlide = () => {
        const formData = new FormData()
        formData.append('title', `${slide[0].title}`)
        formData.append('href', `${slide[0].href}`)
        formData.append('img', slide[0].img)
        createSlider(formData).then(data => {
            setSlide([{title: '', href: '', img: ''}])
            setCounter(13)
            console.log('News add')
        })
    }
    const addPopular = () => {
        const formData = new FormData()
        formData.append('name', `${popular[0].name}`)
        formData.append('typeID', `${types}`)
        formData.append('brandID', `${popular[0].brandID}`)
        formData.append('img', popular[0].img)
        createPopularCat(formData).then(data => {
            setPopular([{name: '', typeID: '', brandID: '', img: ''}])
            setCounter(15)
        })
    }

    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counter === 14 || counter === 16 ? {height: '100%', opacity: '1', visibility: 'visible'} :
                    {}}
            >
                <div onClick={() => setCounter(counter - 1)} className={classes.modal_show}></div>
                <div style={counter === 2 ? {padding: '100px'} :
                    {padding: '0'}} className={classes.admin_modals_product}>

                    {counter === 14
                        ?
                        <div className={classes.overflow} style={{background: '#e4f4fc', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Слайдер на главном экране</h2>
                            </div>
                            <div className={classes.admin_modals_product_flex}>
                                <input value={slide[0].title} name={'nameType'} onChange={(e) => setSlide(slide.map(m => m.img !== 'NaN' ? {...m, ['title']: e.target.value} : m))} placeholder={'Заголовок'}/>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input
                                    className={classes.admin_create_device_textarea}
                                    value={slide[0].href}
                                    type={'text'}
                                    onChange={(e) => setSlide(slide.map(m => m.img !== 'NaN' ? {...m, ['href']: e.target.value} : m))}
                                    placeholder={'Ссылка'}
                                >
                                </input>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input className={classes.input_type_file} onChange={(e) => selectFile(e)} id="input__file" type={'file'} name={'icon'} placeholder={'Изображение'}/>
                                <label className={classes.input_type_file_label} htmlFor="input__file">
                                    <div style={{textAlign: 'center'}}>
                                        <i style={{color: '#fff', fontSize: '40px'}} className="fa fa-cloud-download" aria-hidden="true"></i>
                                        <div style={{fontSize: '10px'}}>Выбранный файл {slide[0].img.name} </div>
                                    </div>
                                </label>
                                <div className={classes.description_load_file}>
                                    Размеры изображений должны быть  <span style={{fontWeight: 'bold'}}>одинаковые</span>,
                                    рекомендуемый формат изображения <span style={{fontWeight: 'bold'}}>'webp'</span>, рекомендуемый размер  <span style={{fontWeight: 'bold'}}>1920x350</span>
                                </div>
                            </div>

                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={() => addSlide()}>Добавить</button>
                            </div>
                        </div>

                        :
                        ''

                    }
                    {counter === 16
                        ?

                        <div className={classes.overflow} style={{background: '#e4f4fc', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Добавление сервиса</h2>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input value={popular[0].name} type={'text'} name={'nameType'} onChange={(e) => setPopular(popular.map(m => m.name !== 'NaN' ? {...m, ['name']: e.target.value} : m))} placeholder={'Название'}/>
                            </div>


                            <div className={classes.admin_modals_product_flex}>
                                <select onChange={(e) => setTypes(e.target.value)} defaultValue={'selected'} placeholder={"Типы"}>
                                    <option value={'selected'} disabled>Выберите тип</option>
                                    {device.types.map(type =>
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className={classes.admin_modals_product_flex}>
                                <select onChange={(e) => setPopular(popular.map(m => m.brandID !== 'NaN' ? {...m, ['brandID']: e.target.value} : m))} defaultValue={'selected'} placeholder={"Бренды>"}>
                                    <option value={'selected'} disabled>Выберите категорию</option>
                                    {device.brands.filter(brand => brand.typeID === parseInt(types)).map(brand =>
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    )}
                                </select>
                            </div>


                            <div className={classes.admin_modals_product_flex}>
                                <input className={classes.input_type_file} onChange={(e) => selectFileServices(e)} id="input__file2" type={'file'} name={'icon'} placeholder={'Изображение'}/>
                                <label className={classes.input_type_file_label} htmlFor="input__file2">
                                    <div style={{textAlign: 'center'}}>
                                        <i style={{color: '#fff', fontSize: '40px'}} className="fa fa-cloud-download" aria-hidden="true"></i>
                                        <div style={{fontSize: '10px'}}>Выбранный файл {popular[0].img.name} </div>
                                    </div>
                                </label>
                                <div className={classes.description_load_file}>
                                    Размеры изображений должны быть  <span style={{fontWeight: 'bold'}}>одинаковые</span>,
                                    изображения должны быть без фона,
                                    рекомендуемый формат изображения <span style={{fontWeight: 'bold'}}>'webp'</span>, рекомендуемый размер  <span style={{fontWeight: 'bold'}}>100x100</span>
                                </div>
                            </div>

                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={() => addPopular()}>Добавить</button>
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

export default AdminModalsCreateSlideAndPopular;