import { useState } from 'react';

import { useHttpClient } from '../hooks/http-hook';

import SearchSuggestions from './SearchSuggestions';

import './header-search.css';

import { lanAddress } from '../.lanAddress';

const HeaderSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedSongs, setSearchedSongs] = useState([]);
  const httpClient = useHttpClient();

  const searchChangeHandler = async (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value === '') {
      setShowSearch(false);
    } else {
      setShowSearch(true);

      const searchResponse = await httpClient.sendRequest(
        `http://${lanAddress}:5000/api/songs/search`,
        'POST',
        JSON.stringify({
          searchQuery: event.target.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      setSearchedSongs(searchResponse);
    }
  };

  const blurHander = () => {
    setShowSearch(false);
  };

  const focusHandler = () => {
    setShowSearch(true);
  }

  const searchSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={searchSubmitHandler}>
      <div className='searchbox-container'>
        <input
          id='search'
          type='text'
          placeholder='Search'
          onChange={searchChangeHandler}
          value={searchQuery}
          onBlur={blurHander}
          onFocus={focusHandler}
        />
        {showSearch && (
          <SearchSuggestions isLoading={httpClient.isLoading} songs={searchedSongs} />
        )}
      </div>
    </form>
  );
};

export default HeaderSearch;
