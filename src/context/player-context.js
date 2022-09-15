import { createContext } from 'react';

export const PlayerContext = createContext({
  currentSong: {
    id: null,
    title: null,
    artist: null,
    artistId: null,
    albumId: null,
    albumCover: null,
  },
  queue: [],
  next: false,
  setNext: () => {},
  playAudio: () => {},
  setCurrentSong: () => {},
  setQueue: () => {},
});
