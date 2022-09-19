import { useEffect, useState, useRef } from 'react';

import { useHttpClient } from '../../hooks/http-hook';

import SearchSuggestions from '../../ui-elements/SearchSuggestions';

import './search.css';

import { lanAddress } from '../../.lanAddress';

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState(false);
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const searchBoxRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      searchBoxRef.current.focus();
    }

    const storedToken = JSON.parse(localStorage.getItem('userData')).token;
    const getUserPlaylists = async (token) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/users/playlists`,
          'GET',
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setUserPlaylists(responseData.userPlaylists);
      } catch (error) {
        console.log(error);
      }
    };
    getUserPlaylists(storedToken);
  }, [sendRequest]);

  const searchChangeHandler = async (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value === '') {
      setShowSearch(false);
    } else {
      setShowSearch(true);

      const searchResponse = await sendRequest(
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
        {showSearch && userPlaylists && (
          <SearchSuggestions
            isLoading={isLoading}
            songs={searchedSongs}
            userPlaylists={userPlaylists}
          />
        )}
      </div>
    </form>
  );
};

export default Search;
