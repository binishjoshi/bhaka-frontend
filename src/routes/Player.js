import { useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Search from '../ui-elements/Search';

import BottomPlayer from '../persistent-components/BottomPlayer';
import PlayerHeader from '../persistent-components/PlayerHeader';

import { PlayerContext } from '../context/player-context';

const Player = () => {
  const audioRefUp = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);

  const startAudio = () => {
    audioRefUp.current.load();
    audioRefUp.current.play();
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong: currentSong,
        queue: queue,
        playAudio: startAudio,
        setCurrentSong: setCurrentSong,
        setQueue: setQueue,
      }}
    >
      <PlayerHeader />
      <div className='body-container'>
        <Switch>
          <Route path='/player' exact>
            <div>Player middle content</div>
          </Route>
          <Route path='/search' exact>
            <Search />
          </Route>
        </Switch>
      </div>
      <BottomPlayer ref={audioRefUp} />
    </PlayerContext.Provider>
  );
};

export default Player;
