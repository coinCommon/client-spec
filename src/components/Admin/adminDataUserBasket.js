import React from 'react';
import classes from "../../css/index.module.scss";
import {DestroyBasket} from "../../http/basketAPI";


const AdminDataUserBasket = ({basketUser, functionDelete}) => {
    return (
        <div key={basketUser.id} style={basketUser.status === 'SEND' ? {borderColor: '#35dbbf'} : {}} className={classes.admin_right_content_device}>
            {basketUser.status === 'SEND' ?
                <div style={{background: '#35dbbf'}} className={classes.admin_recommended}>Заявка отправлена</div>
                :
                <div style={{background: '#444'}} className={classes.admin_recommended}>В корзине у пользователя</div>
            }
            <a>
                {basketUser.id}
            </a>
            <a>
                {basketUser.price}
            </a>
            <div>
                {basketUser.quantity.map(m =>
                    <div key={m.number} style={{display: 'flex'}}>
                        <a style={{fontSize: '10px', paddingRight: '10px'}}>{m.value}</a>
                        <a style={{fontSize: '10px'}}>{m.quantity}</a>
                    </div>
                )}
            </div>
            {/*<a>*/}
            {/*    {basketUser.status}*/}
            {/*</a>*/}
            <a>
                {basketUser.deviceName}
            </a>
            <a>
                <img src={process.env.REACT_APP_API_URL + basketUser.img}/>
            </a>

            <div>
                <button className={classes.button_edit} value={basketUser.id} onClick={(e) => alert('Здесь пусто')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={[basketUser.id, basketUser.id]} onClick={e => functionDelete(DestroyBasket, basketUser.id, basketUser.basketId)}>Удалить</button>
            </div>
        </div>


    );
};

export default AdminDataUserBasket;