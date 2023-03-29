import React, {useState} from 'react';
import {Carousel} from "react-carousel-minimal";
import classes from "../../css/index.module.scss";


const CarImgDeviceImg = ({items, loading}) => {


    const slideNumberStyle = {
        fontSize: '10px',
        fontWeight: '500',
    }

    // const image = [
    //     {image: process.env.REACT_APP_API_URL + 'no_image.svg'},
    // ]

return (
        <div className={classes.device_carosel}>
                <div className={classes.device_carosel_padding}>
                        <Carousel
                            data={items}
                            // width={document.documentElement.clientWidth < 765 ? '100%' : '500px'}
                            // height={document.documentElement.clientWidth < 765 ? '700px' : '500px'}
                            width={'500px'}
                            height={'500px'}
                            radius="30px"
                            slideNumber={false}
                            slideNumberStyle={slideNumberStyle}
                            captionPosition="bottom"
                            automatic={false}

                            // dots={true}

                            showNavBtn={true}

                            slideBackgroundColor="#fff"

                            slideImageFit="cover"

                            thumbnails={true}
                            thumbnailWidth={'80px'}
                            // captionStyle={captionStyle}
                            // pauseIconColor="white"
                            // pauseIconSize="40px"


                            style={{
                                position: 'relative',
                                    textAlign: "center",
                                    maxWidth: '600px',
                                    maxHeight: '600px',
                                    margin: "0",
                                    padding: '0',
                            }}
                        />
                </div>
        </div>
        );
};
export default CarImgDeviceImg;
