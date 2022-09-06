import { useContext, useEffect, forwardRef } from 'react';

import { PlayerContext } from '../context/player-context';

import { lanAddress } from '../.lanAddress';

import './bottom-player.css';

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
        <audio controls ref={ref} onEnded={nextSong}>
          <source
            src={`http://${lanAddress}:5000/api/songs/stream/${
              player.currentSong === null ? 'none' : player.currentSong.id
            }/868c4ce2-ff4b-47cf-82e4-4fe35fe5a279`}
            type='audio/ogg'
          />
        </audio>
      </div>
    </div>
  );
});

export default BottomPlayer;
