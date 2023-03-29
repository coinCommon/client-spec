import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/HeaderAndFooter/NavBar";

import "./font/arsenal/arsenal.css"
import "./font/montserrat/montserrat.css"
import "./font/fontawesome/css/font-awesome.css"
import "./font/Comfortaa/stylesheet.css"
import "./font/JetBrainsMonoRegular/style.css"

import MenuBar from "./components/HeaderAndFooter/MenuBar";
import {Context} from "./index";
import {check, checkRole} from "./http/userAPI";
import Loader from "./components/Loaders/Loader";


const App = () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        checkRole().then(data => {
            user.setIsAdmin(true)
        })
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
            user.setUserID(data.id)
            user.setName(data.name)
            user.setEmail(data.email)
        }).finally(() => setLoading(false))
    }, [])


    if (loading) {
        return <Loader/>
    }


  return (
  <BrowserRouter>
      <NavBar/>
      <MenuBar />
      <AppRouter />
  </BrowserRouter>
  )
};

export default App;
