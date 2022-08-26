import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

import HamburgerSVG from '../svg/HamburgerSVG';

import './player-header.css';

const PlayerHeader = () => {
  const auth = useContext(AuthContext);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const signOutHandler = () => {
    auth.logout();
  };

  const Options = () => (
    <>
      <Link to='/player'>Home</Link>
      <Link to='/search'>Search</Link>
      <Link to='/' onClick={signOutHandler}>
        Sign Out
      </Link>
    </>
  );

  return (
    <>
      <div className='player-header-container'>
        <div className='header-logo'>Bhaka</div>
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
