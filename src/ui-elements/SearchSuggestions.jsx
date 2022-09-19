import SearchSuggestion from './SearchSuggestion';
import ThreeDotsLoadingSVG from '../svg/ThreeDotLoadingSVG';
import './search-suggestions.css';

const SearchSuggestions = ({ isLoading, songs, userPlaylists }) => {
  const SearchContent = () => {
    if (isLoading) {
      return (
        <div className='loading-spinner'>
          <ThreeDotsLoadingSVG />
        </div>
      );
    } else if (songs.length === 0) {
      return (
        <div className='no-result'>
          <span>No results</span>
        </div>
      );
    } else {
      return (
        <ul>
          {songs.map((song) => (
            <SearchSuggestion
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              artistId={song.artistId}
              albumId={song.albumId}
              albumCover={song.coverArt}
              userPlaylists={userPlaylists}
            />
          ))}
        </ul>
      );
    }
  };
  return (
    <div className='search-suggestions-container'>
      <SearchContent />
    </div>
  );
};

export default SearchSuggestions;
