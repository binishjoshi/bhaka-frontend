import PlaylistAddSVG from '../svg/PlaylistAddSVG';
import './songs-list.css';

const SongsList = ({ songsListInfo, addToPlaylist }) => {
  return (
    <table className='songs-list-table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Song</th>
          <th scope='col'>Duration</th>
          {addToPlaylist && <th scope='col'>Add to playlist</th>}
        </tr>
      </thead>
      {songsListInfo && (
        <tbody>
          {songsListInfo.map((song) => {
            const durationMinute = Math.floor(song.songDuration / 60);
            const durationSeconds = Math.floor(
              song.songDuration - durationMinute * 60
            );
            return (
              <tr key={songsListInfo.indexOf(song) + 1} className='song-row'>
                <td>{songsListInfo.indexOf(song) + 1}</td>
                <td>{song.songTitle}</td>
                <td>
                  {durationMinute}:{durationSeconds}
                </td>
                {addToPlaylist && (
                  <td>
                    <PlaylistAddSVG />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default SongsList;
