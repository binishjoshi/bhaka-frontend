import { createContext } from 'react';

export const PlayerContext = createContext({
  currentSong: null,
  queue: [],
  playAudio: () => {},
});
