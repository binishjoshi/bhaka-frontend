import { useState } from 'react';

import SearchSuggestions from './SearchSuggestions';

import './header-search.css';

const HeaderSearch = ({ onChange, value }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchChangeHandler = (event) => {
    setSearchQuery(event.target.value);

    if (event.target.value === '') {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };

  const blurHander = () => {
    setShowSearch(false);
  };

  return (
    <form>
      <div className='searchbox-container'>
        <input
          id='search'
          type='text'
          placeholder='Search'
          onChange={searchChangeHandler}
          value={searchQuery}
          onBlur={blurHander}
        />
        {showSearch && <SearchSuggestions isLoading={isLoading} />}
      </div>
    </form>
  );
};

export default HeaderSearch;
