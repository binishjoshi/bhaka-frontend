import { lanAddress } from '../.lanAddress';

import PlayButtonSVG from '../svg/PlayButtonSVG';

const SearchSuggestion = ({ title, artist, albumCover }) => {
  return (
    <li>
      <div className='search-suggestion-container'>
        <div className='album-cover'>
          <img src={`http://${lanAddress}:5000/${albumCover}`} alt='cover' />
          <PlayButtonSVG className='play-button' />
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
