import { useContext, useEffect, forwardRef } from 'react';

import { PlayerContext } from '../context/player-context';

import { lanAddress } from '../.lanAddress';

import './bottom-player.css';
import PreviousButtonSVG from '../svg/PreviousButtonSVG';
import NextButtonSVG from '../svg/NextButtonSVG';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const BottomPlayer = forwardRef((props, ref) => {
  const player = useContext(PlayerContext);

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
          <PreviousButtonSVG />
          <NextButtonSVG onClick={nextSong} />
        </div>
        <audio controls ref={ref} onEnded={nextSong}>
          <source
            src={
              player.currentSong === null
                ? ''
                : `http://${lanAddress}:5000/api/songs/stream/${player.currentSong.id}/12e66066-38c7-4a3d-b357-b68ef2249e0c`
            }
            type='audio/ogg'
          />
        </audio>
      </div>
    </div>
  );
});

export default BottomPlayer;
