import React from 'react';
import classes from "../../css/index.module.scss";
import {deleteOneTypes} from "../../http/deviceAPI";

const AdminDataType = ({type, functionDeleteAll}) => {
    return (
        <div key={type.id} className={classes.admin_right_content_type}>
            <a>
                {type.id}
            </a>
            <a>
                {type.name}
            </a>
            <div>
                <button className={classes.button_edit} value={type.id} onClick={() => alert('Здесь пусто')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={type.id} onClick={e => functionDeleteAll(deleteOneTypes, e.target.value)}>Удалить</button>
            </div>
        </div>
    );
};

export default AdminDataType;