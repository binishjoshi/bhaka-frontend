import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

import { PlayerContext } from '../../context/player-context';

import SongsList from '../../ui-elements/SongsList';
import SongsListInfo from '../../ui-elements/SongsListInfo';

import PlayButtonSVG from '../../svg/PlayButtonSVG';

import { lanAddress } from '../../.lanAddress';

import './playlist-page.css';

const PlaylistPage = () => {
  let { playlistId } = useParams();
  const [playlistInfo, setPlaylistInfo] = useState(false);
  const player = useContext(PlayerContext);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaylistInfo = async (playlistId) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/playlists/${playlistId}`
        );
        setPlaylistInfo(responseData);
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaylistInfo(playlistId);
  }, [playlistId, sendRequest]);

  const addPlaylistToQueue = () => {
    if (player.currentSong === null) {
      player.setCurrentSong({
        id: playlistInfo.songs[0].songId,
        title: playlistInfo.songs[0].songTitle,
        artist: playlistInfo.songs[0].artist,
        artistId: playlistInfo.songs[0].artistId,
        albumId: playlistInfo.songs[0].albumId,
        albumCover: playlistInfo.songs[0].albumCover,
      });
      player.playAudio();
    } else {
      for (const song of playlistInfo.songs) {
        player.setQueue([
          ...player.queue,
          {
            id: song.songId,
            title: song.songTitle,
            artist: song.artist,
            albumCover: song.albumCover,
          },
        ]);
      }
    }
  };

  return (
    <div className='playlist-page-container'>
      {playlistInfo && <SongsListInfo listInfo={playlistInfo} />}
      <div className='play-playlist-container' onClick={addPlaylistToQueue}>
        <PlayButtonSVG className='playlist-play' />
        <span>Play/Queue</span>
      </div>
      {playlistInfo && <SongsList songsListInfo={playlistInfo.songs} />}
    </div>
  );
};

export default PlaylistPage;
