import React from 'react';
import {Carousel} from "react-carousel-minimal";
// Не используется
const SlideImg = ({image}) => {

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
        color: 'red'
    }
    return (
        <div style={{ textAlign: "center" }}>
            <div style={{
                padding: "0"
            }}>
                <Carousel
                    data={image}
                    width="500px"
                    height="500px"
                    captionStyle={captionStyle}
                    radius="30px"
                    slideNumber={false}
                    captionPosition="bottom"
                    automatic={false}
                    dots={false}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="#f1f1f1"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth={'90px'}
                    style={{
                        textAlign: "center",
                        width: "600px",
                        maxHeight: "600px",
                        margin: "0 auto",
                        padding: '0',
                    }}
                />
            </div>
        </div>
    );
};

export default SlideImg;