import React from 'react';
import classes from "../../css/index.module.scss";
import {deleteOnePopular, fetchOnePopular} from "../../http/deviceAPI";

const AdminDataPopular = ({popular, functionDeleteAll, functionEdit}) => {
    return (
        <div className={classes.admin_right_content_popular_slider}>
            <a>
                {popular.id}
            </a>
            <a>
                {popular.name}
            </a>
            <div>
                <img src={process.env.REACT_APP_API_URL + popular.img}/>
            </div>
            <div>
                <button className={classes.button_edit} value={popular.id} onClick={e => functionEdit(fetchOnePopular, e.target.value, 'popular')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={popular.id} onClick={(e) => functionDeleteAll(deleteOnePopular, e.target.value)}>Удалить</button>
            </div>
        </div>
    );
};

export default AdminDataPopular;