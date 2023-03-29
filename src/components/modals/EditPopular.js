import React, {useState} from 'react';
import classes from "../../css/index.module.scss";
import {editOnePopular} from "../../http/deviceAPI";

const EditPopular = ({popular, counterEdit, setCounterEdit, setTargetEdit, targetEdit}) => {

    const [name, setName] = useState(popular.name)


    const editSlider = () => {
        editOnePopular(
            {
                id: parseInt(counterEdit[0].popular),
                name: name,
            }).then(data => {
            setCounterEdit(counterEdit.map(m => m.slide !== 'NaN1' ? {...m, ['popular'] : 0} : m))
            setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['popular'] : false} : m))
            alert('Данные обновлены!')
        })
    }

    return (
        <div>
            <div
                className={classes.admin_modals_absolute}
                style={counterEdit[0].popular !== 0 ? {height: '100%', opacity: '1', visibility: 'visible'}
                    : {}}
            >
                <div onClick={() => {
                    setCounterEdit(counterEdit.map(m => m.popular !== 'NaN1' ? {...m, ['popular']: 0} : m))
                    setTargetEdit(targetEdit.map(m => m.length !== 0 ? {...m, ['popular'] : false} : m))
                }} className={classes.modal_show}></div>
                <div className={classes.admin_modals_product}>

                    {counterEdit !== 0
                        ?
                        <div className={classes.overflow} style={{background: 'beige', padding: '40px 100px', zIndex: 10}}>
                            <div className={classes.admin_modals_product_flex}>
                                <h2 style={{margin: '0 0 20px 0'}}>Редактирование популярной категории</h2>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <label style={{fontSize: '10px'}}>Название</label>
                                        <div className={classes.admin_modals_product_flex}>
                                            <input value={name} onChange={e => setName(e.target.value)} type={'text'} name={'title'} placeholder={'Заголовок'}/>
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

export default EditPopular;