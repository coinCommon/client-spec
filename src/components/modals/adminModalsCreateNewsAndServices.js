import React, {useState} from 'react';
import classes from "../../css/index.module.scss";
import {createNews, createServices} from "../../http/servicesAPI";

const AdminModalsCreateNewsAndServices = ({counter, setCounter}) => {

    const [news, setNews] = useState([{title: '', description: '', img: ''}])
    const [services, setServices] = useState([{title: '', description: '', img: ''}])



    const selectFile = e => {
        setNews(news.map(m => m.img !== 0 ? {...m, ['img']: e.target.files[0]} : m))
    }
    const selectFileServices = e => {
        setServices(services.map(m => m.img !== 0 ? {...m, ['img']: e.target.files[0]} : m))
    }


    const addNews = () => {
        const formData = new FormData()
        formData.append('title', `${news[0].title}`)
        formData.append('description', `${news[0].description}`)
        formData.append('img', news[0].img)
        createNews(formData).then(data => {
            setNews([{title: '', description: '', img: ''}])
            setCounter(9)
            console.log('News add')
        })
    }
    const addServices = () => {
        const formData = new FormData()
        formData.append('title', `${services[0].title}`)
        formData.append('description', `${services[0].description}`)
        formData.append('img', services[0].img)
        createServices(formData).then(data => {
            setServices([{title: '', description: '', img: ''}])
            setCounter(11)
            console.log('Services add')
        })
    }

    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counter === 10 || counter === 12 ? {height: '100%', opacity: '1', visibility: 'visible'} :
                    {}}
            >
                <div onClick={() => setCounter(counter - 1)} className={classes.modal_show}></div>
                <div style={counter === 2 ? {padding: '100px'} :
                    {padding: '0'}} className={classes.admin_modals_product}>

                    {counter === 10
                        ?
                        <div className={classes.overflow} style={{background: '#e4f4fc', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Добавление новости</h2>
                            </div>
                            <div className={classes.admin_modals_product_flex}>
                                <input value={news[0].title} type={'text'} name={'nameType'} onChange={(e) => setNews(news.map(m => m.img !== 'NaN' ? {...m, ['title']: e.target.value} : m))} placeholder={'Заголовок'}/>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <textarea
                                    className={classes.admin_create_device_textarea}
                                    value={news[0].description}
                                    onChange={(e) => setNews(news.map(m => m.img !== 'NaN' ? {...m, ['description']: e.target.value} : m))}
                                    placeholder={"Описание"}
                                >
                                </textarea>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input className={classes.input_type_file} onChange={(e) => selectFile(e)} id="input__file" type={'file'} name={'icon'} placeholder={'Изображение'}/>
                                <label className={classes.input_type_file_label} htmlFor="input__file">
                                    <div style={{textAlign: 'center'}}>
                                        <i style={{color: '#fff', fontSize: '40px'}} className="fa fa-cloud-download" aria-hidden="true"></i>
                                        <div style={{fontSize: '10px'}}>Выбранный файл {news[0].img.name} </div>
                                    </div>
                                </label>
                                <div className={classes.description_load_file}>
                                    Размеры изображений должны быть  <span style={{fontWeight: 'bold'}}>одинаковые</span>,
                                    рекомендуемый формат изображения <span style={{fontWeight: 'bold'}}>'webp'</span>, рекомендуемый размер  <span style={{fontWeight: 'bold'}}>600x600</span>
                                </div>
                            </div>

                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={() => addNews()}>Добавить</button>
                            </div>
                        </div>

                        :
                        ''

                    }
                    {counter === 12
                        ?
                        <div className={classes.overflow} style={{background: '#e4f4fc', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Добавление сервиса</h2>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input value={services[0].title} type={'text'} name={'nameType'} onChange={(e) => setServices(services.map(m => m.title !== 'NaN' ? {...m, ['title']: e.target.value} : m))} placeholder={'Заголовок'}/>
                            </div>


                            <div className={classes.admin_modals_product_flex}>
                                <textarea
                                    className={classes.admin_create_device_textarea}
                                    value={services[0].description}
                                    onChange={(e) => setServices(services.map(m => m.title !== 'NaN' ? {...m, ['description']: e.target.value} : m))}
                                    placeholder={"Описание"}
                                >
                                </textarea>
                            </div>

                            <div className={classes.admin_modals_product_flex}>
                                <input className={classes.input_type_file} onChange={(e) => selectFileServices(e)} id="input__file2" type={'file'} name={'icon'} placeholder={'Изображение'}/>
                                <label className={classes.input_type_file_label} htmlFor="input__file2">
                                    <div style={{textAlign: 'center'}}>
                                        <i style={{color: '#fff', fontSize: '40px'}} className="fa fa-cloud-download" aria-hidden="true"></i>
                                        <div style={{fontSize: '10px'}}>Выбранный файл {services[0].img.name} </div>
                                    </div>
                                </label>
                                <div className={classes.description_load_file}>
                                    Размеры изображений должны быть  <span style={{fontWeight: 'bold'}}>одинаковые</span>,
                                    рекомендуемый формат изображения <span style={{fontWeight: 'bold'}}>'webp'</span>, рекомендуемый размер  <span style={{fontWeight: 'bold'}}>600x600</span>
                                </div>
                            </div>

                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={() => addServices()}>Добавить</button>
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

export default AdminModalsCreateNewsAndServices;