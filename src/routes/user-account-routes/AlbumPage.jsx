import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../hooks/http-hook';

import { PlayerContext } from '../../context/player-context';

import SongsList from '../../ui-elements/SongsList';
import SongsListInfo from '../../ui-elements/SongsListInfo';

import PlayButtonSVG from '../../svg/PlayButtonSVG';

import { lanAddress } from '../../.lanAddress';

import './album-page.css';

const AlbumPage = () => {
  let { albumId } = useParams();
  const [albumInfo, setAlbumInfo] = useState(false);
  const player = useContext(PlayerContext);
  //eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchAlbumInfo = async (albumId) => {
      try {
        const responseData = await sendRequest(
          `http://${lanAddress}:5000/api/albums/${albumId}`
        );
        setAlbumInfo(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbumInfo(albumId);
  }, [albumId, sendRequest]);

  const addAlbumToQueue = () => {
    if (player.currentSong === null) {
      player.setCurrentSong({
        id: albumInfo.songs[0].songId,
        title: albumInfo.songs[0].songTitle,
        artist: albumInfo.songs[0].artist,
        artistId: albumInfo.songs[0].artistId,
        albumId: albumInfo.songs[0].albumId,
        albumCover: albumInfo.songs[0].albumCover,
      });
      player.playAudio();
    } else {
      for (const song of albumInfo.songs) {
        player.setQueue([
          ...player.queue,
          {
            id: song.songId,
            title: song.songTitle,
            artist: song.artist,
            artistId: song.artistId,
            albumId: song.albumId,
            albumCover: song.albumCover,
          },
        ]);
      }
    }
  };

  return (
    <div className='album-page-container'>
      {albumInfo && <SongsListInfo listInfo={albumInfo} />}
      <div className='play-playlist-container' onClick={addAlbumToQueue}>
        <PlayButtonSVG className='playlist-play' />
        <span>Play/Queue</span>
      </div>
      {albumInfo && <SongsList songsListInfo={albumInfo.songs} />}
    </div>
  );
};

export default AlbumPage;
