import { useRef, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import ArtistPage from './user-account-routes/ArtistPage';
import AlbumPage from './user-account-routes/AlbumPage';
import Profile from './user-account-routes/Profile';
import Search from './user-account-routes/Search';
import PlaylistPage from './user-account-routes/PlaylistPage';

import BottomPlayer from '../persistent-components/BottomPlayer';
import UserHeader from '../persistent-components/UserHeader';

import { PlayerContext } from '../context/player-context';

const Player = () => {
  const audioRefUp = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [next, setNext] = useState(false);

  const startAudio = () => {
    audioRefUp.current.load();
    audioRefUp.current.play();
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong: currentSong,
        queue: queue,
        next: next,
        playAudio: startAudio,
        setCurrentSong: setCurrentSong,
        setQueue: setQueue,
        setNext: setNext,
      }}
    >
      <UserHeader accountType='userAccount' />
      <div className='body-container'>
        <Switch>
          <Route path='/player' exact>
            <div>Player middle content</div>
          </Route>
          <Route path='/search' exact>
            <Search />
          </Route>
          <Route path='/profile' exact>
            <Profile />
          </Route>
          <Route path='/artist/:artistId' exact>
            <ArtistPage />
          </Route>
          <Route path='/album/:albumId' exact>
            <AlbumPage />
          </Route>
          <Route path='/playlist/:playlistId' exact>
            <PlaylistPage />
          </Route>
        </Switch>
      </div>
      <BottomPlayer ref={audioRefUp} />
    </PlayerContext.Provider>
  );
};

export default Player;
