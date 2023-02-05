import React, { useState } from 'react'
import Player from './Player';
import Controls from './Controls';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import Seekbar from './Seekbar';
import styled from 'styled-components';
import VolumeBar from './VolumeBar';
import MusicTrack from './MusicTrack';
import useWindowDimension from '../../hooks/useWindowDimension';
import { AiFillCloseCircle, AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, setIsPlaying, setIsActive, setActiveSong, setCurrentIndex } = useStateContext();
  const { width } = useWindowDimension();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  // console.log(activeSong);
  // console.log(currentSongs);
  // console.log(currentIndex);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }

  const handlePrevSong = () => {
    if (currentIndex > 0) {
      setActiveSong(currentSongs[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
      setIsActive(true);
    }
  }
  const handleNextSong = () => {
    if (currentIndex !== currentSongs.length - 1) {
      setActiveSong(currentSongs[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
      setIsActive(true);

    }
  }

  return (
    <MainDiv>
      <MusicTrack
        activeSong={activeSong}
        isActive={isActive}
        isPlaying={isPlaying}
      />
      <div className='MainControls'>
        <Controls
          isPlaying={isPlaying}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={currentTime}
          min={"0"}
          max={duration}
          onInput={(event: any) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          currentTime={currentTime}
        />
        <Player
          activeSong={activeSong}
          repeat={repeat}
          volume={volume}
          seekTime={seekTime}
          onTimeUpdate={(event: any) => { setCurrentTime(event.target.currentTime) }}
          onLoadedData={(event: any) => { setDuration(event.target.duration) }}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
        />
      </div>
      {width > 600 && <VolumeBar
        value={volume}
        min={'0'}
        max={'1'}
        onChange={(event: any) => setVolume(event.target.value)}
        setVolume={setVolume}
      />}
      <AiFillCloseCircle className='close-icon' onClick={() => setIsActive(false)} />
    </MainDiv>

  )
}


const MainDiv = styled.div`
    position:fixed;
    bottom : 5px;
    right: 0;
    color : white;
    z-index:10000;
    justify-content:center;
    .MainControls{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
    }
    display:flex;
    justify-content:space-between;
    background-color:#1d1d1d;
    border-radius:1rem;
    padding:1rem;
    filter: drop-shadow(0px 0px 10px #000000ae);

    .close-icon{
      position:absolute;
      color : red;
      font-size: 1.5rem;
      top : 10px;
      right: 10px;
    }
    @media screen and (max-width:600px){
      padding : 1rem 1rem 0 1rem ;
      background-color:#1d1d1dd8;
    }
`

export default MusicPlayer
