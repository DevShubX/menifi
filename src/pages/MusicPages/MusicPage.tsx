import React from 'react'
import NavBar from '../../components/NavBars/NavBar'
import styled from 'styled-components'
import PopularAlbumSlider from '../../components/Music/PopularAlbumSlider'
import PopularSongsSlider from '../../components/Music/PopularSongsSlider'
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer'
import { useStateContext } from '../../GlobalContext/ContextProvider'

const MusicPage = () => {
  const {activeSong} = useStateContext();
  return (
    <div>
        <MainDiv>
        <NavBar placeHolder={"Search For Music,Album etc..."} path={"/music/search/"}/>
        <PopularAlbumSlider/>
        <PopularSongsSlider/>
        </MainDiv>
    </div>
  )
}
const MainDiv = styled.div`
  position: relative;
  margin: 0 0 0 12rem;
  padding : 0 0 10rem 0;
  display: flex;
  flex-direction: column;
  color: white;
  width:90vw;
  @media screen and (max-width:1850px){
    width:86vw;
  }
  @media screen and (max-width:1450px){
    width:83vw;
  }
  @media screen and (max-width:1150px){
    width: 79vw;
  }
  @media screen and (max-width:900px){
    width: 99vw;
    margin: 0 0 0 0rem;
  }
`
export default MusicPage