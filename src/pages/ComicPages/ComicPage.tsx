import React from 'react'
import styled from 'styled-components'
import PopularComicMovies from '../../components/Comics/PopularComicMovies'
import PopularIssues from '../../components/Comics/PopularIssues'
import PopularSeries from '../../components/Comics/PopularSeries'
import StoryArcsComics from '../../components/Comics/StoryArcsComics'
import PopularComics from '../../components/Home/PopularComics'
import HomepageNav from '../../components/NavBars/HomepageNav'
import NavBar from '../../components/NavBars/NavBar'

const ComicPage = () => {
  return (
    <div>
        <MainDiv>
            <HomepageNav/>
            <PopularComics/>
            <PopularIssues/>
            <PopularSeries/>
            <PopularComicMovies/>
            <StoryArcsComics/>
        </MainDiv>
    </div>
  )
}
const MainDiv  = styled.div`
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
export default ComicPage