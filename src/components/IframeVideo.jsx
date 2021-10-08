import React from "react";

const IframeVideo = ({source}) => {
    if (!source) {
        return null;
    }

    const src = source;
    return <div className="video-container">
        <iframe width="853" height="480" src={src}
                frameBorder="0" allowFullScreen/>
    </div>
}

export default IframeVideo;