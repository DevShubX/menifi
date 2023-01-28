import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';

const UpcomingAnime = () => {
    const [upcomingAnime, setUpcomingAnime] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUpcomingAnime();
    }, []);

    const getUpcomingAnime = async () => {
        let result = await axios.get(`https://api.jikan.moe/v4/seasons/upcoming?page=1`)
        setUpcomingAnime(result.data.data);
        setLoading(false);
    }
    return (
        <div>
            <MainDiv>
                <Heading>
                    <h1>
                        Upcoming Anime
                    </h1>
                    <Link to={"/animes/upcoming"}>
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
                                slidesPerView: 5,
                                spaceBetween: 35,
                            },
                            "@2.00": {
                                slidesPerView: 7,
                                spaceBetween: 35,
                            }
                        }}
                    >
                        {upcomingAnime.map((item: any, index: any) => (item.images.webp.image_url !== null || undefined || "") && (
                            <SwiperSlide key={item.id}>
                                <Wrapper>
                                    <Link to={"/animes/search/" + (item.title !== undefined || null || "") ? item.title : (item.title_english !== undefined || null ||  "" )? item.title_english : item.title_japanese}>
                                        <img src={item.images.webp.image_url} alt="" />
                                    </Link>
                                    <p>
                                        {(item.title !== undefined || null || "") ? item.title : (item.title_english !== undefined || null ||  "" )? item.title_english : item.title_japanese}
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
      width: 160px;
      height: 235px;
      border-radius: 0.5rem;
      object-fit: cover;
  }
  p{
      font-family: "Gilroy-Medium",sans-serif;
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
  @media screen and (max-width:900px){
    .swiper-wrapper{
        height: 350px;
    }
  }
  
`

export default UpcomingAnime