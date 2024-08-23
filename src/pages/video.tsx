import { useRef } from "react";

const VideoPlayerr = () => {
  const videoRef = useRef(null);
  const handleChange = () => {
    console.log(videoRef.current);
  };
  return (
    <div>
      <video ref={videoRef} onTimeUpdate={handleChange} autoPlay muted controls>
        <iframe
          src="https://drive.google.com/file/d/11wGtvBt5LPmM_9y_aidE62R87V6PXWsx/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayerr;
