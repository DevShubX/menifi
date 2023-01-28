import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PopularMangas from '../../components/Mangas/PopularMangas';
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';

const MangaDetailsPage = () => {
  let mangaId = useParams().mangaId;
  const [mangaDetails, setMangaDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMangaDetails();
  }, []);

  const getMangaDetails = async () => {
    let result = await axios.get(`https://api.consumet.org/manga/mangasee123/info?id=${mangaId}`);
    setMangaDetails(result.data);
    setLoading(false);
  }
  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search For Mangas..."} path={"/mangas/search/"} />
        {loading && (<DetailsPageSkeleton />)}
        {!loading && (
          <Parent>
            <ContentWrapper>
              <Poster>
                <img src={mangaDetails.image} alt="" />
              </Poster>
              <Content>
                <h1>
                  {(mangaDetails.title !== ''|| undefined || null) ? mangaDetails.title : mangaDetails.altTitles[0]}
                </h1>
                {/* <p>
                  <span>Status: </span>
                  {mangaDetails.status}
                </p> */}
                <p className='Genre'>
                  <span>Genres: </span>
                  {mangaDetails.genres.map((item: any, index: any) => (
                    <span className='genres'>{item}</span>
                  ))}
                </p>
                <p>
                  <span>Description: </span>
                  {mangaDetails.description}
                </p>
                {/* <p>
                  <span>Themes: </span>
                  <span className='themebox'
                  >{mangaDetails.themes.map((item: any, index: any) => (
                    <span className='themes'>{item}</span>
                  ))}</span>
                </p> */}
                <p>
                  <span>Total Chapters: </span>
                  {mangaDetails.chapters.length}
                </p>
              </Content>
            </ContentWrapper>
            <ChapterWrapper>
              <div>
                <h1>
                  Chapters
                </h1>
              </div>
              <Chapters>
                {mangaDetails.chapters.map((chapter: any, index: any) => (
                  <Link to={"/mangas/read/" + chapter.id}>
                    <img src={mangaDetails.image} alt="" />
                    <p>{(chapter.title!==''||undefined||null)?chapter.title: `Chapter ${mangaDetails.chapters.length-index}`}</p>
                  </Link>
                ))}
              </Chapters>
            </ChapterWrapper>
          </Parent>
        )}
        <PopularMangas/>
      </MainDiv>
    </div>
  )
}

const Chapters = styled.div`
  display: grid;
  max-height: 400px;
  overflow-y: scroll;
  grid-template-columns: repeat(auto-fill,400px);
  grid-row-gap: 1rem;
  a{
    text-decoration: none;
    display: flex;
    color: white;
    font-family:"Gilroy-Medium",sans-serif;
    margin-bottom: 2rem;
    font-size : 1.2rem;
    p{
      margin:0;
    }
    :hover{
      p{
        color: red;
      }
    }
  }
  img{
    width: 70px;
    margin-right: 1rem;
  }

  @media screen and (max-width:400px){
    a{
      p{
        font-size : 1rem;
      }
    }
  }
`

const ChapterWrapper = styled.div`
  @media screen and (max-width:400px){

    h1{
      font-size : 1.5rem;
    }
  }

`

const Poster = styled.div`
  margin : 0 2rem 0 0 ;
  img{
    width:200px;
    border-radius:0.7rem;
    object-fit: cover;
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
  }
  @media screen and (max-width:1200px){
    margin: 0 0 2rem 0;
    text-align: center;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  @media screen and (max-width:1200px){
    flex-direction: column;
  }
`
const Content = styled.div`
  h1{
    margin:0;
    font-size : 2.3rem;
  }
  p{
    font-family: "Gilroy-Medium",sans-serif;
    font-size : 1.1rem;
  }
  span{
    font-family: "Gilroy-Bold",sans-serif;
  }
  .themes{
    font-family: "Gilroy-Medium",sans-serif;
    background-color: #3b3b3b;
    padding: 0.3rem;
    margin:0.5rem;
    border-radius: 0.3rem;
  }
  .genres{
    font-family: "Gilroy-Medium",sans-serif;
    background-color: #3b3b3b;
    padding: 0.3rem;
    margin:0.5rem;
    border-radius: 0.3rem;

  }
  .themebox{
    display: flex;
    overflow-x: scroll;
  }
  @media screen and (max-width:900px){
    .Genre{
    display : grid;
    align-items: center;
    }
    h1{
      font-size : 1.6rem;
    }
    p{
      font-size : 0.8rem;
    }
    .themes{
      font-size : 0.8rem;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
`

const Parent = styled.div`
  margin: 2rem 3rem 2rem 2rem;
  @media screen and (max-width:600px){
    margin: 2rem 1rem 2rem 1rem;
  }
  
`
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
export default MangaDetailsPage