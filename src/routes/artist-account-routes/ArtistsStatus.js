import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

import Button from '../../ui-elements/Button';
import StatusTable from '../../ui-elements/StatusTable';

import { lanAddress } from '../../.lanAddress';

const ArtistsStatus = () => {
  const [artistsData, setArtistsData] = useState(false);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('userData')).token;
    const fetchArtistsData = async (token) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/artist-accounts/artists`,
          'GET',
          null,
          {
            Authorization: `Bearer ${storedToken}`,
          }
        );

        let artistsDataArray = [];
        for (const artist of responseData.artists) {
          artistsDataArray.push([
            <Link to={`status/artist/${artist.artistId}`}>
              {artist.artistName}
            </Link>,
            artist.verified ? 'Yes' : 'No',
          ]);
        }

        setArtistsData(artistsDataArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtistsData(storedToken);
  }, [sendRequest]);

  return (
    <div className='artist-status-container'>
      <Link to='/new-artist'>
        <Button hover>Create New Artist</Button>
      </Link>
      {isLoading && 'Loading...'}
      {artistsData && (
        <StatusTable
          headerData={['Artist', 'Verified']}
          bodyData={artistsData}
        />
      )}
    </div>
  );
};

export default ArtistsStatus;
