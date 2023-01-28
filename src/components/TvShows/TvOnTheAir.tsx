import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimension from '../../hooks/useWindowDimension';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
const TvOnTheAir = () => {
    const [loading, setLoading] = useState(true);
    const [tvontheair,setTvonTheAir] = useState<any>([]);

    useEffect(()=>{
        getTvOnTheAir();
    },[])
    ;

    const getTvOnTheAir = async ()=>{
        let tv_air = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
        setTvonTheAir(tv_air.data.results);
        setLoading(false);
    }
    function checkRating(rating: any) {
        let r = Math.floor(rating * 10);
        if (r >= 70 && r <= 100) {
            return "#45f542";
        }
        else if (r > 50 && r < 70) {
            return "#b7cf30";
        }
        else if (r === 50) {
            return "#eeff00";
        }
        else if (r >= 30 && r < 50) {
            return "#f59b42";
        }
        else if (r >= 0 && r < 30) {
            return "#f54242";
        }
    }
  return (
    <div>
        <MainDiv>
                <Heading>
                    <h1>
                        TV On The Air
                    </h1>
                    <Link to={"/tvshows/on_the_air"}>
                        View More
                    </Link>
                </Heading>
                {loading && <HomeCardSkeleton />}
                {!loading && (
                    <Swiper
                        slidesPerView={8}
                        spaceBetween={25}
                        scrollbar={{
                            hide: true
                        }}
                        modules={[Scrollbar]}
                        breakpoints={{
                            "@0.00": {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            "@0.75": {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            "@1.00": {
                                slidesPerView: 4,
                                spaceBetween: 35,
                            },
                            "@1.50": {
                                slidesPerView: 5,
                                spaceBetween: 35,
                            },
                            "@2.00": {
                                slidesPerView: 7,
                                spaceBetween: 35,
                            }

                        }}
                    >
                        {tvontheair.map((item: any, index: any) => (
                            <SwiperSlide key={item.id}>
                                <Wrapper>
                                    <Link to={`/tvshows/search/` + (item.name !== null || undefined ? item.name : item.original_name)}>
                                        <img src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`} alt="" />
                                        <Rating>
                                            <CircularProgressbar
                                                value={item.vote_average * 10}
                                                text={`${Math.floor(item.vote_average * 10)}%`}
                                                background
                                                backgroundPadding={5}
                                                strokeWidth={8}
                                                styles={buildStyles({
                                                    backgroundColor: 'black',
                                                    textColor: "white",
                                                    pathColor: checkRating(item.vote_average),
                                                    textSize: "1.7rem",
                                                    trailColor: 'transparent',
                                                })}
                                            />
                                        </Rating>
                                    </Link>
                                    <p>
                                        {item.name !== null || undefined ? item.name : item.original_name}
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


const Rating = styled.div`
    position: relative;
    bottom:30px;
    left: 5px;
    width: 45px;
    height: 45px;
    @media screen and (max-width:900px){
        width:40px;
        height: 40px;
    }
`
const Wrapper = styled.div`
    width: 160px;
    transform: scale(1);
    transition: transform 0.5s;
    :hover{
        transform: scale(1.1);
    }
    img{
        border-radius: 1rem;
        height: 235px;
    }
    p{
        position: relative;
        bottom: 30px;
        font-weight: 600;
        font-family: "Gilroy-Medium",sans-serif;
    }
    @media screen and  (max-width:600px){
    width: 120px;
        img{
        width:120px;
        height: 180px;
        }
    }
    @media screen and (max-width:400px) {
        width:100px;
        img{
        width: 100px;
        height: 160px;
        }
    }
`


const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 3rem;
    a{
    color: #ebe9e9;
    text-decoration: none;
    }
    h1{
        font-size: 2.3rem;
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
    .swiper-wrapper{
        padding-top:2rem;
        height: 350px;
    }
    @media screen and (max-width:900px){
        .swiper-wrapper{
            padding-top:1rem;
            height: 300px;
        }
    }
`

export default TvOnTheAir