import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';

const MangaReadPage = () => {
    let chapterId = useParams().chapterId;
    chapterId = chapterId?.replace("-ja-","/ja/").replace("-en-","/en/");
    const [pictures,setPictures] = useState<any>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        getMangaPages();
    },[chapterId]);

    const getMangaPages=async()=>{
        let result = await axios.get(`https://redux-api-wine.vercel.app/api/manga/mangareader/read?chapterId=${chapterId}`);
        setPictures(result.data.pages);
        setLoading(false);
    }
    
  return (
    <div>
        <MainDiv>
            <NavBar placeHolder={"Search For Mangas..."} path={"/mangas/search/"} />
            {loading && (<DetailsPageSkeleton/>)}
            {!loading && (
              <div>
                <Heading>
                  {chapterId?.replaceAll('-',' ').replaceAll("/"," ")}
                </Heading>
                <Wrapper>
                    {pictures.map((item:any,index:any)=>(
                      <>
                        <p>{`${item.page+'/'+pictures.length}`}</p>
                        <img loading='lazy' src={`${item.img}`} alt="" /> 
                      </>
                    ))}
                </Wrapper>
              </div>
            )}
        </MainDiv>
    </div>
  )
}

const Heading = styled.h1`
  margin-left:2rem;
  font-family:"Gilroy-Bold",sans-serif;
  @media screen and (max-width:600px){
    margin-left:1rem;
    margin-top: 2rem;
    font-size : 1.6rem;
  }
`

const Wrapper = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        margin-bottom: 3rem;
        width: 50%;
    }
    @media screen and (max-width:600px) {
        img{
            width: 90%;
        }
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

export default MangaReadPage
