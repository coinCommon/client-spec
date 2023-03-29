import React, {useState} from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import classes from "../../css/index.module.scss";
import HideAndShows from "../../hocks/hideAndShow";


const wrapperStyle = { width: '100%'};



const RangeCatalog = ({minPrice, maxPrice, minValue, setMinValue, maxValue, setMaxValue }) => {

    const changeValue = (value) => {
        setMinValue(value[0])
        setMaxValue(value[1])
    }

    const [floors, setFloors] = useState(0)
    const [season, setSeason] = useState(0)
    const [size, setSize] = useState(0)
    const [color, setColor] = useState(0)




    const [checkedFloorsAll, setCheckedFloorsAll] = useState( // пол
        [{name: 'all', status: true},
            {name: 'male', status: true},
            {name: 'female',status: true},
            {name: 'noFloor', status: true}])
    const [checkedSeasonsAll, setCheckedSeasonsAll] = useState( // сезон
        [{name: 'all', status: true},
            {name: 'summer', status: true},
            {name: 'winter',status: true},
            {name: 'demiSeason', status: true}])


    const CheckFloors = (name, props, object, setObject) => {
        if (name === 'all') {
            setObject(object.map(m => m.name.length > 0 ? {...m, ['status']: props} : m))
        }
        else {
            if (!props) {
                setObject(object[0].status = false)
            }
            setObject(object.map(m => m.name === name ? {...m, ['status']: props} : m))
        }
    }

    return (
        <div>
            <div className={classes.property_input}>
                <div className={classes.position_relative}>
                    <input maxLength={5} type={'phone'} value={minValue === Infinity ? 0 : minValue} onChange={(e) => setMinValue(e.target.value)} />
                    <label>от</label>
                </div>
                <div className={classes.position_relative}>
                    <input maxLength={5} type={'phone'} value={minValue === Infinity ? 0 : maxValue} onChange={(e) => setMaxValue(e.target.value)} />
                    <label>до</label>
                </div>
            </div>

            <div style={{padding: '10px 20px'}}>
                <div style={{padding: '5px 0'}}>
                    <Slider
                        value={[minValue, maxValue]}
                        min={minPrice}
                        max={maxPrice}
                        // tabIndex={[minValue, maxValue]}
                        onChange={(value) => changeValue(value)}
                        style={wrapperStyle}
                        range={true}
                        disabled={false}
                        railStyle={{background: '#333'}} // стиль дорожки
                        tipProps={{placement: 'top', prefixCls: 'rc-slider-tooltip'}} // хз
                        handleStyle={{background: '#fff', borderColor: '#333'}} // стили для ручек
                        trackStyle={{background: '#ffee00'}} // стиль дорожки

                        dotStyle={{color: 'red', background: 'red'}} // хз
                        activeDotStyle={{color: 'red', background: 'red'}} // хз
                        defaultValue={[0, 100]} // дефолт, от минимальной суммы, к максимальной
                        allowCross={false} // разрешить пересечение ручек?
                    />
                </div>

                <div className={classes.catalog_filter_flex_mobile}>

                    {/* Пол */}
                    <div className={classes.catalog_filter_margin}>
                        <div>
                            <div className={classes.title_property} onClick={() => HideAndShows(floors, setFloors)}>
                                Пол
                                <i className={floors === 1 ? "fa fa-angle-up" : "fa fa-angle-down"} aria-hidden="true"></i>
                            </div>
                            {floors === 1 ?
                                <div className={classes.content_property}>
                                    <div className={classes.content_unit_property_all}>
                                        <input checked={checkedFloorsAll[0].status} name={'all'} type={"checkbox"} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedFloorsAll, setCheckedFloorsAll)}/>
                                        <label >Все</label>
                                    </div>
                                    <div className={classes.content_unit_property}>
                                        <input checked={checkedFloorsAll[1].status} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedFloorsAll, setCheckedFloorsAll)} name={'male'} type={"checkbox"}/>
                                        <label>Мужской</label>
                                    </div>
                                    <div className={classes.content_unit_property}>
                                        <input checked={checkedFloorsAll[2].status} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedFloorsAll, setCheckedFloorsAll)} name={'female'} type={"checkbox"}/>
                                        <label>Женский</label>
                                    </div>
                                    <div className={classes.content_unit_property}>
                                        <input checked={checkedFloorsAll[3].status} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedFloorsAll, setCheckedFloorsAll)} name={'noFloor'} type={"checkbox"}/>
                                        <label>Нет пола</label>
                                    </div>
                                </div>
                                : ''
                            }
                        </div>
                    </div>


                    {/* Сезон */}
                    <div className={classes.catalog_filter_margin}>
                        <div>
                            <div className={classes.title_property} onClick={() => HideAndShows(season, setSeason)}>
                                Сезон
                                <i className={season === 1 ? "fa fa-angle-up" : "fa fa-angle-down"} aria-hidden="true"></i>
                            </div>
                            {season === 1 ?
                                <div className={classes.content_property}>
                                    <div className={classes.content_unit_property_all}>
                                        <input checked={checkedSeasonsAll[0].status} name={'all'} type={"checkbox"} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedSeasonsAll, setCheckedSeasonsAll)}/>
                                        <label >Все</label>
                                    </div>
                                    <div className={classes.content_unit_property}>
                                        <input checked={checkedSeasonsAll[1].status} name={'summer'} type={"checkbox"} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedSeasonsAll, setCheckedSeasonsAll)}/>
                                        <label>Лето</label>
                                    </div>
                                    <div className={classes.content_unit_property}>
                                        <input checked={checkedSeasonsAll[2].status} name={'winter'} type={"checkbox"} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedSeasonsAll, setCheckedSeasonsAll)}/>
                                        <label>Зима</label>
                                    </div>
                                    <div className={classes.content_unit_property}>
                                        <input checked={checkedSeasonsAll[3].status} name={'demiSeason'} type={"checkbox"} onChange={(e) => CheckFloors(e.target.name, e.target.checked, checkedSeasonsAll, setCheckedSeasonsAll)}/>
                                        <label>Демисезон</label>
                                    </div>
                                </div>
                                : ''
                            }
                        </div>
                    </div>



                    {/*<div className={classes.catalog_filter_margin}>*/}
                    {/*    <div>*/}
                    {/*        <div className={classes.title_property} onClick={() => HideAndShows(size, setSize)}>*/}
                    {/*            Размеры*/}
                    {/*            <i className={size === 1 ? "fa fa-angle-up" : "fa fa-angle-down"} aria-hidden="true"></i>*/}
                    {/*        </div>*/}
                    {/*        {size ?*/}
                    {/*        <div className={classes.content_property}>*/}
                    {/*            <select>*/}
                    {/*                <option>*/}
                    {/*                    1*/}
                    {/*                </option>*/}
                    {/*            </select>*/}
                    {/*        </div>*/}
                    {/*            : ''*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={classes.catalog_filter_margin}>*/}
                    {/*    <div>*/}
                    {/*        <div className={classes.title_property} onClick={() => HideAndShows(color, setColor)}>*/}
                    {/*            Цвет*/}
                    {/*            <i className={color === 1 ? "fa fa-angle-up" : "fa fa-angle-down"} aria-hidden="true"></i>*/}
                    {/*        </div>*/}
                    {/*        {color ?*/}
                    {/*            <div className={classes.content_property}>*/}
                    {/*                <select>*/}
                    {/*                    <option style={{background: 'red'}}>*/}
                    {/*                    </option>*/}
                    {/*                    <option style={{background: 'blue'}}>*/}
                    {/*                    </option>*/}
                    {/*                </select>*/}
                    {/*            </div>*/}
                    {/*            : ''*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}








                </div>

            </div>

        </div>
    );
};

export default RangeCatalog;