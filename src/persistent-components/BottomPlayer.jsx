import { forwardRef } from 'react';

import './bottom-player.css';

const BottomPlayer = forwardRef((props, ref) => {
  return (
    <div className='player-container'>
      <div className='song-info'>
        <div className='album-cover'>
          <img
            src='http://localhost:5000/uploads/images/c7ae92b0-0e76-11ed-b9a5-657055281b32.jpg'
            alt='album-cover'
          />
        </div>
        <div className='song-details'>
          <span className='song-title'>Song title</span>
          <span className='song-artist'>Song artist</span>
        </div>
      </div>
      <div className='player'>
        <audio controls ref={ref}>
          <source
            src='http://localhost:5000/api/songs/stream/b753af91-d6ce-4fad-946a-ba6c9e2d7189/45c9b573-7ec6-4e89-88d1-1e837771f44f'
            type='audio/ogg'
          />
        </audio>
      </div>
    </div>
  );
});

export default BottomPlayer;
