import { createContext } from 'react';

export const PlayerContext = createContext({
  currentSong: {
    id: null,
    title: null,
    artist: null,
    albumCover: null,
  },
  queue: [],
  playAudio: () => {},
  setCurrentSong: () => {},
  setQueue: () => {},
});
