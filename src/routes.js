import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    CATALOG_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    NEWS_ROUTE,
    SERVICES_ROUTE,
    FEEDBACK_ROUTE,
    POLICE_ROUTE, AGREEMENT_ROUTE
} from "./utils/consts";
import Basket from "./pages/Basket";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop";
import Catalog from "./pages/Catalog";
import News from "./pages/News";
import Services from "./pages/Services";
import NewsPage from "./pages/NewsPage";
import ServicesPage from "./pages/ServicesPage";
import FeedBack from "./pages/FeedBack";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserAgreement from "./pages/UserAgreement";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const authRoutes = [
    // {
    //     path: BASKET_ROUTE,
    //     Component: Basket
    // }
]

export const publicRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: CATALOG_ROUTE + '/:typeId/:brandId',
        Component: Catalog
    },
    {
        path: FEEDBACK_ROUTE,
        Component: FeedBack
    },
    {
        path: POLICE_ROUTE,
        Component: PrivacyPolicy
    },
    {
        path: AGREEMENT_ROUTE,
        Component: UserAgreement
    },
    {
        path: NEWS_ROUTE + '/:id',
        Component: NewsPage
    },
    {
        path: SERVICES_ROUTE + '/:id',
        Component: ServicesPage
    },

    // <---
    {
        path: NEWS_ROUTE,
        Component: News
    },
    {
        path: SERVICES_ROUTE,
        Component: Services
    }
    // <---

]