import React, { useEffect } from 'react'
import styled from 'styled-components'
import CarouselMovies from '../../components/Movies/CarouselMovies'
import PopularMoviesSlider from '../../components/Movies/PopularMoviesPageSlider'
import TopRatedMoviesSlider from '../../components/Movies/TopRatedMoviesSlider'
import HomepageNav from '../../components/NavBars/HomepageNav'
import NavBar from '../../components/NavBars/NavBar'
import TrendingMoviesSlider from '../../components/Movies/TrendingMoviesSlider'
import UpcomingMoviesSlider from '../../components/Movies/UpcomingMoviesSlider'
import MoviesTrailers from '../../components/Movies/MoviesTrailers'
import ContinueWatchingMovies from '../../components/Movies/ContinueWatchingMovies'

const MoviesPage = () => {
  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search for a Movie..."} path={"/movies/search/"}/>
        <CarouselMovies/>
        <ContinueWatchingMovies/>
        <PopularMoviesSlider/>
        <TopRatedMoviesSlider/>
        <TrendingMoviesSlider/>
        <UpcomingMoviesSlider/>
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

export default MoviesPage