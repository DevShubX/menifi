import React, { useEffect, useState } from 'react'
import useWindowDimension from '../../hooks/useWindowDimension';
import axios from 'axios';
import styled from 'styled-components';
import NavBar from '../../components/NavBars/NavBar';
import SearchResultsSkeleton from '../../components/Skeletons/SearchResultsSkeleton';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const TrendingAnimePage = () => {
    let pageNum:any = useParams().pageNum;
    const [Loading,setLoading] = useState(true);
    const [animeList,setAnime] = useState<any>([]);
    const {width} = useWindowDimension();
    const [pageNumber,setPageNumber] = useState<any>(parseInt(pageNum));
    const [pageInfo,setPageInfo] = useState<any>({});
    const [perPageitems,setPerPageItem] = useState<any>(20);
    useEffect(()=>{
        getAnimeList();
    },[pageNumber,perPageitems]);

    const getAnimeList=async()=>{
        setLoading(true);
        window.scrollTo(0,0);
        let result = await axios.get(`https://redux-api-wine.vercel.app/api/trending?page=${pageNumber}&count=${perPageitems}`);
        setPageInfo(result.data.data.Page.pageInfo);
        setAnime(result.data.data.Page.media);
        setLoading(false);
    }


  return (
    <div>
        <MainDiv>
            <NavBar placeHolder={"Search For Anime..."} path={"/animes/search"}/>
            <Heading>
                    <p><span>Trending Anime Page {pageNumber}</span> Results</p>
                    <div>
                        <span>
                            Per Page
                        </span>
                        <select name="dropdown" id="perpagelist" onChange={(e:any)=>setPerPageItem(e.target.value)}>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
            </Heading>
            
            {Loading && <SearchResultsSkeleton movieName={'Trending Anime Results'} />}
            
            {!Loading && (
                    <>
                        <CardWrapper>
                            {animeList.map((item: any, index: any) => {
                                return (
                                    <motion.div
                                    initial={{opacity:0,translateX:-50}}
                                    animate={{opacity:1,translateX:0}}
                                    transition={{duration:0.3,delay:index*0.1}}
                                    key ={item.id}
                                    >
                                        <Links to={`/animes/search/${item.title.userPreferred ?? item.title.english ?? item.title.romaji}`}>
                                            <img src={item.coverImage.large} alt="" />
                                            <p>
                                                {item.title.userPreferred ?? item.title.english ?? item.title.romaji}
                                            </p>
                                         </Links>
                                </motion.div>
                                )
                                })}
                        </CardWrapper>
                       
                    </>
                )}
                <div className='pagination'>
                    <Link onClick={()=>{
                        if(pageNumber > 1){
                            setPageNumber(pageNumber-1)
                        }
                        return;
                        }}  to={ pageNumber > 1 ?  `/animes/trending&page=${pageNumber-1}` : `/animes/trending&page=${pageNumber}`}>
                        {"PREV"}
                    </Link>

                    <span>
                        {
                        `${pageNumber} OF ${pageInfo.lastPage} `
                        }
 
                    </span>
                   

                    <Link onClick={()=>setPageNumber(pageNumber+1)}  to={`/animes/trending&page=${pageNumber+1}`}>
                        {"NEXT"}
                    </Link>
                </div>
        </MainDiv>
    </div>
  )
}
const Links = styled(Link)`
    text-decoration:none;
    img{
        object-fit:cover;
        border-radius:0.5rem;
        width: 160px;
        @media screen and (max-width:600px){
            width: 120px;
            height: 180px;
            border-radius: 0.3rem;
        }
        @media screen and (max-width:400px){
            width: 100px;
            height: 160px;
            
        }
        @media screen and (max-width:380px){
            width: 90px;
            height: 150px;
        }
    }
    p{
        color : white;
        font-family: "Gilroy-Bold",sans-serif;
        max-width:160px;
        @media screen and (max-width:400px){
            font-size : 0.9rem;
        }
    }
`
const CardWrapper = styled.div`
    margin:0 0 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill,180px);
    grid-gap: 1rem;
    grid-row-gap: 2rem;
    justify-content: space-between;
    margin-right: 2rem;
    @media screen and (max-width:900px){
        grid-template-columns: repeat(auto-fill,180px);
        grid-gap: 0.3rem;
        grid-row-gap:1.5rem ;
        margin-right:0rem;
        margin-left:1rem;
    }
    @media screen and (max-width:600px){
        margin-right:0.5rem;
        grid-template-columns:repeat(auto-fill,120px);
        grid-gap: 0.5rem;
        grid-row-gap: 1.5rem ;
    }
    @media screen and (max-width:400px){
        grid-template-columns: repeat(auto-fill,110px);
        grid-gap: 0.3rem;
        grid-row-gap:1.5rem ;
        margin-right:0.5rem;
        margin-left:1rem;
    }
    @media screen and (max-width:380px){
        grid-template-columns:repeat(auto-fill,100px);
        grid-gap: 0rem;
        grid-row-gap: 1.5rem ;
    }
`


const Heading = styled.div`
    font-family:"Gilroy-Light",sans-serif;
    font-size : 1.8rem;
    margin:2rem 3rem 3rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        font-family:"Gilroy-Bold",sans-serif;
    }
    div{
        span{
            font-size:1rem;
            margin-right: 0.5rem;
        }
    }
    @media screen and (max-width:600px){
        font-size : 1.6rem;
        margin:1rem 1.5rem 2rem 1rem;

    }
    @media screen and (max-width:400px){
        margin:1rem 1.5rem 2rem 1rem;
        font-size : 1.3rem;
    }
`


const MainDiv = styled.div`
  position: relative;
  margin:0 0 0 12rem;
  display: flex;
  flex-direction:column;
  color: white;
  width: 90vw;
  .pagination{
    display: flex;
    justify-content: space-between;
    margin: 2rem 2rem 3rem 1rem;
    a{
        text-decoration: none;
        font-size:1.3rem;
        color: white;
        background-color: #ff0000b3;
        font-family: 'Gilroy-Medium',sans-serif;
        padding: 0.2rem 0.4rem;
        border-radius: 0.5rem;
    }
    span{
        font-family: "Gilroy-Medium",sans-serif;
    }
        

    }
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
  .React-paginate{
        margin:1rem;
        display: flex;
        justify-content: space-around;
        text-decoration: none;
        background-color: #232425;
        padding: 0.8rem;
        cursor: pointer;
        list-style: none;
        border-radius: 1.5rem;
        justify-items: center;
        align-items: center;
        font-family: "Gilroy-Bold",sans-serif;
        a{
            font-size: 1rem;
        }
        .selected{
            color: #ff0000;
            align-items: center;
            justify-items: center;
        @media screen and (max-width:768px){
            a{
                font-size: 0.8rem;
            }
        }
    }
   
}`


export default TrendingAnimePage;