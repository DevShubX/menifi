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
  const [mangaChapters,setMangaChapters] = useState<any>([]);
  const [pageNumber,setPageNumber] = useState(1);
  const [moreMangaDetails,setMoreMangaDetails] = useState<any>({});
  useEffect(() => {
    getMangaDetails();
  }, []);

  useEffect(()=>{
    getAllChapters();
  },[pageNumber]);

  const getAllChapters=async()=>{
    let result = await axios.get(`https://api.comick.app/comic/${mangaId}/chapters?lang=en&page=${pageNumber}`);
    if(result.data.chapters.length <= 0){
      setPageNumber(1);
    }
    setMangaChapters(result.data);
  }

  const getMangaDetails = async () => {
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/manga/comick/info?mangaId=${mangaId}`);
    setMangaDetails(result.data.result.mangaInfo);
    setMoreMangaDetails(result.data.result.moreInfo);
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
                <p>
                  <span>Status: </span>
                  {mangaDetails.status ?? "NA"}
                </p>
                <p>
                  <span>Mature Content: </span>
                  {mangaDetails.matureContent ? "YES" : "NO"}
                </p>
                <p>
                  <span>Rating: </span>
                  {moreMangaDetails.bayesian_rating?? "NA"}
                </p>
                <p>
                  <span>Released Year: </span>
                  {moreMangaDetails.year ?? "NA"}
                </p>
                <p>
                  <span>Language: </span>
                  {moreMangaDetails.iso639_1 ?? "NA"}
                </p>
                <p>
                  <span>Language Name: </span>
                  {moreMangaDetails.lang_name ??"NA"}
                </p>
                <p>
                  <span>Language Native: </span>
                  {moreMangaDetails.lang_native ?? "NA"}
                </p>
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
                  {mangaChapters.total}
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
                {mangaChapters.chapters.map((chapter: any, index: any) => (
                  <Link to={"/mangas/read/" + chapter.hid}>
                    <img src={mangaDetails.image} alt="" />
                    <div>
                      <p>{(chapter.title!==null)? `Chapter ${chapter.chap} ${chapter.title ?? "NA"}`: `Chapter ${chapter.chap}`}</p>
                      <p>{chapter.lang.toUpperCase()}</p>
                      <p>{chapter.group_name}</p>
                    </div>
                  </Link>
                ))}
              </Chapters>
            </ChapterWrapper>
            <div className='button-section'>
              <button onClick={()=>{
                if(pageNumber > 0){
                    setPageNumber(pageNumber-1);
                }else{
                  setPageNumber(1);
                }
              }}>
                Previous                
              </button>

              <button onClick={()=>{
                setPageNumber(pageNumber+1);
              }}>
                Next
              </button>
            </div>
          </Parent>
        )}
        <PopularMangas/> 
      </MainDiv>
    </div>
  )
}

const Chapters = styled.div`
  display: grid;
  max-height: 600px;
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

  @media screen and (max-width:600px) {
    max-height: 500px;
    grid-template-columns: repeat(auto-fill,350px);
    a{
      p{
        font-size : 0.9rem;
      }
    }
  }

  
  @media screen and (max-width:400px){
    grid-template-columns: repeat(auto-fill,340px);
    a{
      p{
        font-size : 0.9rem;
      }
    }
  }

  @media screen and (max-width:375px){
    grid-template-columns: repeat(auto-fill,330px);
  }
`

const ChapterWrapper = styled.div`

  h1{
    font-family: 'Gilroy-Bold',sans-serif;
  }
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

  .Genre{
    display: flex;
    flex-wrap: wrap;
  }
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
    display : flex;
    flex-wrap: wrap;
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
  .button-section{
    margin: 2rem 0 0 0 ;
    button{
      border: none;
      padding: 0.3rem 0.5rem;
      background-color: #ff0000c0;
      color: white;
      font-size: 1.2rem;
      border-radius: 0.5rem;
      font-family: 'Gilroy-Medium',sans-serif;
    }

    display: flex;
    justify-content: space-between;
  }
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