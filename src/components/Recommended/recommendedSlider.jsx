import React from 'react';
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import classes from "../../css/index.module.scss";
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";


const RecommendedSlider = observer(({device}) => {
    const navigate = useNavigate()

    const responsive = {
        0: {
            items: 1,
        },
        576: {
            items: 2,
            itemsFit: 'contain',
        },
        767: {
            items: 4,
            itemsFit: 'contain',
        },
        1024: {
            items: 6,
            itemsFit: 'contain',
        }
    }

    const handleDragStart = (e) => e.preventDefault();

    return (
        <div style={{marginTop: '30px'}} className={classes.container}>
            <div className={classes.recommended_slider_title}>Рекомендуемое</div>
            <div className={classes.recommended_slider_style}>
                <div style={{width: '100%', position: 'relative'}}>
                    <AliceCarousel
                        items={device.recommendedDevice.map(m =>
                            <div className={classes.recommended_slider}>
                                <div className={classes.recommended_slider_flex}>
                                    <img src={process.env.REACT_APP_API_URL + m.img[0]} onDragStart={handleDragStart} role="presentation" />
                                </div>
                                <div
                                    className={classes.recommended_slider_name}
                                >
                                    {m.name}
                                </div>
                                <div className={classes.recommended_slider_price}>{m.price + ' руб'}</div>
                                <div>
                                    <div
                                        className={classes.recommended_slider_detailed}
                                        onClick={() => navigate(DEVICE_ROUTE + '/' + m.deviceId)}
                                    >
                                        Подробнее
                                    </div>
                                </div>
                            </div>
                        )}
                        animationType={"fadeout"}
                        autoPlay={true}
                        infinite={false}
                        animationDuration={800}
                        autoPlayInterval={2000}
                        autoHeight={true}
                        disableButtonsControls={false}
                        disableDotsControls={true}
                        mouseTracking={false}
                        touchTracking={true}
                        responsive={responsive}
                        keyboardNavigation={false}
                        // autoWidth={true}
                        // disableSlideInfo={false}
                    />

                </div>
            </div>
        </div>
    );
});

export default RecommendedSlider;