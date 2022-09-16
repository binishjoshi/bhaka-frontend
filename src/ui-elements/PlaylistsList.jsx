import './playlists-list.css';

const PlaylistsList = ({ playlistsInfo }) => {
  return (
    <table className='playlists-list-table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Song</th>
          <th scope='col'>Duration</th>
        </tr>
      </thead>
      {playlistsInfo && (
        <tbody>
          {playlistsInfo.map((playlist) => (
            <tr key={playlist.id}>
              <td>{playlistsInfo.indexOf(playlist) + 1}</td>
              <td>{playlist.name}</td>
              <td>{playlist.duration}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default PlaylistsList;
