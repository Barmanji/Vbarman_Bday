
import React, { useRef, useEffect } from 'react';

const MusicPlayer = ({ audioSrc, playMusic }) => {
  const audioRef = useRef(null);

  // Function to start playing the music
  const handlePlayMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(err => {
        console.log("Failed to start audio:", err);
      });
    }
  };

  // Start playing music only when `playMusic` becomes true
  useEffect(() => {
    if (playMusic) {
      console.log("Playing music!");  // Log when music should start
      handlePlayMusic();
    } else {
      console.log("Music stopped.");
    }
  }, [playMusic]);

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop />
    </>
  );
};

export default MusicPlayer;

