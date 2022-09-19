import { useContext, useEffect, forwardRef } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import { PlayerContext } from '../context/player-context';

import { lanAddress } from '../.lanAddress';

import './bottom-player.css';
import PreviousButtonSVG from '../svg/PreviousButtonSVG';
import NextButtonSVG from '../svg/NextButtonSVG';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ListSVG from '../svg/ListSVG';

const BottomPlayer = forwardRef((props, ref) => {
  const player = useContext(PlayerContext);
  const user = useContext(AuthContext);
  const history = useHistory();

  const nextSong = () => {
    if (player.queue.length === 0) return;
    player.setCurrentSong(player.queue[0]);
    player.queue.shift();
    player.setNext(true);
  };

  useEffect(() => {
    if (player.currentSong !== null && player.next) {
      player.playAudio();
      player.setNext(false);
    }
  });

  return (
    <div className='player-container'>
      <div className='song-info'>
        <div className='album-cover'>
          {player.currentSong === null ? (
            ''
          ) : (
            <img
              src={`http://${lanAddress}:5000/${player.currentSong.albumCover}`}
              alt='album-cover'
            />
          )}
        </div>
        {player.currentSong === null ? null : (
          <div className='song-details'>
            <span className='song-title'>
              <Link to={`/album/${player.currentSong.albumId}`}>
                {player.currentSong.title}
              </Link>
            </span>
            <span className='song-artist'>
              <Link to={`/artist/${player.currentSong.artistId}`}>
                {player.currentSong.artist}
              </Link>
            </span>
          </div>
        )}
      </div>
      <div className='player'>
        <div className='player-external-control'>
          <ListSVG
            onClick={() => {
              history.push('/queue');
            }}
          />
          <PreviousButtonSVG />
          <NextButtonSVG onClick={nextSong} />
        </div>
        <audio controls ref={ref} onEnded={nextSong}>
          <source
            src={
              player.currentSong === null
                ? ''
                : `http://${lanAddress}:5000/api/songs/stream/${player.currentSong.id}/${user.id}`
            }
            type='audio/ogg'
          />
        </audio>
      </div>
    </div>
  );
});

export default BottomPlayer;
