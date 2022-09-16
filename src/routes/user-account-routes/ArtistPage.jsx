import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { lanAddress } from '../../.lanAddress';

import { useHttpClient } from '../../hooks/http-hook';
import AlbumsList from '../../ui-elements/AlbumsList';

import './artist-page.css';

const ArtistPage = () => {
  let { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState(false);
  const [artistAlbums, setArtistAlbums] = useState(false);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchArtistInfo = async (artistId) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/artists/${artistId}`
        );
        setArtistInfo(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchArtistAlbums = async (artistId) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/albums/artist/${artistId}`
        );
        setArtistAlbums(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtistInfo(artistId);
    fetchArtistAlbums(artistId);
  }, [artistId, sendRequest]);
  return (
    <div className='artist-page-container'>
      {artistInfo && (
        <div className='artist-info-container'>
          <img alt='artist' src={`http://${lanAddress}:5000/${artistInfo.picture}`} />
          <div className='artist-text-info'>
            <span className='artist-title'>{artistInfo.name}</span>
            <span>{artistInfo.followers}</span>
            <span className='artist-description'>{artistInfo.description}</span>
          </div>
        </div>
      )}
      {artistAlbums && <AlbumsList albumsList={artistAlbums} />}
    </div>
  );
};

export default ArtistPage;
