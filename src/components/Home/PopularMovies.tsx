import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiFire } from 'react-icons/hi'
import useWindowDimension from '../../hooks/useWindowDimension';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
const TopMovies = () => {
  const [popularMovies, setPopularMovies] = useState<any>([]);
  const { width, height } = useWindowDimension();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    let pop_mov = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
    setPopularMovies(pop_mov.data.results);
    setLoading(false);
  }
  return (
    <div>
      <MainDiv>
        <Heading>
          <h1>
            Popular Movies
          </h1>
          <Link to={"/movies"}>
            View More
          </Link>
        </Heading>
        {loading && <HomeCardSkeleton/>}
        {!loading && (
          <Swiper
          slidesPerView={8}
          spaceBetween={25}
          scrollbar={{
            hide: true
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
          {popularMovies.map((item: any, index: any) => (
            <SwiperSlide key={index}>
              <Wrapper>
                <Link to={"/movies/search/" + item.title}>
                  <img src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`} alt="" />
                </Link>
                  <p>
                    {item.title !== null || undefined ? item.title : ""}
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
const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 3rem;
  align-items: center;
  font-family:'Gilroy-Bold',sans-serif;
  a{
    color: #ebe9e9;
    text-decoration: none;
    font-family:'Gilroy-Medium',sans-serif;
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
`

const Wrapper = styled.div`
  width: 160px;
  img{
    width: 154px;
    height: 231px;
    border-radius:0.5rem;
    object-fit: cover;
  }
  p{
    font-weight: 500;
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
      height: 150px;
    }
  }
`

export default TopMovies