import { useEffect, useState, useRef } from 'react';

import { useHttpClient } from '../hooks/http-hook';

import SearchSuggestions from './SearchSuggestions';

import './search.css';

import { lanAddress } from '../.lanAddress';

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedSongs, setSearchedSongs] = useState([]);
  const httpClient = useHttpClient();
  const searchBoxRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      searchBoxRef.current.focus();
    }
  });

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

  const focusHandler = () => {
    setShowSearch(true);
  };

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
          onFocus={focusHandler}
          autoComplete='off'
          ref={searchBoxRef}
        />
        {showSearch && (
          <SearchSuggestions
            isLoading={httpClient.isLoading}
            songs={searchedSongs}
          />
        )}
      </div>
    </form>
  );
};

export default Search;
