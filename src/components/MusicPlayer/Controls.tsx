import React from 'react'
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayCircleFill, BsPauseCircleFill, BsPlayFill, BsShuffle } from 'react-icons/bs'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import styled from 'styled-components'
import useWindowDimension from '../../hooks/useWindowDimension'


interface controlsPara {
    isPlaying: any,
    repeat: any,
    setRepeat: any,
    shuffle: any,
    setShuffle: any,
    currentSongs: any,
    handlePlayPause: any,
    handlePrevSong: any,
    handleNextSong: any,

}


const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }:controlsPara) => {
    const {width } = useWindowDimension();



    return (
        <MainDiv>
            {/* <BsArrowRepeat size={20} color={repeat ? "red": "white"} onClick={()=>setRepeat(!repeat)}/> */}
            {currentSongs?.length && <MdSkipPrevious size={30} onClick={()=>handlePrevSong()}/>}
            {isPlaying ? (
                <BsPauseCircleFill size={45} onClick={handlePlayPause}/>
            ):<BsFillPlayCircleFill size={45} onClick={handlePlayPause}/>}
            {currentSongs?.length && <MdSkipNext size={30} onClick={()=>handleNextSong()}/>}
            {/* <BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={()=>setShuffle(!shuffle)}/> */}
        </MainDiv>
    )
}

const MainDiv = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    width:80%;
    @media screen and (max-width:600px){
        margin-left: 2rem;
      }
    @media screen and (max-width : 400px){
        margin-left :1rem;
    }
`


export default Controls