import { createRef, useContext, useState } from 'react';
import { usePopper } from 'react-popper';

import { useHttpClient } from '../hooks/http-hook';

import { PlayerContext } from '../context/player-context';

import { lanAddress } from '../.lanAddress';

import Modal from './Modal';

import PlayButtonSVG from '../svg/PlayButtonSVG';
import ThreeDotVerticalSVG from '../svg/ThreeDotVerticalSVG';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import './search-suggestion.css';

const SearchSuggestion = ({
  id,
  title,
  artist,
  artistId,
  albumId,
  albumCover,
  userPlaylists,
}) => {
  const player = useContext(PlayerContext);
  const suggestionContainerRef = createRef(null);

  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [isPopperVisible, setIsPopperVisible] = useState(false);
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    }
  );

  const playSong = () => {
    player.setCurrentSong({
      id,
      title,
      artist,
      artistId,
      albumId,
      albumCover,
    });
    player.playAudio();
  };

  const queueSong = () => {
    player.setQueue([...player.queue, { id, title, artist, albumCover }]);
  };

  const showPopper = () => {
    popperElement.setAttribute('data-show', '');
    popperElement.addEventListener('mouseleave', hidePopper);
    suggestionContainerRef.current.addEventListener('mouseleave', hidePopper);
    setIsPopperVisible(true);
    update();
  };

  const hidePopper = () => {
    popperElement.removeAttribute('data-show');
    setIsPopperVisible(false);
  };

  const openAddToPlaylistModal = () => {
    setIsAddToPlaylistModalOpen(true);
  };

  const closeAddToPlaylistModal = () => {
    setIsAddToPlaylistModalOpen(false);
  };

  const handleAddToPlaylist = async (playlistId, songId) => {
    const storedToken = JSON.parse(localStorage.getItem('userData')).token;

    try {
      const responseData = await sendRequest(
        `http://${lanAddress}:5000/api/playlists/add`,
        'POST',
        JSON.stringify({
          playlistId: playlistId,
          songId: songId,
        }),
        {
          Authorization: `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        }
      );
      if (responseData.message === 'Success') {
        setIsAddToPlaylistModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li>
      <div className='search-suggestion-container' ref={suggestionContainerRef}>
        <Modal
          show={isAddToPlaylistModalOpen}
          onCancel={closeAddToPlaylistModal}
          className='playlists-modal'
        >
          {userPlaylists.length === 0 ? (
            <label>No playlists found.</label>
          ) : (
            userPlaylists.map((playlist) => {
              return (
                <div key={playlist.id}>
                  <h4>Choose a playlist</h4>
                  <span onClick={() => handleAddToPlaylist(playlist.id, id)}>
                    {playlist.name}
                    <br />
                    {isLoading && 'Adding to playlist'}
                  </span>
                </div>
              );
            })
          )}
        </Modal>

        <div className='search-suggestion-info'>
          <div className='album-cover'>
            <img src={`http://${lanAddress}:5000/${albumCover}`} alt='cover' />
            <PlayButtonSVG className='play-button' onClick={playSong} />
          </div>
          <div className='search-info'>
            <Link to={`/album/${albumId}`}>
              <h4>{title}</h4>
            </Link>
            <Link to={`/artist/${artistId}`}>
              <h6>{artist}</h6>
            </Link>
          </div>
        </div>
        <div
          className='options'
          onClick={isPopperVisible ? hidePopper : showPopper}
          ref={setReferenceElement}
        >
          <ThreeDotVerticalSVG />
        </div>
        <div
          className='popper'
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <ul>
            <li onClick={queueSong}>Add to queue</li>
            <li>Like</li>
            <li onClick={openAddToPlaylistModal}>Add to playlist</li>
          </ul>
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      </div>
    </li>
  );
};

export default SearchSuggestion;
