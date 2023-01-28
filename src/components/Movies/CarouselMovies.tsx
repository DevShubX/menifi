import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimension from '../../hooks/useWindowDimension';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { MdDateRange, MdOutlineSlideshow } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AiFillPlayCircle } from 'react-icons/ai';
import { getEventListeners } from 'events';
import Carousel from '../Home/Carousel';
import CarouselSkeleton from '../Skeletons/CarouselSkeleton';


const CarouselMovies = () => {
  const [CarouselMovies, setCarouselMovies] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowDimension();
  useEffect(() => {
    getCarouselMovies();
  }, []);
  const getCarouselMovies = async () => {
    let movies = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`)
    setCarouselMovies(movies.data.results);
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
        {loading && (<CarouselSkeleton/>)}
        {!loading && (
          <Swiper
            modules={[A11y, Autoplay, Navigation, Pagination, Scrollbar]}
            slidesPerView={1}
            spaceBetween={50}
            pagination={{ dynamicBullets: true, dynamicMainBullets: 4 }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {CarouselMovies.map((item: any, index: any) => (
              <SwiperSlide key={item.id}>
                <Container>
                  <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="" />
                  <Wrapper>
                    <Content>
                      <h1>
                        {item.title !== null || undefined || "" ? item.title : item.original_title !== null || undefined || "" ? item.original_title : ""}
                      </h1>
                      <p>
                        <MdOutlineSlideshow className='icons' />
                        {(item.media_type).toUpperCase()}
                      </p>
                      <p>
                        <MdDateRange className='icons' />
                        {item.release_date !== undefined || null ? item.release_date : ""}
                      </p>
                      <p className='desc'>
                        {
                          checkWidth() === "small" ? item.overview.substring(0, 75) + "..." : checkWidth() === "medium" ? item.overview.substring(0, 250) + "..." : item.overview
                        }
                      </p>
                      <Button to={'/movies/search/' + (item.title !== null || undefined || "" ? item.title : item.original_title !== null || undefined || "" ? item.original_title : "")}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </MainDiv>
    </div>
  )

}

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
    border-radius:1rem;
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
    @media screen and (max-width:900px){
      font-size:0.9rem;
    }
  }


`


const Content = styled.div`
  margin-left:1rem;
  h1{
    color:red;
    font-family: "Gilroy-Bold",sans-serif;
  }
  p{
    justify-content: center;
    align-items: center;
    font-family: "Gilroy-Regular",sans-serif;
  }
  .desc{
    max-width:50%;
    
  }
  .icons{
    vertical-align: middle;
    margin-bottom: 0.2rem;
    margin-right: 0.1rem;
    font-size:1.15rem;
  }
  @media screen and (max-width:900px){
    h1{
      font-size:1.5rem;
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
    rgba(38,36,65,0.3) 0%,
    rgb(0,0,0) 100%
    );
  
`

const Container = styled.div`
  margin:2rem 2rem 2rem 2rem;
  position: relative;
  img{
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius:1.5rem;
  }
  @media screen and (max-width:900px){
    img{
      height: 330px;
    }
  }
`

const MainDiv = styled.div`
  .swiper-pagination-bullet-active{
    background-color:red;
  }
`

export default CarouselMovies