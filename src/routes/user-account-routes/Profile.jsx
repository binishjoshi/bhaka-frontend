import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lanAddress } from '../../.lanAddress';
import { useHttpClient } from '../../hooks/http-hook';

import Button from '../../ui-elements/Button';
import CreatePlaylistModal from '../../ui-elements/CreatePlaylistModal';

import PhotoSVG from '../../svg/PhotoSVG';

import './profile.css';

const Profile = () => {
  let { userId } = useParams();
  const [userInfo, setUserInfo] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const storedToken = JSON.parse(localStorage.getItem('userData')).token;

  useEffect(() => {
    const fetchUserInfo = async (userId, token) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/users/`,
          'GET',
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setUserInfo(responseData);
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo(userId, storedToken);
  }, [userId, storedToken, sendRequest]);

  const handleCreatePlaylist = () => {
    setShowCreatePlaylist(true);
  };

  const closeCreatePlaylistModal = () => {
    setShowCreatePlaylist(false);
  }

  return (
    <div className='profile-container'>
      {userInfo && (
        <div className='user-info'>
          {userInfo.profilePicture === null ? (
            <PhotoSVG height={300} width={300} />
          ) : (
            <img src={userInfo.profilePicture} alt='profile' />
          )}
          <div className='user-text-info'>
            <span className='username'>{userInfo.username}</span>
            <span className='username'>{userInfo.email}</span>
            <span className='username'>
              Preference:{' '}
              {userInfo.preference === 'opus'
                ? 'Lossy (Opus)'
                : 'Lossless (FLAC)'}
            </span>
          </div>
        </div>
      )}
      <CreatePlaylistModal show={showCreatePlaylist} onClose={closeCreatePlaylistModal} />
      <div className='user-playlists-container'>
        <Button onClick={handleCreatePlaylist} hover>Create Playlist</Button>
      </div>
    </div>
  );
};

export default Profile;
