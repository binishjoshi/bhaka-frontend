import PlayButtonSVG from '../svg/PlayButtonSVG';
import ThreeDotsLoadingSVG from '../svg/ThreeDotLoadingSVG';
import './search-suggestions.css';

const SearchSuggestion = ({ title, album, year, image }) => {
  return (
    <li>
      <div className='search-suggestion-container'>
        <div className='album-cover'>
          <img src={image} alt='cover' />
          <PlayButtonSVG className='play-button' />
        </div>
        <div className='search-info'>
          <h4>{title}</h4>
          <h6>
            {album} <span>({year})</span>
          </h6>
        </div>
      </div>
    </li>
  );
};

const SearchSuggestions = ({ isLoading }) => {
  return (
    <div className='search-suggestions-container'>
      {isLoading ? (
        <div className='loading-spinner'>
          <ThreeDotsLoadingSVG />
        </div>
      ) : (
        <ul>
          <SearchSuggestion
            title='SEVENTH HEAVEN'
            album='visions'
            year='2022'
            image='https://s.eximg.jp/expub/feed/LP_P_PIA/2021/LP_P_PIA_0051281c_38b4_47df_8aea_abbeaab90d5c/LP_P_PIA_0051281c_38b4_47df_8aea_abbeaab90d5c_e47af65006cthumbnail_1.jpg'
          />
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestions;
