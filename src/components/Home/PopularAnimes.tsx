import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import useWindowDimension from '../../hooks/useWindowDimension';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
const PopularAnimes = () => {
    const [popularAnimes,setPopularAnimes] = useState<any>([]);
    const {width,height} = useWindowDimension();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        getPopularAnimes();
    },[]);
    const getPopularAnimes = async () =>{
        let pop_anime = await axios.get(`https://redux-api-wine.vercel.app/api/popular?page=1`);
        setPopularAnimes(pop_anime.data.data.Page.media);
        setLoading(false);
    }
  return (
    <div>
        <MainDiv>
            <Heading>
                <h1>
                    Popular Animes
                </h1>
                <Link to={"/animes"}>
                    View More
                </Link>
            </Heading>
            {loading && <HomeCardSkeleton/>}
            {!loading && (
                <Swiper
                slidesPerView={8}
                spaceBetween={25}
                scrollbar={{
                  hide : true
                }}
                modules={[Scrollbar]}
                className="MySwiper"
                breakpoints={{
                "@0.00":{
                    slidesPerView : 3,
                    spaceBetween : 15,
                    },
                    "@0.75":{
                    slidesPerView : 4,
                    spaceBetween : 20,
                    },
                    "@1.00" :{
                    slidesPerView: 4,
                    spaceBetween : 35,
                    },
                    "@1.50": {
                    slidesPerView: 5,
                    spaceBetween: 35,
                    },
                    "@2.00" : {
                    slidesPerView: 7,
                    spaceBetween : 35,
                    }         
                }}
                >
                {popularAnimes.map((item:any,index:any)=>(
                    <SwiperSlide key={index}>
                        <Wrapper>
                            <Link to={"/animes/search/" + (item.title.english !== undefined ? item.title.english : item.title.romaji !== undefined ? item.title.romaji : item.title.userPreferred)}>
                                <img src={item.coverImage.large} alt="" />
                            </Link>
                            <p>
                                {item.title.userPreferred !== undefined ? item.title.userPreferred : item.title.romaji !== undefined ? item.title.romaji : item.title.english}
                            </p>
                        </Wrapper>
                    </SwiperSlide>
                ))}
                </Swiper>
            )}
        </MainDiv>
    </div>
  )
}
const Wrapper = styled.div`
    width: 160px;
    img{
        width: 154px;
        border-radius: 1.5rem;
        object-fit: cover;
    }
    p{
        font-weight: 500;
        font-family: "Gilroy-Medium",sans-serif;
    }
    @media screen  and (max-width:600px){
        width: 120px;
        img{
            width: 120px;
        }
    }
    @media screen and (max-width:400px){
        width:100px;
        img{
            width:100px;
        }
    }
`
const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 3rem;
    a{
        color: #ebe9e9;
        text-decoration: none;
    }
    h1{
        font-size:2.3rem;
        color:#ebe9e9;
    }
    @media screen and (max-width:900px){
    margin-right: 1rem;
    h1{
      font-size: 2rem;
    }
    }
    @media screen and (max-width:600px){
        margin-right:1rem;
        h1{
        font-size: 1.6rem;
        }
    }
`

const MainDiv = styled.div`
    margin-left:2rem;
`
export default PopularAnimes