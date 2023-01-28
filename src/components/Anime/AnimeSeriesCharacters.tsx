import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';

const AnimeSeriesCharacters = ({ idMal }: { idMal: any }) => {
    const [animeCharacters, setAnimeCharacters] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAnimeCharacters();
    }, [])

    const getAnimeCharacters = async () => {
        const result = await axios.get(`https://api.jikan.moe/v4/anime/${idMal}/characters`);
        setAnimeCharacters(result.data.data);
        setLoading(false);
    }
    return (
        <div>
            <MainDiv>
                <Heading>
                    <h1>
                        Anime Characters
                    </h1>
                    {loading && <HomeCardSkeleton />}
                    {!loading && (
                        <Swiper
                            slidesPerView={8}
                            spaceBetween={25}
                            modules={[Scrollbar]}
                            scrollbar={{
                                hide:true
                            }}
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
                            {animeCharacters.map((item: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <Wrapper>
                                        <img src={item.character.images.webp.image_url} alt="" />
                                        <div>
                                            <p className='role'>{item.role}</p>
                                            <p className='name'>{item.character.name}</p>
                                        </div>
                                    </Wrapper>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </Heading>
            </MainDiv>
        </div>
    )
}

const Wrapper = styled.div`
    width: 150px;
    div{
        text-align: center;
        .role{
            font-family: "Gilroy-Regular",sans-serif;
        }
    }
    img{
        width: 150px;
        border-radius:0.5rem;
    }
    p{
        font-family: "Gilroy-Bold",sans-serif;

    }
    @media screen  and (max-width:600px){
      width: 120px;
      img{
          width: 120px;
          height: 180px;
      }
      p{
        font-size : 1rem
      }
  }
  @media screen and (max-width:400px){
      width:100px;
      img{
          width:100px;
          height: 160px;
      }
      p{
        font-size : 0.7rem;
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
        }
    }
    
`

const MainDiv = styled.div`
    
`

export default AnimeSeriesCharacters