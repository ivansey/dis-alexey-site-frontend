import React from "react";

const IframeVideo = ({source}) => {
    if (!source) {
        return null;
    }

    const src = source;
    return <div className="video-container">
        <iframe width="100%" height="300px" src={src}
                frameBorder="0" allowFullScreen/>
    </div>
}

export default IframeVideo;