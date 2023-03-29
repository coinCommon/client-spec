import React from 'react';
import classes from "../../css/index.module.scss";
import {deleteOneDevices, fetchOneDevices} from "../../http/deviceAPI";



const AdminDataDevice = ({device, functionDeleteAll, recommend, functionEdit}) => {



    return (
        <div key={device.id} className={classes.admin_right_content_device}>
            {recommend.map(m => m === device.id ? <div key={m} className={classes.admin_recommended}>В избранном</div> : '')}
            <a>{device.id}</a>
            <a>{device.typeId}</a>
            <a style={{fontWeight: 'bold'}}>{device.price} р.</a>
            <a>{device.name}</a>
            <img alt={'img'} src={process.env.REACT_APP_API_URL + device.img[0]}/>
            <div>
                <button className={classes.button_edit} value={device.id} onClick={e => functionEdit(fetchOneDevices, e.target.value, 'device')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}}  value={device.id} onClick={e => functionDeleteAll(deleteOneDevices, e.target.value)}>Удалить</button>
            </div>
        </div>


    );
};

export default AdminDataDevice;

