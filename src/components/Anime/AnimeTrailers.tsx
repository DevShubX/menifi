import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimension from '../../hooks/useWindowDimension';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper'
import { AiOutlineClose } from 'react-icons/ai';
const AnimeTrailers = () => {
    const [animeData, setAnimeData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const { width, height } = useWindowDimension();
    const [embedUrl, setEmbedUrl] = useState("");
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        getAnimeData();
    }, []);

    const getAnimeData = async () => {
        let result = await axios.get(`https://api.jikan.moe/v4/seasons/upcoming?page=1`);
        setAnimeData(result.data.data);
        setLoading(false);
    }


    return (
        <div>
            <MainDiv>
                <Heading>
                    <h1>
                       Upcoming Anime Trailers
                    </h1>
                </Heading>
                {!loading && (
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={25}
                        className="MySwiper"
                        modules={[A11y, Autoplay, Navigation, Pagination, Scrollbar]}
                        pagination={{ dynamicBullets: true, dynamicMainBullets: 4 }}
                        loop={true}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            "@0.00": {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            "@0.75": {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            "@1.00": {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            "@1.50": {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            "@2.00": {
                                slidesPerView: 4,
                                spaceBetween: 35,
                            }
                        }}>
                        {animeData.map((item: any, index: any) => ((item.trailer !== undefined || null || "") && item.trailer.embed_url !== null && item.trailer.images.image_url !== null) && (
                            <SwiperSlide>
                                <Wrapper onClick={() => { setEmbedUrl(item.trailer.embed_url); setIsActive(true) }}>
                                    <img src={item.trailer.images.medium_image_url} alt="" />
                                    <p>
                                        {(item.title !== undefined || null || "") ? item.title : (item.title_english !== undefined || null || "") ? item.title_english : item.title_japanese}
                                    </p>
                                </Wrapper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                {isActive && (
                    <Trailer>
                        <iframe width={(width <= 900) ? 300 : 500} height={(width <= 900) ? 200 : 300}
                            src={embedUrl.replace("autoplay=1", "autoplay=0")}
                            allowFullScreen
                            >
                        </iframe>
                        <button onClick={()=>setIsActive(false)}>
                            <AiOutlineClose className='cancel'/>
                        </button>
                    </Trailer>

                )}
            </MainDiv>
        </div>
    )
}

const Trailer = styled.div`
    margin-top: 1rem;
    margin-bottom:1rem;
    text-align: center;
    width: 100%;
    button{
        position: absolute;
        border : none;
        background-color: transparent;
        margin-left: 2rem;
        cursor: pointer;
        .cancel{
            font-size : 2rem;
            color: red;
        }
        @media screen and (max-width:400px){
            margin-left:0rem;
        }
    }
`

const Wrapper = styled.div`
    width: 400px;
    cursor: pointer;
    img{
        width: 400px;
        height: 235px;
        border-radius: 1rem;
        object-fit: cover;
    }
    p{
        font-family: "Gilroy-Medium",sans-serif;
        font-size:1.2rem;
        max-width:400px;
    }
  @media screen and (max-width:1900px){
    width: 400px;
    img{
        width: 300px;
        height: 200px;
    }
    p{
        max-width:300px;
    }
  }
  @media screen and (max-width:1100px){
    width: 240px;
    img{
        width: 240px;
        height: 160px;
    }
    p{
        max-width:240px;
    }
  }
  @media screen and (max-width:910px) {
    width:250px;
    img{
        width:300px;
        height: 160px;
    }
    p{
        max-width:200px;
    }
  }
  @media screen  and (max-width:600px){
      width: 180px;
      img{
          width: 180px;
          height: 120px;
      }
    p{
       max-width:180px;
    }
  }
  @media screen and (max-width:400px){
      width:150px;
      img{
          width:150px;
          height: 130px;
      }
      p{
        max-width:150px;
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
  margin-right: 2rem;
  .swiper-pagination-bullet-active{
    background-color:red;
  }
`

export default AnimeTrailers