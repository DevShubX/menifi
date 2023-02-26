import { onChildRemoved, onValue, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { AiFillCloseCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { database } from '../../Firebase/firebase'
import { useStateContext } from '../../GlobalContext/ContextProvider';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';

const ContinueWatchingMovies = () => {
    const { currentUser } = useStateContext();
    const [loading, setLoading] = useState(true);
    const [movies_arr, setMoviesArr] = useState<any>([]);
    const dbref = ref(database, `users/${currentUser.uid}/continueWatching/movies/movies_arr`);
    useEffect(() => {
        const controller = new AbortController();
        getMovies();
        return ()=>{
            controller.abort();
        }
    }, [loading,currentUser]);



    const getMovies =()=>{
        setLoading(true);
        onValue(dbref, (snapshot) => {
            if (snapshot.exists()) {
                let movie = snapshot.val();
                setMoviesArr(movie);
            }
            
        });
        onChildRemoved(dbref, (snapshot) => {
            let movie = snapshot.val();
            setMoviesArr(movie);
        });
        setLoading(false);

    }
    const removeContinueWatching = (id: any) => {
        const newContinueWatching = movies_arr;
        newContinueWatching.splice(id, 1);
        set(ref(database, `users/${currentUser.uid}/continueWatching/movies`), {
            movies_arr: newContinueWatching,
        });
        
    }
    return (
        <div>
            <MainDiv>
                {movies_arr.length > 0 && (
                    <div>
                        <Heading>
                            <h1>
                                Continue Watching
                            </h1>
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
                                breakpoints={{
                                    "@0.00": {
                                        slidesPerView: 3,
                                        spaceBetween: 15,
                                    },
                                    "@0.75": {
                                        slidesPerView: 4,
                                        spaceBetween: 40,
                                    },
                                    "@1.00": {
                                        slidesPerView: 4,
                                        spaceBetween: 40,
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
                                {movies_arr.map((item: any, index: any) => (
                                    <SwiperSlide>
                                        <Content>
                                            <Wrapper>
                                                <Link to={item.movieStreamingLink}>
                                                    <img src={item.filmPoster} alt="" />
                                                </Link>
                                                <Button onClick={() => removeContinueWatching(index)}>
                                                    <AiFillCloseCircle className='icon-q'/>
                                                </Button>
                                            </Wrapper>

                                            <p>{item.title}</p>
                                        </Content>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                )}

            </MainDiv>
        </div>
    )
}

const Content = styled.div`
    position : relative ;
    max-width:160px;
    p{
        font-family:'Gilroy-Medium',sans-serif;
    }
`

const Button = styled.button`
    position : absolute;
    right : 0;
    top : 0;
    border : none;
    background-color : transparent;
    color : red;
    font-size : 2rem;
    cursor : pointer;
    .icon-q{
        background-color: #ffffff;
        border-radius : 50%;
    }
`

const Wrapper = styled.div`
    width: 160px;
    position : relative ;
    img{
        border-radius: 0.5rem;
        width: 160px;
    }
    p{
        position: relative;
        bottom: 30px;
        font-weight: 600;
        font-family: "Gilroy-Medium",sans-serif;
    }
    @media screen and  (max-width:600px){
    width: 120px;
        img{
        width:120px;
        }
    }
    @media screen and (max-width:400px) {
        width:100px;
        img{
        width: 100px;
        }
    }
`

const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 3rem;
    a{
    color: #ebe9e9;
    text-decoration: none;
    }
    h1{
        font-size: 2rem;
        color:#ebe9e9;
        font-family:'Gilroy-Bold',sans-serif;
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

export default ContinueWatchingMovies;