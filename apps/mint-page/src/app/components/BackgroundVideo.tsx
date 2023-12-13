import React from 'react';

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video
        autoPlay
        loop
        muted
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
      >
        <source src="/assets/videos/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
