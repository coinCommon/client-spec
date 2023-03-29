import {Navigate, Route, Routes} from 'react-router-dom';
import {authRoutes, publicRoutes, adminRoutes} from "../routes";
import {SHOP_ROUTE, BASKET_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {useContext, useEffect} from "react";
import {Context} from "../index";



const AppRouter = () => {
    const {user} = useContext(Context)
    return (
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {user.isAuth && user.isAdmin && adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {/*Redirect*/}
                <Route path={BASKET_ROUTE} element={<Navigate to={LOGIN_ROUTE} />} />
                <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
            </Routes>
    )
};

export default AppRouter;