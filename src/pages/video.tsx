const VideoPlayerr = () => {
  return (
    <div>
      <video autoPlay muted controls>
        <source
          src="https://drive.google.com/file/d/11wGtvBt5LPmM_9y_aidE62R87V6PXWsx/view?usp=sharing"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayerr;
