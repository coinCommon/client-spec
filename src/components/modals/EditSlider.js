import React, {useEffect, useState} from 'react';
import classes from "../../css/index.module.scss";
import {observer} from "mobx-react-lite";
import {editOneSlider} from "../../http/deviceAPI";

const EditSlider = ({slide, counterEdit, setCounterEdit, setTargetEdit, targetEdit}) => {

    const [title, setTitle] = useState(slide.title)
    const [href, setHref] = useState(slide.href)

    const editSlider = () => {
        editOneSlider(
            {
                id: parseInt(counterEdit[0].slide),
                title: title,
                href: href
            }).then(data => {
            setCounterEdit(counterEdit.map(m => m.slide !== 'NaN1' ? {...m, ['slide'] : 0} : m))
            setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['slide'] : false} : m))
            alert('Данные обновлены!')
        })
    }

    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counterEdit[0].slide !== 0 ? {height: '100%', opacity: '1', visibility: 'visible'}
                    : {}}
            >
                <div onClick={() => {
                    setCounterEdit(counterEdit.map(m => m.slide !== 'NaN1' ? {...m, ['slide']: 0} : m))
                    setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['slide'] : false} : m))
                }} className={classes.modal_show}></div>
                <div className={classes.admin_modals_product}>

                    {counterEdit !== 0
                        ?
                        <div className={classes.overflow} style={{background: 'beige', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Редактирование слайдера (главная страница)</h2>
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
                                                        value={href}
                                                        onChange={e => setHref(e.target.value)}
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
                                <button onClick={editSlider}> Сохранить </button>
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

export default EditSlider;