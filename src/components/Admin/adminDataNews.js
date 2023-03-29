import React from 'react';
import classes from "../../css/index.module.scss";
import {deleteOneNews, fetchOneNews} from "../../http/servicesAPI";

const AdminDataNews = ({news, functionDeleteAll, functionEdit}) => {
    return (
        <div className={classes.admin_right_content_userAndBrand}>
            <a>
                {news.title}
            </a>
            <a>
                {news.description}
            </a>
            <div>
                <img src={process.env.REACT_APP_API_URL + news.img}/>
            </div>
            <div>
                <button className={classes.button_edit} value={news.id} onClick={e => functionEdit(fetchOneNews, e.target.value, 'news')}>Редактировать</button>
                <button className={classes.button_delete} style={{marginTop: '10px'}} value={news.id} onClick={(e) => functionDeleteAll(deleteOneNews, e.target.value)}>Удалить</button>
            </div>
        </div>
    );
};

export default AdminDataNews;