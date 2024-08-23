const VideoPlayerr = () => {
  return (
    <div>
      <video autoPlay muted controls>
        <source
          src="https://drive.google.com/thumbnail?id=11wGtvBt5LPmM_9y_aidE62R87V6PXWsx&sz=w1000"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayerr;
