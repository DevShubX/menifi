import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import { A11y,Autoplay,Navigation,Pagination,Scrollbar } from 'swiper'
import useWindowDimension from '../../hooks/useWindowDimension'
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import {AiFillPlayCircle} from 'react-icons/ai'
import {MdDateRange, MdOutlineSlideshow} from 'react-icons/md'
const Carousel = ({props}:{props:any}) => {
    const {width,height} = useWindowDimension();
  return (
    <MainDiv>
        <Swiper
        modules={[A11y,Autoplay,Navigation,Pagination,Scrollbar]}
        slidesPerView = {1}
        spaceBetween={50}
        pagination = {{dynamicMainBullets:3,dynamicBullets:true,}}
        loop = {true}
        autoplay = {{
            delay : 5000,
            disableOnInteraction:false,
        }}
        >
            {props.map((item:any,index:any)=> item.backdrop_path !== null && (
                <SwiperSlide key={item.id}>
                    <Container>
                        <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="" />
                        <Wrapper>
                            <Content>
                                <h1>
                                    {item.media_type === 'tv' ? item.name : item.title}
                                </h1>
                                <p>
                                    <MdOutlineSlideshow className='icons'/>
                                   {(item.media_type).toUpperCase()}
                                </p>
                                <p>
                                    <MdDateRange className='icons'/>
                                   {item.release_date !== undefined ? item.release_date : item.first_air_date}
                                </p>
                                {width <=1000 && (
                                    <p>
                                        {item.overview !== null ? item.overview.substring(0,75) + "..." : "Not Available"}
                                    </p>
                                )}
                                {width > 1000 && (
                                    <p>
                                        {item.overview !== null ? item.overview.substring(0,500) + "..." : "Not Available"}
                                    </p>
                                )}
                                {width <= 900 && (
                                    <IconContext.Provider
                                    value={{
                                        size:'1.5rem',
                                        style:{
                                            verticalAlign:"middle",
                                            marginLeft:'0.5rem'
                                        }

                                    }}>
                                        <Button to="#">
                                            <button>
                                                <AiFillPlayCircle/>
                                                <p>
                                                    Watch Now
                                                </p>
                                            </button>
                                        </Button>
                                    </IconContext.Provider>
                                )}
                                {width > 900 && (
                                    <IconContext.Provider
                                    value={{
                                        size:'2rem',
                                        style:{
                                            verticalAlign:"middle",
                                            marginLeft:'0.5rem'
                                        }

                                    }}>
                                        <Button to={`#`}>
                                            <button>
                                                <AiFillPlayCircle/>
                                                <p>
                                                    Watch Now
                                                </p>
                                            </button>
                                        </Button>
                                    </IconContext.Provider>
                                )}
                            </Content>
                        </Wrapper>
                    </Container>
                </SwiperSlide>
            ))}
        </Swiper>
    </MainDiv>
  )
}

const MainDiv = styled.div`
    .swiper-pagination-bullet-active{
        background-color: red;
    }
`
const Button = styled(Link)`
    text-decoration: none;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0 0 2rem 1rem;
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e71a1a;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 1rem;
        
    }
    p{
        font-size:1rem;
        margin-left:0.2rem;
        margin-right:0.5rem;
        font-family:"Gilroy-Bold",sans-serif;
        font-weight: 600;
    }

    @media screen and (max-width:900px){
        p{
            font-size:0.9rem;
        }
    }
`

const Content = styled.div`
    margin: 0 0 0 1rem;
    h1{
        color:red;
        font-family: "Gilroy-Bold",sans-serif;
    }
    p{
        justify-content: center;
        align-items: center;
        font-family: 'Gilroy-Medium',sans-serif;
    }
    .icons{
        vertical-align: middle;
        margin-bottom: 0.2rem;
        margin-right: 0.1rem;
        font-size: 1.15rem;
    }

    @media screen and (max-width:900px){
        h1{
            font-size:1.5rem;
        }
    }
`

const Wrapper = styled.div`
    position: absolute;
    border-radius: 1.5rem;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 50%;
    height: 99%;
    background: rgba(0,0,0,0) 
    linear-gradient( to left,rgba(27 ,26 ,39,0) 0%,
    rgba(38,36,65,0.3) 10%,
    rgb(0,0,0) 100%
    );
    @media screen and (max-width:900px){
        width: 70%;
    }
    
`

const Container = styled.div`
    margin: 2rem 2rem 2rem 2rem;
    position: relative;
    img{
        object-fit: cover;
        width: 100%;
        height: 350px;
        border-radius: 1.5rem;
    }
    @media screen and (max-width:900px){
        img{
            height: 330px;
        }  
    }
`
export default Carousel