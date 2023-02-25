import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Scrollbar } from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton'
import 'react-circular-progressbar/dist/styles.css'
const TrendingMoviesSlider = () => {
    const [loading,setLoading] = useState(true);
    const [trendingMovies,setTrendingMovies] = useState<any>([]);
    useEffect(()=>{
        getTrendingMovies();
    },[]);
    const getTrendingMovies=async()=>{
        let trending= await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`);
        setTrendingMovies(trending.data.results);
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
                        Top Trending Movies
                    </h1>
                    <Link to={"/movies/trending"}>
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
                        {trendingMovies.map((item: any, index: any) => (
                            <SwiperSlide key={item.id}>
                                <Wrapper>
                                    <Link to={`/movies/search/` + (item.title !== null || undefined ? item.title : item.original_title)}>
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
                                        {item.title !== null || undefined ? item.title : item.original_title}
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
    img{
        border-radius: 1rem;
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
        }
    }
    @media screen and (max-width:400px) {
        width:100px;
        img{
        width: 100px;
        }
    }
`


const Heading = styled.div`
    font-family:"Gilroy-Bold",sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 3rem;
    a{
    color: #ebe9e9;
    text-decoration: none;
    font-family: 'Gilroy-Medium',sans-serif;
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
        height: 350px;
    }
    
    @media screen and (max-width:900px){
        .swiper-wrapper{
            height: 300px;
        }
    }
`
export default TrendingMoviesSlider