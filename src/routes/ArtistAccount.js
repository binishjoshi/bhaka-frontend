import { Route, Switch } from 'react-router-dom';

import ArtistsStatus from './artist-account-routes/ArtistsStatus';
import ArtistStatus from './artist-account-routes/ArtistStatus';
import AlbumsStatus from './artist-account-routes/AlbumsStatus';
import AlbumStatus from './artist-account-routes/AlbumStatus';
import NewAlbum from './artist-account-routes/NewAlbum';
import NewArtist from './artist-account-routes/NewArtist';

import UserHeader from '../persistent-components/UserHeader';
import AlbumPage from './user-account-routes/AlbumPage';

const ArtistAccount = () => {
  return (
    <>
      <UserHeader accountType='artistAccount' />
      <div className='body-container'>
        <Switch>
          <Route path='/artist-status' exact>
            <ArtistsStatus />
          </Route>
          <Route path='/album-status' exact>
            <AlbumsStatus />
          </Route>
          <Route path='/new-album' exact>
            <NewAlbum />
          </Route>
          <Route path='/new-artist' exact>
            <NewArtist />
          </Route>
          <Route path='/status/artist/:artistId' exact>
            <ArtistStatus />
          </Route>
          <Route path='/status/album/:albumId' exact>
            <AlbumStatus />
          </Route>
          <Route path='/album/:albumId' exact>
            <AlbumPage />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default ArtistAccount;
