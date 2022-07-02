import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const PlayerHeader = () => {
  const auth = useContext(AuthContext);

  const signOutHandler = () => {
    auth.logout();
  };

  return (
    <>
      Player Header
      <button onClick={signOutHandler}>Sign Out</button>
    </>
  );
};

export default PlayerHeader;
