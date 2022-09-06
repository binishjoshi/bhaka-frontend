import { createRef, useContext, useState } from 'react';
import { usePopper } from 'react-popper';

import { PlayerContext } from '../context/player-context';

import { lanAddress } from '../.lanAddress';

import PlayButtonSVG from '../svg/PlayButtonSVG';
import ThreeDotVerticalSVG from '../svg/ThreeDotVerticalSVG';

const SearchSuggestion = ({ id, title, artist, albumCover }) => {
  const player = useContext(PlayerContext);
  const suggestionContainerRef = createRef(null);
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

  return (
    <li>
      <div className='search-suggestion-container' ref={suggestionContainerRef}>
        <div className='search-suggestion-info'>
          <div className='album-cover'>
            <img src={`http://${lanAddress}:5000/${albumCover}`} alt='cover' />
            <PlayButtonSVG className='play-button' onClick={playSong} />
          </div>
          <div className='search-info'>
            <h4>{title}</h4>
            <h6>{artist}</h6>
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
            <li>Add to playlist</li>
          </ul>
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      </div>
    </li>
  );
};

export default SearchSuggestion;
