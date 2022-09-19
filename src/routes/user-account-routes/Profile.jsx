import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lanAddress } from '../../.lanAddress';
import { useHttpClient } from '../../hooks/http-hook';

import { AuthContext } from '../../context/auth-context';

import Button from '../../ui-elements/Button';
import CreatePlaylistModal from '../../ui-elements/CreatePlaylistModal';

import PhotoSVG from '../../svg/PhotoSVG';

import './profile.css';
import PlaylistsList from '../../ui-elements/PlaylistsList';

const Profile = () => {
  let { userId } = useParams();
  const [userInfo, setUserInfo] = useState(false);
  const [playlistsInfo, setPlaylistsInfo] = useState([]);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const storedToken = JSON.parse(localStorage.getItem('userData')).token;
  const user = useContext(AuthContext);
  const [localPreference, setLocalPreference] = useState(user.preference);

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

        if (responseData.createdPlaylists.length !== 0) {
          let playlistInfoArray = [];
          for (const playlistId of responseData.createdPlaylists) {
            try {
              const responseData = await sendRequest(
                `http://${lanAddress}:5000/api/playlists/${playlistId}`
              );
              playlistInfoArray.push({
                id: responseData.id,
                name: responseData.name.trimEnd(),
                duration: responseData.duration,
              });
            } catch (error) {
              console.log(error);
            }
          }
          setPlaylistsInfo(playlistInfoArray);
        }
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
  };

  const changeUserPreference = async () => {
    try {
      setLocalPreference(localPreference === 'opus' ? 'flac' : 'opus');
      user.changePreference(user.preference === 'opus' ? 'flac' : 'opus');
      await sendRequest(
        `http://${lanAddress}:5000/api/users/change-preference`,
        'PATCH',
        null,
        {
          Authorization: `Bearer ${storedToken}`,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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
            <span className='username'>Username: {userInfo.username}</span>
            <span className='username'>Email: {userInfo.email}</span>
            <span className='username'>
              Preference:{' '}
              {localPreference === 'opus' ? 'Lossy (Opus)' : 'Lossless (FLAC)'}
            </span>

            <Button hover onClick={changeUserPreference}>
              Switch preference to{' '}
              {localPreference === 'opus' ? 'Lossless (FLAC)' : 'Lossy (Opus)'}
            </Button>
          </div>
        </div>
      )}
      <CreatePlaylistModal
        show={showCreatePlaylist}
        onClose={closeCreatePlaylistModal}
      />
      <div className='user-playlists-container'>
        <Button onClick={handleCreatePlaylist} hover>
          Create Playlist
        </Button>
        {userInfo && userInfo.createdPlaylists.length !== 0 && (
          <PlaylistsList playlistsInfo={playlistsInfo} />
        )}
      </div>
    </div>
  );
};

export default Profile;
