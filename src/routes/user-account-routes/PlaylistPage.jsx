import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lanAddress } from '../../.lanAddress';
import { useHttpClient } from '../../hooks/http-hook';
import SongsList from '../../ui-elements/SongsList';
import SongsListInfo from '../../ui-elements/SongsListInfo';

import './playlist-page.css';

const PlaylistPage = () => {
  let { playlistId } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState(false);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaylistInfo = async (playlistId) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/playlists/${playlistId}`
        );
        setPlaylistInfo(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaylistInfo(playlistId);
  }, [playlistId, sendRequest]);

  return (
    <div className='playlist-page-container'>
      {playlistInfo && <SongsListInfo listInfo={playlistInfo} />}
      {playlistInfo && <SongsList songsListInfo={playlistInfo.songs} />}
    </div>
  );
};

export default PlaylistPage;
