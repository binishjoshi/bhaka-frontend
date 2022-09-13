import { Link } from 'react-router-dom';

import './footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      Footer
      <br />
      <Link to='/aritst-account-signup'>Artist Account Sign Up</Link>
      <br />
      <Link to='/aritst-account-signin'>Artist Account Sign In</Link>
    </div>
  );
};

export default Footer;
