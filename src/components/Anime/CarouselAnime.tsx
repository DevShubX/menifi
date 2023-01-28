import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselSkeleton from '../Skeletons/CarouselSkeleton';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { MdOutlineSlideshow } from 'react-icons/md';
import useWindowDimension from '../../hooks/useWindowDimension';
import { Link } from 'react-router-dom';
import { AiFillPlayCircle } from 'react-icons/ai';

const CarouselAnime = () => {
    const [carouselData, setCarouselData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const { width, height } = useWindowDimension();
    useEffect(() => {
        getCarouselData()
    }, []);

    const getCarouselData = async () => {
        let result = await axios.get(`https://redux-api-wine.vercel.app/api/trending?page=1&count=30`);
        setCarouselData(result.data.data.Page.media);
        setLoading(false);
    }

    function checkWidth() {
        if (width >= 1700 && width <= 1920) {
            return "large";
        }
        else if (width >= 1000 && width < 1700) {
            return "medium";
        }
        else if (width <= 900) {
            return "small";
        }
    }
    return (
        <div>
            <MainDiv>
              <Heading>
                <span>Recommended</span> To You
              </Heading>
                {loading && (<CarouselSkeleton />)}
                {!loading && (
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, Scrollbar]}
                        slidesPerView={1}
                        spaceBetween={50}
                        pagination={{ dynamicBullets: true, dynamicMainBullets: 4 }}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                    >
                        {carouselData.map((item: any, index: any) => (item.bannerImage !== null || undefined || "") && (
                            <SwiperSlide key={item.id}>
                                <Container>
                                    <img src={item.bannerImage} alt="" />
                                    <Wrapper>
                                        <Content>
                                            <h1>
                                                {item.title.userPreferred !== null || undefined || "" ? item.title.userPreferred : item.title.romaji !== null || undefined || "" ? item.title.romaji : item.title.english}
                                            </h1>
                                            <p>
                                                <MdOutlineSlideshow className='icons' />
                                                Episodes : {item.episodes !== null || undefined ? item.episodes : "N/A"}
                                            </p>
                                            <p className='desc'>
                                                {
                                                    checkWidth() === "small" ? item.description.substring(0, 75).replace(/(<([^>]+)>)/ig, '') + "..." :
                                                        checkWidth() === "medium" ? item.description.substring(0, 250).replace(/(<([^>]+)>)/ig, '') + "..." : item.description.replace(/(<([^>]+)>)/ig, '')
                                                }
                                            </p>
                                            <Button to={"/animes/search/" + (item.title.userPreferred !== null || undefined || "" ? item.title.userPreferred : item.title.romaji !== null || undefined || "" ? item.title.romaji : item.title.english)}>
                                                <button>
                                                    <AiFillPlayCircle className='play-icon' />
                                                    <p>
                                                        Watch Now
                                                    </p>
                                                </button>
                                            </Button>
                                        </Content>
                                    </Wrapper>
                                </Container>
                                {width >= 1200 && (
                                    <PosterImage>
                                        <img src={item.coverImage.large !== null || undefined || "" ? item.coverImage.large : item.coverImage.medium} alt="" />
                                    </PosterImage>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </MainDiv>
        </div>
    )
}

const Heading = styled.div`
  font-size : 2.3rem;
  margin:2rem 0 0rem 2rem;
  color : #ebe9e9;
  span{
    font-family:"Gilroy-Bold",sans-serif;
  }
  @media screen and (max-width:900px){
    font-size : 1.8rem;
  }
`

const PosterImage = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%,20%);
    img{
        border-radius:0.5rem;
        filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
    }

`

const Button = styled(Link)`
  text-decoration:none;
  position: absolute;
  left: 0;
  bottom:0;
  margin: 0 0 2rem 1rem;
  button{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e71a1a;
    border:none;
    cursor: pointer;
    color:white;
    border-radius:0.5rem;
    .play-icon{
      vertical-align: middle;
      font-size:2rem;
      margin-right: 0.5rem;
      @media screen and (max-width:900px){
        font-size:1.5rem;
      }
    }
  }
  p{
    font-size:1rem;
    font-family:"Gilroy-Bold",sans-serif;
    font-weight: 600 ;
    margin: 1rem 0.5rem 1rem 0;
    @media screen and (max-width:900px){
      font-size:0.9rem;
    }
  }

  @media screen and (max-width:900px) {
    bottom: -10%;
  }


`
const Content = styled.div`
  margin-left:1rem;
  h1{
    color:#ff0000;
    font-family: "Gilroy-Bold",sans-serif;
    max-width: 70%;
  }
  p{
    justify-content: center;
    align-items: center;
    font-family: "Gilroy-Medium",sans-serif;
  }
  .desc{
    max-width:50%;
    max-height: 150px;
    overflow-y: scroll;
    font-size:1.1rem;
    
  }
  .icons{
    vertical-align: middle;
    margin-bottom: 0.2rem;
    margin-right: 0.1rem;
    font-size:1.15rem;
  }
  @media screen and (max-width:900px){
    h1{
      font-size:1.3rem;
      max-width: 100%;
    }
    .desc{
      font-size:1rem;
    }
  }

`
const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width:100%;
  height: 99%;
  border-radius:1.5rem;
  background: rgba(0,0,0,0) 
    linear-gradient( to left,rgba(27 ,26 ,39,0) 0%,
    rgba(38,36,65,0.6) 0%,
    rgba(0,0,0,0.7) 100%
    );
    display: flex;
`


const Container = styled.div`
  margin:2rem 2rem 2rem 2rem;
  position: relative;
  img{
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius:1.5rem;
  }
  @media screen and (max-width:900px){
    img{
      height: 250px;
      object-fit: cover;
    }
  }
`

const MainDiv = styled.div`
position: relative;
  .swiper-pagination-bullet-active{
    background-color:red;
  }
`

export default CarouselAnime