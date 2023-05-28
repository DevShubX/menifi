import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';

const RelatedAnimePictures = ({ idMal }: { idMal: any }) => {
    const [relatedAnimePic, setAnimePic] = useState<any>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getAnimePics()
    }, [idMal]);

    const getAnimePics = async () => {
        let result = await axios.get(`https://api.jikan.moe/v4/anime/${idMal}/pictures`);
        setAnimePic(result.data.data);
        setLoading(false);
    }
    return (
        <div>
            <MainDiv>
                <Heading>
                    <h1>
                        Related Photos From Anime
                    </h1>
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
                        {relatedAnimePic.map((item: any, index: any) => (
                            <SwiperSlide key={index}>
                                <Wrapper>
                                    <img src={item.webp.image_url} alt="" />
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
    img{
        width: 200px;
        height: 270px;
        object-fit: cover;
        border-radius: 0.5rem;
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
    h1{
        font-family: "Gilroy-Bold",sans-serif;
    }
    @media screen and (max-width:600px){
        h1{
            font-size : 1.5rem;
            margin: 2rem 0 1rem 0 ;
        }
    }
`

const MainDiv = styled.div`
    margin: 5rem 2rem 0rem 0rem;
    @media screen and (max-width:600px){
        margin: 0rem 1rem 0 0rem;
    }
`

export default RelatedAnimePictures