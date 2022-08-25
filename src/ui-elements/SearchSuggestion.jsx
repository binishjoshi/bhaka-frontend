import { PlayerContext } from '../context/player-context';

import { lanAddress } from '../.lanAddress';

import PlayButtonSVG from '../svg/PlayButtonSVG';
import { useContext } from 'react';

const SearchSuggestion = ({ title, artist, albumCover }) => {
  const player = useContext(PlayerContext);

  const playSong = () => {
    console.log('click');
    player.playAudio();
  }
  return (
    <li>
      <div className='search-suggestion-container'>
        <div className='album-cover'>
          <img src={`http://${lanAddress}:5000/${albumCover}`} alt='cover' />
          <PlayButtonSVG className='play-button' onClick={playSong} />
        </div>
        <div className='search-info'>
          <h4>{title}</h4>
          <h6>{artist}</h6>
        </div>
      </div>
    </li>
  );
};

export default SearchSuggestion;
