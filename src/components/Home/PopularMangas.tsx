import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
import useWindowDimension from '../../hooks/useWindowDimension';

const PopularMangas = () => {
    const [popularMangas, setPopularMangas] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const { width, height } = useWindowDimension();
    useEffect(() => {
        getTopManga();
    }, []);

    const getTopManga = async () => {
        let top_manga = await axios.get(`https://api.jikan.moe/v4/top/manga`);
        setPopularMangas(top_manga.data.data);
        setLoading(false);
    }
    return (
        <div>
            <MainDiv>
                <Heading>
                    <h1>
                        Popular Mangas
                    </h1>
                    <Link to={'/mangas'}>
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
                        {popularMangas.map((item: any, index: any) => (
                            <SwiperSlide key={index}>
                                <Wrapper>
                                    <Link to="#">
                                        <img src={item.images.webp.image_url} alt="" />
                                    </Link>
                                    <p>
                                        {item.title_english !== null || undefined ? item.title_english : item.title !== null || undefined ? item.title : item.tile_japenese}
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
    align-items: center;
    margin-right: 3rem;
    font-family:"Gilroy-Bold",sans-serif;
    a{
        text-decoration: none;
        color: #ebe9e9;
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
    }
    @media screen and (max-width:600px){
        margin-right:1rem;
        h1{
        font-size: 1.6rem;
        }
    }
`
const Wrapper = styled.div`
    width : 160px;
    img{
        width : 154px;
        height: 250px;
        border-radius: 1.5rem;
        object-fit: cover;
    }
    p{
        font-weight: 500;
        font-family: "Gilroy-Medium",sans-serif;
    }
    @media screen and (max-width:600px){
        width: 120px;
        img{
            width: 120px;
            height: 165px;
        }
    }
    @media screen and (max-width:400px){
        width: 100px;
        img{
            width: 100px;
            height: 140px;
        }
    }
`

const MainDiv = styled.div`
    margin-left:2rem;
    
`

export default PopularMangas