import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketStore from "./store/BasketStore";
import ImageSlideStore from "./store/ImageSlideStore";
import NewsAndServicesStore from "./store/NewsAndServicesStore";

export const Context = createContext(null)

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        basket: new BasketStore(),
        slide: new ImageSlideStore(),
        services: new NewsAndServicesStore()
    }}>
        <App />
    </Context.Provider>
);