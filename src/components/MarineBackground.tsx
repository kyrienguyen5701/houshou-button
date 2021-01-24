import React from "react";
import MarineGallery from "./MarineGallery";

export interface MarineBackgroundState {
    video: string,
    loop: boolean,
    disableGallery: boolean,
    imageIndex: number
}

const MarineBackground =  (props: MarineBackgroundState) => {
    return (
        <div>
            {props.video
                ? <video className="background image-gallery-image"
                         src={props.video}
                         autoPlay loop={props.loop}
                >
                </video>
                : <MarineGallery
                    autoPlay={!props.disableGallery}
                    imageIndex={props.imageIndex}
                />
            }
        </div>
    )
}

export default MarineBackground;
