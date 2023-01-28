import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';

const PopularAlbumSlider = () => {
    const [Albums, setAlbums] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getMusic();
    }, []);
    const getMusic = async () => {
        let music = await axios.get(`https://saavn.me/modules?language=hindi,english`);
        setAlbums(music.data.data.albums);
        setLoading(false);
    }
    return (
        <div>
            <MainDiv>
                <Heading>
                    <h1>
                        Music Albums
                    </h1>
                    <Link to={""}>
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
                        breakpoints={{
                            1800: {
                                slidesPerView: 6,
                                spaceBetween: 25,
                            },
                            1600: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 20,
                            },
                            900: {
                                slidesPerView: 4,
                                spaceBetween: 15,
                            },
                            600: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            400: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                            300:{
                                slidesPerView:3,
                                spaceBetween:15,
                            }

                        }}
                    >
                        {Albums.map((item:any,index:any)=>(
                            <SwiperSlide key={item.id}>
                                <Wrapper>
                                    <Link to={`/music/albumdetails/${item.id}`}>
                                        <img src={
                                            item?.image[2]?.link
                                        } alt="" />
                                        <p>
                                            {item.name}
                                        </p>
                                    </Link>
                                </Wrapper>
                            </SwiperSlide>
                        ))
                        }
                    </Swiper>
                )}
            </MainDiv>
        </div>
    )
}

const Wrapper = styled.div`
    a{
        text-decoration:none;
        color:#ebe9e9;
        max-width:193px;
    }
    p{
        max-width:193px;
        font-family:"Gilroy-Medium",sans-serif;
        font-size: 1.3rem;
    }
    img{
        width:193px;
        height:193px;
        border-radius:0.5rem;
    }
    @media screen and (max-width:1200px){
        img{
            width:160px;
            height:160px;
        }
    }
    @media screen and (max-width:900px){
        img{
            width:150px;
            height:150px;
        }
    }
    @media screen and (max-width:600px){
        p{font-size: 1rem ;}
        img{
            width:120px;
            height:120px;
        }
    }
    @media screen and (max-width:400px){
        img{
            width:100px;
            height:100px;
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


export default PopularAlbumSlider