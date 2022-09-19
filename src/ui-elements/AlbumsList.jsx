import { Link } from 'react-router-dom';

import './albums-list.css';

const AlbumsList = ({ albumsList, includeInterval = true }) => {
  return (
    <table className='albums-list-table'>
      <thead className='album-table-heading'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Album</th>
          <th scope='col'>Type</th>
          {includeInterval && <th scope='col'>Interval</th>}
        </tr>
      </thead>
      <tbody>
        {albumsList.map((album) => (
          <tr className='album-row' key={album.id}>
            <td>{albumsList.indexOf(album) + 1}</td>
            <td>
              <Link className='album-title' to={`/album/${album.id}`}>
                {album.title}
              </Link>
            </td>
            <td>{album.type}</td>
            {includeInterval && <td>{album.interval}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlbumsList;
