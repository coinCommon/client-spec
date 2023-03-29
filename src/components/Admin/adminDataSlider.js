import React from 'react';
import classes from "../../css/index.module.scss";
import {deleteOneSlider, fetchOneSlider} from "../../http/deviceAPI";

const AdminDataSlider = ({slider, functionDeleteAll, functionEdit}) => {
    return (
        <div className={classes.admin_right_content_popular_slider}>
            <a>
                {slider.title}
            </a>
            <a>
                {slider.href}
            </a>
            <div>
                <img src={process.env.REACT_APP_API_URL + slider.img}/>
            </div>
            <div>
                <button className={classes.button_edit} value={slider.id} onClick={e => functionEdit(fetchOneSlider, e.target.value, 'slide')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={slider.id} onClick={(e) => functionDeleteAll(deleteOneSlider, e.target.value)}>Удалить</button>
            </div>
        </div>
    );
};

export default AdminDataSlider;