import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimension from '../../hooks/useWindowDimension';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
import { Scrollbar } from 'swiper';
const PopularComics = () => {
    const [popularComics,setPopularComics] = useState<any>([]);
    const [loading,setLoading] = useState(true);
    const {width,height} = useWindowDimension();
    useEffect(()=>{
        getPopularComics();
    },[]);
    const getPopularComics =async()=>{
        let pop_comics = await axios.get("https://comics-api-wine.vercel.app/api/volumes/");
        setPopularComics(pop_comics.data);
        setLoading(false);
    }
  return (
    <div>
      <MainDiv>
        <Heading>
          <h1>
            Popular Volumes
          </h1>
          <Link to="/comics">
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
            {popularComics.map((item:any,index:any)=>(
              <SwiperSlide key={index}>
                <Wrapper>
                  <Link to="#">
                    <img src={item.imgUrl} alt="" />
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

const Wrapper = styled.div`
  width:160px;
  img{
    width:154px;
    height: 250px;
    object-fit: cover;
    border-radius: 1.5rem;
  }
  p{
    font-weight: 500;
    font-family: "Gilroy-Medium",sans-serif;
  }
  @media screen and (max-width:600px){
    width:120px;
    img{
      width:120px;
      height: 165px;
    }
  }
  @media screen and (max-width:400px){
    width:100px;
    img{
      width:100px;
      height: 150px;
    }
  }

`

const Heading = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 3rem;;
  a{
    text-decoration: none;
    color: #ebe9e9;
  }
  h1{
    font-size:2.3rem;
    color:#ebe9e9;
  }
  @media screen and (max-widht:900px){
    margin-right:1rem;
    h1{
      font-size:2rem;
    }
  }
  @media screen and (max-width:600px){
    margin-right:1rem;
    h1{
      font-size:1.6rem;
    }
  }

`
const MainDiv = styled.div`
  margin-left:2rem;
`

export default PopularComics