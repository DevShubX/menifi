import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
import NavBar from '../../components/NavBars/NavBar';
import SearchResultsSkeleton from '../../components/Skeletons/SearchResultsSkeleton';

const TvShowsSearchResults = () => {
    let tvshowname = useParams().tvshowname;
    tvshowname = tvshowname?.replace("–","-").replace("(","").replace(")","");
    const [searchResult,setSearchResult] = useState<any>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        getSearchResults();
    },[tvshowname]);
    const getSearchResults =async()=>{
        setLoading(true)
        let search_result = await axios.get(`https://menifi-api.vercel.app/api/search/${tvshowname}`)
        setSearchResult(search_result.data);
        setLoading(false);
    }
  return (
    <div>
        <MainDiv>
            <NavBar placeHolder={"Search For TV Shows..."} path={"/tvshows/search/"}/>
            <Parent>
                <Heading>
                    <span>Search</span> Results for : {tvshowname}
                </Heading>
                {loading && (<SearchResultsSkeleton movieName={tvshowname}/>)}
                {!loading && (
                    <CardWrapper>
                        {searchResult.map((item:any,index:any)=>(item.type === 'tv' && item.href.includes("tv"))?(
                            <Wrapper to={"/tvshows/details&id="+(item.href.replace("https:/dopebox.se/","").replace("https://dopebox.se/","").replace("/tv","tv").replace("tv/","tv+"))}>
                                <img src={item.imgUrl} alt="" key={item.id} />
                                <p>{item.title}</p>
                            </Wrapper>
                        ):(<></>))}
                    </CardWrapper>
                )}
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

export default TvShowsSearchResults