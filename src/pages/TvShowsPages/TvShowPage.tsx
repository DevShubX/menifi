import React from 'react'
import styled from 'styled-components'
import NavBar from '../../components/NavBars/NavBar'
import ContinueWatchingTvShows from '../../components/TvShows/ContinueWatchingTvShows'
import TvOnTheAir from '../../components/TvShows/TvOnTheAir'
import TvPopular from '../../components/TvShows/TvPopular'
import TvShowCarousel from '../../components/TvShows/TvShowCarousel'
import TvShowTopRated from '../../components/TvShows/TvShowTopRated'
import TvShowTrending from '../../components/TvShows/TvShowTrending'

const TvShowPage = () => {
    return (
        <div>
            <MainDiv>
                <NavBar placeHolder={"Search for TV Show..."} path={"/tvshows/search/"}/>
                <TvShowCarousel/>
                <ContinueWatchingTvShows/>
                <TvPopular/>
                <TvShowTopRated/>
                <TvOnTheAir/>
                <TvShowTrending/>
            </MainDiv>
        </div>
    )
}
const MainDiv = styled.div`
  position: relative;
  margin: 0 0 0 12rem;
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
export default TvShowPage