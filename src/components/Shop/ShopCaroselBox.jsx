import React, {useState} from 'react';
import Carousel from "nuka-carousel";
import classes from "../../css/index.module.scss";
import Loader from "../Loaders/Loader";
import LoaderRelative from "../Loaders/LoaderRelative";
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE, CATALOG_ROUTE} from "../../utils/consts";
import OpenMenu from "../../hocks/openMenu";

const ShopCaroselBox = ({services}) => {

    const navigate = useNavigate()
    const [digger, setDigger] = useState(false)
    // setTimeout(() => {
    //     setDigger(true)
    // }, 1000)
    // if (!digger) {
    //     return <LoaderRelative/>
    // }

    return (
        <div className={classes.slider_style}>
                <div className={classes.slider_style_slide}>
                    <Carousel
                        defaultControlsConfig={{
                        nextButtonText: <i className="fa fa-chevron-right" aria-hidden="true"></i>,
                        prevButtonText: <i className="fa fa-chevron-left" aria-hidden="true"></i>,
                        pagingDotsStyle: {
                            display: "none",
                        },
                            prevButtonStyle: {
                            padding: "30px 10px",
                            color: "#eeeeee"
                        },
                            nextButtonStyle: {
                            padding: "30px 10px",
                            color: "#eeeeee"
                            },
                    }}
                        swiping={true}
                        pauseOnHover={true}
                        withoutControls={false}
                        speed={1500}
                        autoplayInterval={4000}
                        wrapAround={true}
                        autoplay={true}>


                        {services.getSlide.map(slide =>
                            <a key={slide.id} className={classes.carosel_content}>
                                <img src={process.env.REACT_APP_API_URL + slide.img} />
                                <div>
                                    <label>
                                        {slide.title}
                                    </label>
                                    <button onClick={() => navigate(slide.href)}>Перейти</button>
                                </div>
                            </a>
                        )}

                    </Carousel>
                </div>

                <div onClick={OpenMenu} className={classes.slide_div_right}>
                    <img className={classes.slide_right} src={require('../../img/slide_right.webp')} />
                </div>
        </div>
    );
};

export default ShopCaroselBox;