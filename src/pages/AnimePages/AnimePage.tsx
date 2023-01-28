import React from 'react'
import styled from 'styled-components'
import AnimeArticles from '../../components/Anime/AnimeArticles'
import AnimeTrailers from '../../components/Anime/AnimeTrailers'
import CarouselAnime from '../../components/Anime/CarouselAnime'
import ContinueWatchingAnime from '../../components/Anime/ContinueWatchingAnime'
import FavouriteAnimeSlider from '../../components/Anime/FavouriteAnimeSlider'
import PopularAnimeSlider from '../../components/Anime/PopularAnimeSlider'
import Top100AnimeSlider from '../../components/Anime/Top100AnimeSlider'
import TrendingAnimeSlider from '../../components/Anime/TrendingAnimeSlider'
import UpcomingAnime from '../../components/Anime/UpcomingAnime'
import NavBar from '../../components/NavBars/NavBar'

const AnimePage = () => {
  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search For Anime..."} path={"/animes/search/"}/>
        <CarouselAnime/>
        <AnimeTrailers/>
        <ContinueWatchingAnime/>
        <TrendingAnimeSlider/>
        <PopularAnimeSlider/>
        <Top100AnimeSlider/>
        <FavouriteAnimeSlider/>
        <UpcomingAnime/>
        <AnimeArticles/>
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


export default AnimePage