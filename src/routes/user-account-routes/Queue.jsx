import { useContext } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { lanAddress } from '../../.lanAddress';

import { PlayerContext } from '../../context/player-context';
import SongsList from '../../ui-elements/SongsList';

import './queue.css';

const Queue = () => {
  const player = useContext(PlayerContext);
  let songsListInfo = [];
  for (const songQueue of player.queue) {
    songsListInfo.push({
      songId: songQueue.id,
      songTitle: songQueue.title,
      songDuration: '',
    });
  }
  return (
    <div className='queue-container'>
      {player.currentSong === null ? (
        <>No song playing</>
      ) : (
        <div className='now-playing-container'>
          <h4>Now Playing</h4>
          <img
            src={`http://${lanAddress}:5000/${player.currentSong.albumCover}`}
            alt='cover'
          />
          <div className='now-playing-text-info'>
            <span className='song-title'>
              <Link to={`/album/${player.currentSong.albumId}`}>
                {player.currentSong.title}
              </Link>
            </span>
            <span>
              <Link to={`/artist/${player.currentSong.artistId}`}>
                {player.currentSong.artist}
              </Link>
            </span>
          </div>
        </div>
      )}
      <div className='queue'>
        <h4>Queued Songs</h4>
        {player.queue.length !== 0 ? (
          <div className='queue-list-container'>
            <SongsList songsListInfo={songsListInfo} addToPlaylist={false} />
          </div>
        ) : (
          <>No songs in queue</>
        )}
      </div>
    </div>
  );
};

export default Queue;
