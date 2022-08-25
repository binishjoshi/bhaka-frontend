import { useRef } from 'react';
import { Route, Switch } from 'react-router-dom';

import BottomPlayer from '../persistent-components/BottomPlayer';
import PlayerHeader from '../persistent-components/PlayerHeader';

import { PlayerContext } from '../context/player-context';

const Player = () => {
  const audioRefUp = useRef(null);
  const startAudio = () => {
    audioRefUp.current.play();
  }
  return (
    <PlayerContext.Provider
      value={{
        currentSong: null,
        queue: [],
        playAudio: startAudio
      }}
    >
      <PlayerHeader />
      <div className='body-container'>
        <Switch>
          <Route path='/player' exact>
            <div>Player middle content</div>
          </Route>
        </Switch>
      </div>
      <BottomPlayer ref={audioRefUp} />
    </PlayerContext.Provider>
  );
};

export default Player;
