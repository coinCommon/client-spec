import React, {useEffect, useState} from 'react';
import classes from "../../css/index.module.scss";
import {editOneNews} from "../../http/servicesAPI";

const EditNews = ({counterEdit, setCounterEdit, news, setTargetEdit, targetEdit}) => {

    const [title, setTitle] = useState(news.title)
    const [description, setDescription] = useState(news.description)


    const editNews = () => {
        editOneNews(
            {
                id: parseInt(counterEdit[0].news),
                title: title,
                description: description
            }).then(data => {
            setCounterEdit(counterEdit.map(m => m.news !== 'NaN1' ? {...m, ['news'] : 0} : m))
            setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['news'] : false} : m))
            alert('Данные обновлены!')
        })
    }

    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counterEdit[0].news !== 0 ? {height: '100%', opacity: '1', visibility: 'visible'}
                    : {}}
            >
                <div onClick={() => {
                    setCounterEdit(counterEdit.map(m => m.device !== 'NaN1' ? {...m, ['news']: 0} : m))
                    setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['news'] : false} : m))
                }} className={classes.modal_show}></div>
                <div className={classes.admin_modals_product}>

                    {counterEdit !== 0
                        ?
                        <div className={classes.overflow} style={{background: 'beige', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Редактирование новости</h2>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <label style={{fontSize: '10px'}}>Название</label>
                                        <div className={classes.admin_modals_product_flex}>
                                            <input value={title} onChange={e => setTitle(e.target.value)} type={'text'} name={'title'} placeholder={'Заголовок'}/>
                                        </div>

                                        <div>
                                            <label style={{fontSize: '10px'}}>Описание</label>
                                            <div className={classes.admin_modals_product_flex}>
                                                    <textarea
                                                        value={description}
                                                        onChange={e => setDescription(e.target.value)}
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


                                    </div>
                                </div>

                            <div className={classes.admin_modals_product_flex_property}>
                                <button onClick={editNews}> Сохранить </button>
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

export default EditNews;