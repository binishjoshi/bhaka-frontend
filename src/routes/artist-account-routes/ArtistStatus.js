import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

import Button from '../../ui-elements/Button';
import StatusTable from '../../ui-elements/StatusTable';

import { lanAddress } from '../../.lanAddress';

const ArtistStatus = () => {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState(false);
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchArtistId = async (id) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/artists/${id}`
        );
        setArtistData([
          ['Name', responseData.name],
          ['Description', responseData.description],
          [
            'Picture',
            <img
              src={`http://${lanAddress}:5000/${responseData.picture}`}
              alt='profile'
            />,
          ],
          ['Verified', responseData.verified ? 'Yes' : 'No'],
          [
            'Requested for Verification',
            responseData.requestForVerification ? (
              'Yes'
            ) : (
              <>
                No <Button hover>Request for Verification</Button>
              </>
            ),
          ],
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtistId(artistId);
  }, [artistId, sendRequest]);

  return (
    <div className='artist-status-container'>
      {isLoading && 'Loading...'}
      {artistData && (
        <StatusTable headerData={['', '']} bodyData={artistData} />
      )}
    </div>
  );
};

export default ArtistStatus;
