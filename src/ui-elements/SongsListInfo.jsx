import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { lanAddress } from '../.lanAddress';

import './songs-list.info.css';

const SongsListInfo = ({ listInfo }) => {
  return (
    <div className='list-info-container'>
      <img
        src={`http://${lanAddress}:5000/${listInfo.coverImage}`}
        alt='list-cover'
      />
      <div className='list-text-info'>
        <span className='list-title'>{listInfo.title}</span>
        <Link to={`/artist/${listInfo.artistId}`}>
          <span className='list-artist'>{listInfo.artist}</span>
        </Link>
        <span className='list-year'>{listInfo.year}</span>
      </div>
    </div>
  );
};

export default SongsListInfo;
