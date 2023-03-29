import React from 'react';
import classes from "../../css/index.module.scss";
import {deleteOneBrands} from "../../http/deviceAPI";

const AdminDataBrand = ({brand, functionDeleteAll}) => {
    return (
        <div key={brand.id} className={classes.admin_right_content_userAndBrand}>
            <a style={{width: '10%'}}>
                {brand.id}
            </a>
            <a style={{width: '10%'}}>
                {brand.typeID}
            </a>
            <a>
                {brand.name}
            </a>
            <div>
                <button className={classes.button_edit} value={brand.id} onClick={() => alert('Здесь пусто')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={brand.id} onClick={e => functionDeleteAll(deleteOneBrands, e.target.value)}>Удалить</button>
            </div>
        </div>
    );
};

export default AdminDataBrand;