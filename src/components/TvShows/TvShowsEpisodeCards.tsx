import axios from 'axios';
import { get, ref, set, update } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { database } from '../../Firebase/firebase';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';

const TvShowsEpisodeCards = ({ tvSeasonID, mediaId, tvDetails }: { tvSeasonID: any, mediaId: any, tvDetails: any }) => {
    const [loading, setLoading] = useState(true);
    const [tvshowepisodes, setTvshowepisodes] = useState<any>([]);
    const { currentUser } = useStateContext();

    useEffect(() => {
        getTvShowEpisodes();
    }, [tvSeasonID]);

// 100 -> 110
    const getTvShowEpisodes = async () => {
        setLoading(true);
        let episodes = await axios.get(`https://menifi-api.vercel.app/api/tv/episodes/${tvSeasonID}`);
        setTvshowepisodes(episodes.data);
        setLoading(false);
    }

    const updateContinueWatching = (userId: any, newContinueWatching: any, tvstring: any, StreamingLink: any) => {
        const db = database;
        const dbref = ref(database, `users/${userId}/continueWatching/tvshows`);
        let arr: any = [];
        get(ref(database, `users/${userId}/continueWatching/tvshows/tvshows_arr`)).then(async (snapshot: any) => {
            if (snapshot.exists()) {
                snapshot.forEach((snap: any) => {
                    if (snap.val().movieId !== newContinueWatching.movieId) {
                        arr.push(snap.val());
                    }
                });
                arr.push({ ...newContinueWatching, TvDetailsPage: tvstring, TvStreamingLink: StreamingLink });
                update(dbref, {
                    tvshows_arr: arr,
                });///End 
            }

            else {
                arr.push({ ...newContinueWatching, TvDetailsPage: tvstring, TvStreamingLink: StreamingLink });
                console.log("No data available");
                update(dbref, {
                    tvshows_arr: arr,
                })
            }
        }).catch((error) => {
            console.error(error);
        });
        const newdbref = ref(database, `users/${userId}/recentlyWatched`);
        let arr2: any = [];
        get(ref(database, `users/${userId}/recentlyWatched/recently_watched_arr`)).then(async (snapshot: any) => {
            if (snapshot.exists()) {
                snapshot.forEach((snap: any) => {
                    if (snap.val().movieId !== newContinueWatching.movieId) {
                        arr2.push(snap.val());
                    }
                });
                arr2.push({ ...newContinueWatching, TvDetailsPage: tvstring, TvStreamingLink: StreamingLink });
                set(newdbref, {
                    recently_watched_arr: arr2,
                })
            } else {
                arr2.push({ ...newContinueWatching, TvDetailsPage: tvstring, TvStreamingLink: StreamingLink });
                console.log("No data available");
                set(newdbref, {
                    recently_watched_arr: arr2,
                })
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <div>
            <MainDiv>
                <div>
                    <p>
                        Total Episodes : <span>{tvshowepisodes.length}</span>
                    </p>
                </div>
                {loading && <HomeCardSkeleton />}
                {!loading && (
                    <Swiper
                        scrollbar={{
                            hide: true
                        }}
                        modules={[Scrollbar]}
                        breakpoints={{
                            1800: {
                                slidesPerView: 5,
                                spaceBetween: 25,
                            },
                            1600: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1400: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            1000: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            900: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            600: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            400: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            350: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            }

                        }}
                    >
                        {tvshowepisodes.map((item: any, index: any) => (
                            <SwiperSlide key={item.episodeId}>
                                <Wrapper>
                                    <ImageWrapper
                                        onClick={() => updateContinueWatching(currentUser.uid, tvDetails, mediaId,
                                            `/tvshows/watch&episodeId=${item.episodeId}&mediaId=${mediaId.replace("tv/", "tv+")}&episodeName=${item.episodeName}`)}

                                        to={`/tvshows/watch&episodeId=${item.episodeId}&mediaId=${mediaId.replace("tv/", "tv+")}&episodeName=${item.episodeName}`}>
                                        {item.coverImage.includes("ep-no-thumb") ? <img src='https://www.tgv.com.my/assets/images/404/movie-poster.jpg' /> : <img src={item.coverImage} alt="" />}
                                        <div>
                                            <p>
                                                {item.episodeName}
                                            </p>
                                        </div>
                                        <BsFillPlayCircleFill className='play-icon' />
                                    </ImageWrapper>
                                </Wrapper>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </MainDiv>
        </div>
    )
}

const ImageWrapper = styled(Link)`
    position: relative;
    text-decoration: none;
    font-family: "Gilroy-Bold",sans-serif;
    img{
        border-radius:0.5rem;
        width: 300px;
        height: 168px;
        @media screen and (max-width:1500px){
            width: 200px;
            height: 140px;
        }
        @media screen and (max-width:600px){
            width: 180px;
            height: 120px;
        }
        @media screen and (max-width:400px){
            width: 150px;
            height: 100px;
        }
    }
    div{
        width: 100%;
        height: 55px;
        position: absolute;
        bottom: 3px;
        left: -1px;
        display: flex;
        color: white;
        background: linear-gradient(135deg,rgba(255,255,255,0.1), rgba(255,255,255,0));
        backdrop-filter: blur(10px);
        border-radius: 0.5rem ;
        border: 1px solid rgba(255,255,255,0.18);
        display: flex;
        align-items: center;
        overflow: hidden;
        p{
            font-size: 1rem;
            padding: 0;
            margin: 1rem 0 1rem 1rem;
            font-family:"Gilroy-Medium",sans-serif;
            @media screen and (max-width:900px){
                font-size : 0.8rem;
            }
        }

        @media screen and (max-width:400px){
            height: 30px;
        }
       
    }
    .play-icon{
            position: absolute;
            bottom: 45px;
            right: 20px;
            color: blue;
            font-size : 1.8rem;
            transform: scale(1);
            transition: transform 0.5s;
            :hover{
                transform: scale(1.1);
            }
        }
`

const Wrapper = styled.div`
    margin-bottom: 1rem;
`

const MainDiv = styled.div`
    margin-left:2rem;
    margin-top: 2rem;
    font-family: "Gilroy-Medium",sans-serif;
    @media screen and (max-width:900px){
        margin-top:1rem;
        margin-left: 2rem;
    }
`
export default TvShowsEpisodeCards