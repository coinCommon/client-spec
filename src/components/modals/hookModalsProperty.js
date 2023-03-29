import React, {useEffect, useMemo, useState} from 'react';
import classes from "../../css/index.module.scss";

const HookModalsProperty = ({
                                setFloors,
                                setSeasons,
                                setColors,
                                setMaterials,
                                setDensity,
                                setCompleteness,
                                setComposition,
                                setProtective,

                                propertySelect,

                                clothes,
                                setClothes
                        }) => {

    const [sizeClothesV1] = useState([
        '44-46/158-164', '44-46/170-176', '44-46/182-188',
        '48-50/158-164', '48-50/170-176', '48-50/182-188',
        '52-54/158-164', '52-54/170-176', '52-54/182-188',
        '56-58/158-164', '56-58/170-176', '56-58/182-188',
        '60-62/158-164', '60-62/170-176', '60-62/182-188',
        '64-68/158-164', '64-68/170-176', '64-68/182-188',
        '70-72/158-164', '70-72/170-176', '70-72/182-188'
    ])
    const [sizeShoesV1] = useState([
        '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47'
    ])
    const [noSizeV1] = useState([
        'no size'
    ])

    const [message, setMessage] = useState('')
    const addSizeAdm = (nameLength) => {
        if (clothes.length >= nameLength.length) {
            setMessage('Максимум')
        }
        else {
            setClothes([...clothes, {value: 'no size', quantity: '', number: Date.now()}])
        }
    }
    const removeSizeAdm = (number) => {
        setClothes(clothes.filter(i => i.number !== number))
        setMessage('')
    }
    const changeClothes = (key, value, number) => {
        setClothes(clothes.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    useMemo(() => {
        setMessage('')
    }, [propertySelect])

    return (
        <div>
            {propertySelect === '1' ? // Одежда
                <div>

                    <div className={classes.admin_modals_product_flex_property}>
                        <select id={'floors'} onChange={e => setFloors({title: "Пол", description: e.target.value, number: Date.now()})} defaultValue={'Пол'}
                                placeholder={"Пол"}>
                            <option value={'Пол'} disabled>Выберите Пол</option>
                            <option value={'Мужской'}>
                                Мужской
                            </option>
                            <option value={'Женский'}>
                                Женский
                            </option>
                            <option value={'Нет пола'}>
                                Нет пола
                            </option>
                        </select>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <select onChange={e => setSeasons({title: "Сезон", description: e.target.value, number: Date.now()})} defaultValue={'selected'}
                                placeholder={"Сезон"}>
                            <option value={'selected'} disabled>Выберите сезон</option>
                            <option value={'Лето'}>
                                Лето
                            </option>
                            <option value={'Зима'}>
                                Зима
                            </option>
                            <option value={'Демисезон'}>
                                Демисезон
                            </option>
                        </select>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setColors({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'colors'}
                               placeholder={'Цвет'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setMaterials({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'materials'}
                               placeholder={'Материал'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setDensity({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'density'}
                               placeholder={'Плотность'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setCompleteness({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'completeness'}
                               placeholder={'Комплектность'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setComposition({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'composition'}
                               placeholder={'Состав материала'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setProtective({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'protective'}
                               placeholder={'Защитные свойства'}/>
                    </div>


                    {clothes.map(i =>
                        <div className={classes.clothes_flex} style={{height: '100%', opacity: 1, visibility: 'visible'}} key={i.number}>
                            <select onChange={(e) => changeClothes('value', e.target.value, i.number)} defaultValue={'def'} >
                                <option value={'def'} disabled>Выберите размер</option>
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
                    <div style={{color: 'red', padding: '10px 0'}}>{message}</div>
                    <div className={classes.clothes_flex_property}>
                        <button onClick={() => addSizeAdm(sizeClothesV1)}>Добавить размер</button>
                    </div>

                </div>
                : ''}

            {propertySelect === '2' ? // Обувь
                <div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <select id={'floors'} onChange={e => setFloors({title: "Пол", description: e.target.value, number: Date.now()})} defaultValue={'Пол'}
                                placeholder={"Пол"}>
                            <option value={'Пол'} disabled>Выберите Пол</option>
                            <option value={'Мужской'}>
                                Мужской
                            </option>
                            <option value={'Женский'}>
                                Женский
                            </option>
                        </select>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <select onChange={e => setSeasons({title: "Сезон", description: e.target.value, number: Date.now()})} defaultValue={'selected'}
                                placeholder={"Сезон"}>
                            <option value={'selected'} disabled>Выберите сезон</option>
                            <option value={'Лето'}>
                                Лето
                            </option>
                            <option value={'Зима'}>
                                Зима
                            </option>
                            <option value={'Демисезон'}>
                                Демисезон
                            </option>
                        </select>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setColors({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'colors'}
                               placeholder={'Цвет'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setMaterials({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'materials'}
                               placeholder={'Материал верха'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setDensity({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'density'}
                               placeholder={'Материал низа'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setCompleteness({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'completeness'}
                               placeholder={'Комплектность'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setComposition({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'composition'}
                               placeholder={'Состав материала'}/>
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setProtective({title: e.target.placeholder, description: e.target.value, number: Date.now()})} type={'text'} name={'protective'}
                               placeholder={'Защитные свойства'}/>
                    </div>


                    {clothes.map(i =>
                        <div className={classes.clothes_flex} style={{height: '100%', opacity: 1, visibility: 'visible'}} key={i.number}>
                            <select onChange={(e) => changeClothes('value', e.target.value, i.number)} defaultValue={'def'} >
                                <option value={'def'} disabled>Выберите размер</option>
                                {sizeShoesV1.map(j =>
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
                    <div style={{color: 'red', padding: '10px 0'}}>{message}</div>
                    <div className={classes.clothes_flex_property}>
                        <button onClick={() => addSizeAdm(sizeShoesV1)}>Добавить размер</button>
                    </div>


                </div>
                : ''}


            {propertySelect === '3' ? // Безразмерные товары
                <div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setColors({title: e.target.placeholder, description: e.target.value, number: Date.now()})}
                               type={'text'}
                               name={'colors'}
                               placeholder={'Цвет'}
                        />
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setDensity({title: e.target.placeholder, description: e.target.value, number: Date.now()})}
                               type={'text'}
                               name={'density'}
                               placeholder={'Материал'}
                        />
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setCompleteness({title: e.target.placeholder, description: e.target.value, number: Date.now()})}
                               type={'text'}
                               name={'completeness'}
                               placeholder={'Комплектность'}
                        />
                    </div>
                    <div className={classes.admin_modals_product_flex_property}>
                        <input onChange={e => setComposition({title: e.target.placeholder, description: e.target.value, number: Date.now()})}
                               type={'text'}
                               name={'composition'}
                               placeholder={'Состав материала'}
                        />
                    </div>

                    {clothes.map(i =>
                        <div className={classes.clothes_flex} style={{height: '100%', opacity: 1, visibility: 'visible'}} key={i.number}>
                            {/*<select onChange={(e) => changeClothes('value', e.target.value, i.number)} defaultValue={'no size'} >*/}
                            {/*    {noSizeV1.map(j =>*/}
                            {/*        <option value={'no size'} key={j}>*/}
                            {/*            {j}*/}
                            {/*        </option>*/}
                            {/*    )}*/}
                            {/*</select>*/}
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
                    <div style={{color: 'red', padding: '10px 0'}}>{message}</div>
                    <div className={classes.clothes_flex_property}>
                        <button onClick={() => addSizeAdm(noSizeV1)}>Добавить размер</button>
                    </div>

                </div>
                : ''}

        </div>
    );
};

export default HookModalsProperty;