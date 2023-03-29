import React from 'react';
import classes from "../../css/index.module.scss";
import {fetchBasket} from "../../http/basketAPI";
import {deleteOneUser} from "../../http/userAPI";


const AdminDataUser = ({user, functionDeleteAll, basketId, setBasketId, counter, setCounter}) => {
    return (
        <div key={user.id} className={classes.admin_right_content_userAndBrand}>
            <a>
                {user.name}
            </a>
            <a>
                {user.email}
            </a>
            <a>
                {user.role}
            </a>
            <div>
                <button className={classes.button_edit} value={user.id} onClick={(e) => {
                    setBasketId(e.target.value)
                    setCounter(17)
                } }>Корзина</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={user.id} onClick={e => functionDeleteAll(deleteOneUser, e.target.value)}>Удалить</button>
            </div>
        </div>


    );
};

export default AdminDataUser;