import { useRef } from "react";

const VideoPlayerr = () => {
  const videoRef = useRef(null);
  const handleChange = () => {
    console.log(videoRef.current);
  };
  return (
    <div>
      <video autoPlay muted controls>
        <iframe
          src="https://drive.google.com/uc?id=11wGtvBt5LPmM_9y_aidE62R87V6PXWsx"
          ref={videoRef}
          onTimeUpdate={handleChange}
        ></iframe>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayerr;
