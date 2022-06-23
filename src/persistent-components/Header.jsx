import { Link } from 'react-router-dom';

import './header.css';

const Header = () => {
  return (
    <div class='header-container'>
      <div class='header-logo'>Bhaka</div>
      <div class='header-links'>
        <Link to='/'>Home</Link>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </div>
    </div>
  );
};

export default Header;
