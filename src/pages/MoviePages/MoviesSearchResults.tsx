import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../../components/NavBars/NavBar';
import SearchResultsSkeleton from '../../components/Skeletons/SearchResultsSkeleton';
import { useStateContext } from '../../GlobalContext/ContextProvider';

const MoviesSearchResults = () => {
  let movieName = useParams().movieName;
  movieName = movieName?.replace(":", "").replace("(", "").replace(")", "");
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<any>([]);
  useEffect(() => {
    getresult();
  }, [movieName]);
  const getresult = async () => {
    window.scrollTo(0,0);
    setLoading(true);
    let result = await axios.get(`https://menifi-api.vercel.app/api/search/${movieName}`);
    setSearchResult(result.data);
    setLoading(false);
  }
  return (
    <div>
        <MainDiv>
          <NavBar placeHolder={"Search for Movies..."} path={"/movies/search/"}/>
          <Parent>
            <Heading>
              <span>Search</span> Results for: {movieName}
            </Heading>
            {loading && <SearchResultsSkeleton movieName={movieName}/>}
            {!loading && (<CardWrapper>
              {searchResult.map((item:any,index:any)=>(item.type!=='tv')&&(
                 <motion.div
                 initial={{opacity:0,translateX:-50}}
                 animate={{opacity:1,translateX:0}}
                 transition={{duration:0.3,delay:index*0.1}}
                 key ={item.id}
                 >
                  <Wrapper to={"/movies/details&id=" + (item.href.replace("/","").replace("/","+").replace("https:/dopebox.se/","").replace("https://dopebox.se/",""))}>
                  <img src={item.imgUrl} alt={item.title} key={item.id}/>
                  <p>{item.title}</p>
                </Wrapper>
                  </motion.div>
                ))}
            </CardWrapper>)}
          </Parent>
        </MainDiv>
    </div>
  )
}

const Wrapper = styled(Link)`
  text-decoration:none;
  img{
    width: 160px;
    height: 235px;
    object-fit: cover;
    border-radius: 1rem;
    
  }
  p{
    color: #ffffff;
    font-family: "Gilroy-Bold",sans-serif;
    font-weight: 600;
    font-size: 18px;
    max-width: 160px;
    @media screen and (max-width:900px){
      font-size:16px;
    }
  }
  @media screen and (max-width:400px){
    img{
        width:120px;
        height:180px;
    }
  }
`

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,180px);
  grid-gap: 1rem;
  grid-row-gap: 2rem;
  justify-content: space-between;
  margin-right: 2rem;
  @media screen and (max-width:900px){
    grid-template-columns: repeat(auto-fill,160px);
    grid-gap: 0.3rem;
    grid-row-gap:1.5rem ;
    margin-right:0rem;
  }
  @media screen and (max-width:400px){
    grid-template-columns: repeat(auto-fill,120px);
    grid-gap: 0.3rem;
    grid-row-gap:1.5rem ;
    margin-right:0rem;
  }

`
const Heading = styled.p`
  font-size : 1.8rem;
  font-family:"Gilroy-Regular",sans-serif;
  margin-bottom: 2rem;
  span{
    font-family: "Gilroy-Bold",sans-serif;
    font-weight:700;
  }
  @media screen and (max-width:900px){
    font-size : 1.5rem;
  }
`

const Parent = styled.div`
  margin-left: 2rem;
  @media screen and (max-width:900px){
    margin-right: 2rem;
    
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

export default MoviesSearchResults