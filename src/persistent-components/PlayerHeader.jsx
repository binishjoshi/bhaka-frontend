import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

import HamburgerSVG from '../svg/HamburgerSVG';

import './player-header.css';

const PlayerHeader = () => {
  const auth = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const searchChangeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const signOutHandler = () => {
    auth.logout();
  };

  const Options = () => (
    <>
      <Link to='/player'>Home</Link>
      <Link to='/' onClick={signOutHandler}>
        Sign Out
      </Link>
    </>
  );

  return (
    <>
      <div className='player-header-container'>
        <div className='header-logo'>Bhaka</div>
        <div className='player-header-searchbox'>
          <form>
            <div className='searchbox-container'>
              <input
                id='search'
                type='text'
                placeholder='Search'
                onChange={searchChangeHandler}
                value={searchQuery}
              />
            </div>
          </form>
        </div>
        <div className='header-links'>
          <Options />
        </div>
        <div
          className='header-hamburger'
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        >
          <HamburgerSVG />
        </div>
      </div>
      {isHamburgerOpen && (
        <div
          className='hamburger-options'
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        >
          <Options />
        </div>
      )}
    </>
  );
};

export default PlayerHeader;
