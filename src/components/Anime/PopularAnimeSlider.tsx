import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimension from '../../hooks/useWindowDimension';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
const PopularAnimeSlider = () => {
  const [popularAnimes, setPopularAnimes] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPopularAnimes();
  }, []);
  const getPopularAnimes = async () => {
    let pop_anime = await axios.get(`https://redux-api-wine.vercel.app/api/popular?page=1`);
    setPopularAnimes(pop_anime.data.data.Page.media);
    setLoading(false);
  }
  return (
    <div>
      <MainDiv>
        <Heading>
          <h1>
            All Time Popular
          </h1>
          <Link to={"/animes/popular&page=1"}>
            View More
          </Link>
        </Heading>
        {loading && <HomeCardSkeleton />}
        {!loading && (
          <Swiper
            slidesPerView={8}
            spaceBetween={25}
            className="MySwiper"
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
                slidesPerView: 7,
                spaceBetween: 35,
              },
              "@2.00": {
                slidesPerView: 7,
                spaceBetween: 35,
              }
            }}
          >
            {popularAnimes.map((item: any, index: any) => (
              <SwiperSlide key={item.id}>
                <Wrapper>
                  <Link to={"/animes/search/" + (item.title.userPreferred !== null || undefined || "" ? item.title.userPreferred : item.title.romaji !== null || undefined || "" ? item.title.romaji : item.title.english)}>
                    <img src={item.coverImage.large} alt="" />
                  </Link>
                  <p>
                    {item.title.userPreferred !== undefined ? item.title.userPreferred : item.title.romaji !== undefined ? item.title.romaji : item.title.english}
                  </p>
                  <div className='score'>
                    {item.averageScore?? "NA"}
                    </div>
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
      width: 160px;
      height: 235px;
      border-radius: 0.5rem;
      object-fit: cover;
  }
  p{
      font-family: "Gilroy-Medium",sans-serif;
  }
  .score{
    position: absolute;
    top: 10px;
    left: 10px;
    color: white;
    background-color: #ff0000;
    padding: 0.1rem 0.3rem;
    font-family: 'Gilroy-Bold',sans-serif;
    border-radius: 0.2rem;
    align-items: center;
    justify-content: center;
  }
  @media screen  and (max-width:600px){
      width: 120px;
      img{
          width: 120px;
          height: 180px;
      }
  }
  @media screen and (max-width:400px){
      width:100px;
      img{
          width:100px;
          height: 160px;
      }
  }
`
const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 3rem;
  font-family: "Gilroy-Bold",sans-serif;
  a{
      color: red;
      text-decoration: none;
      border: 1px solid red;
      padding: 0.5rem 0.5rem;
      border-radius: 1rem;
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
  a{
    font-size:0.9rem;
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


export default PopularAnimeSlider