import React, { useState, useEffect } from 'react';

const useAudio = (url) => {
  const [audio] = useState(() => new Audio('/music/ryan_andersen_synthwave.mp3'));
  const [playing, setPlaying] = useState(false);
  audio.volume = 0.2;
  audio.loop = true;
  const toggle = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    playing ? audio.play().catch(() => {}) : audio.pause();
  }, [playing]);

  useEffect(() => {
    const initialAudio = function () {
      toggle();
      window.removeEventListener('click', initialAudio, false);
    };
    window.addEventListener('click', initialAudio, false);

    const onEnded = () => setPlaying(false);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, []);
  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div id="audio-player">
      <button id="audio-button" onClick={toggle}>
        <img src="/icon/audio.png" alt="play-audio-icon" />
      </button>
      {playing && (
        <div id="song-info">
          <h3>Synthwave</h3>
          <h4>Ryan Andersen</h4>
        </div>
      )}
    </div>
  );
};

export default Player;
