import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './playlists-list.css';

const PlaylistsList = ({ playlistsInfo }) => {
  return (
    <table className='playlists-list-table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Playlist Name</th>
          <th scope='col'>Duration</th>
        </tr>
      </thead>
      {playlistsInfo && (
        <tbody>
          {playlistsInfo.map((playlist) => (
            <tr key={playlist.id}>
              <td>{playlistsInfo.indexOf(playlist) + 1}</td>
              <td>
                <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
              </td>
              <td>{playlist.duration}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default PlaylistsList;
