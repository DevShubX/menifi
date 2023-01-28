import React from 'react'
import styled from 'styled-components'
import CarouselMangas from '../../components/Mangas/CarouselMangas'
import FavouriteMangas from '../../components/Mangas/FavouriteMangas'
import PopularMangas from '../../components/Mangas/PopularMangas'
import Top100Mangas from '../../components/Mangas/Top100Mangas'
import TrendingMangas from '../../components/Mangas/TrendingMangas'
import NavBar from '../../components/NavBars/NavBar'

const MangaPage = () => {
  return (
    <div>
        <MainDiv>
            <NavBar placeHolder={"Search For Mangas..."} path={"/mangas/search/"}/>
            <CarouselMangas/>
            <TrendingMangas/>
            <PopularMangas/>
            <Top100Mangas/>
            <FavouriteMangas/>
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

export default MangaPage