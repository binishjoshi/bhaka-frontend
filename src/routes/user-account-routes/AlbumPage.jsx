import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lanAddress } from '../../.lanAddress';
import { useHttpClient } from '../../hooks/http-hook';
import SongsList from '../../ui-elements/SongsList';
import SongsListInfo from '../../ui-elements/SongsListInfo';

import './album-page.css';

const AlbumPage = () => {
  let { albumId } = useParams();
  const [albumInfo, setAlbumInfo] = useState(false);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAlbumInfo = async (albumId) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/albums/${albumId}`
        );
        setAlbumInfo(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbumInfo(albumId);
  }, [albumId, sendRequest]);

  return (
    <div className='album-page-container'>
      {albumInfo && <SongsListInfo listInfo={albumInfo} />}
      {albumInfo && <SongsList songsListInfo={albumInfo.songs} />}
    </div>
  );
};

export default AlbumPage;
