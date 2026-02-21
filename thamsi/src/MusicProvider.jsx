// src/MusicProvider.jsx
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { Howl } from "howler";

import song1 from "./music/song1.mp3";
import song2 from "./music/song2.mp3";
import song3 from "./music/song3.mp3";
import song4 from "./music/song4.mp3";
import song5 from "./music/song5.mp3";




const MusicContext = createContext();

export function MusicProvider({ children }) {
  const songs = [
    { title: "Khat", src: song5 },
    { title: "Dekha Hi Nahi", src: song1 },
    { title: "Falling In Love With You", src: song2 },
    { title: "Tum Hi Ho", src: song3 },
    { title: "Tomake E bhalo Legeche", src: song4 },
    { title: "Khat", src: song5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [songs[currentIndex].src],
      html5: true,
      onend: () => playNext(),
    });

    if (isPlaying) soundRef.current.play();

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.unload();
      }
    };
  }, [currentIndex, isPlaying]);

  return (
    <MusicContext.Provider
      value={{
        songs,
        currentIndex,
        isPlaying,
        playNext,
        playPrevious,
        togglePlayPause,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
