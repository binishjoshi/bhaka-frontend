import { useState } from 'react';
import { Link } from 'react-router-dom';

import HamburgerSVG from '../svg/HamburgerSVG';

import './header.css';

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <>
      <div className='header-container'>
        <div className='header-logo'>Bhaka</div>
        <div className='header-links'>
          <Link to='/'>Home</Link>
          <Link to='/sign-up'>Sign Up</Link>
          <Link to='/sign-in'>Sign In</Link>
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
          <Link to='/'>Home</Link>
          <Link to='/sign-up'>Sign Up</Link>
          <Link to='/sign-in'>Sign In</Link>
        </div>
      )}
    </>
  );
};

export default Header;
