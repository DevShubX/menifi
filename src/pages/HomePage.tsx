import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Carousel from '../components/Home/Carousel'
import PopularAnimes from '../components/Home/PopularAnimes'
import PopularComics from '../components/Home/PopularComics'
import PopularMangas from '../components/Home/PopularMangas'
import TopMovies from '../components/Home/PopularMovies'
import PopularTvShows from '../components/Home/PopularTvShows'
import HomepageNav from '../components/NavBars/HomepageNav'
import CarouselSkeleton from '../components/Skeletons/CarouselSkeleton'
import { useStateContext } from '../GlobalContext/ContextProvider'
import useWindowDimension from '../hooks/useWindowDimension'
import PopularAlbumSlider from '../components/Music/PopularAlbumSlider'

const HomePage = () => {
  const { width, height } = useWindowDimension();
  const [isLoading, setLoading] = useState(true);
  const [tmdbMovies, setTMDBMovies] = useState<any>([]);
  const { currentUser } = useStateContext();
  useEffect(() => {
    getTMDBTrendings();
  }, []);

  const getTMDBTrendings = async () => {
    let trending_all = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`)
    setTMDBMovies(trending_all.data.results);
    setLoading(false);
  }
  return (
    <div>
      {!currentUser.uid && (
        <Image>
          <img src='/assets/infinity-loading.gif' />
        </Image>
      )}
      {currentUser.uid && (
        <MainDiv>
          <HomepageNav />
          {isLoading && (<CarouselSkeleton />)}
          {!isLoading && (<Carousel props={tmdbMovies} />)}
          <TopMovies />
          <PopularTvShows />
          <PopularAnimes />
          <PopularMangas />
          <PopularComics />
          <PopularAlbumSlider/>
        </MainDiv>
      )}
    </div>
  )
}
const Image = styled.div`
  height:100vh;
  width:100vw;
  display : flex;
  align-items:center;
  justify-content:center;
`

const MainDiv = styled.div`
  position: relative;
  margin:0 0 0 12rem;
  display: flex;
  flex-direction:column;
  color: white;
  width: 90vw;
  @media screen and (max-width:1850px) {
    width:86vw;
  }
  @media screen and (max-width:1450px){
    width :83vw;
  }
  @media screen and (max-width:1150px){
    width: 79vw;
  }
  @media screen and (max-width:900px){
    width: 99vw;
    margin: 0 0 0 0rem;
  }

`

export default HomePage