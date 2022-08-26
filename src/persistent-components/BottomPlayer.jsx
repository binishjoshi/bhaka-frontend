import { useContext, forwardRef } from 'react';

import { PlayerContext } from '../context/player-context';

import { lanAddress } from '../.lanAddress';

import './bottom-player.css';

const BottomPlayer = forwardRef((props, ref) => {
  const player = useContext(PlayerContext);
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
        <div className='song-details'>
          <span className='song-title'>
            {player.currentSong === null ? '' : player.currentSong.title}
          </span>
          <span className='song-artist'>
            {player.currentSong === null ? '' : player.currentSong.artist}
          </span>
        </div>
      </div>
      <div className='player'>
        <audio controls ref={ref}>
          <source
            src={`http://${lanAddress}:5000/api/songs/stream/${
              player.currentSong === null ? 'none' : player.currentSong.id
            }/45c9b573-7ec6-4e89-88d1-1e837771f44f`}
            type='audio/ogg'
          />
        </audio>
      </div>
    </div>
  );
});

export default BottomPlayer;
