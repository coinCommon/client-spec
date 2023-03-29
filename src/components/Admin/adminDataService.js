import React from 'react';
import classes from "../../css/index.module.scss";
import {deleteOneServices, fetchOneNews, fetchOneServices} from "../../http/servicesAPI";

const AdminDataService = ({service, functionDeleteAll, functionEdit}) => {
    return (
        <div className={classes.admin_right_content_userAndBrand}>
            <a>
                {service.title}
            </a>
            <a>
                {service.description}
            </a>
            <div>
                <img src={process.env.REACT_APP_API_URL + service.img}/>
            </div>
            <div>
                <button className={classes.button_edit} value={service.id} onClick={e => functionEdit(fetchOneServices, e.target.value, 'service')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={service.id} onClick={(e) => functionDeleteAll(deleteOneServices, e.target.value)}>Удалить</button>
            </div>
        </div>
    );
};

export default AdminDataService;