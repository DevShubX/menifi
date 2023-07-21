import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';
import { Navigation, Mousewheel, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import useWindowDimension from '../../hooks/useWindowDimension';
import { database } from '../../Firebase/firebase';
import { get, ref, set, update } from 'firebase/database';
import { useStateContext } from '../../GlobalContext/ContextProvider';

const EpisodeSectionWithImage = ({ id ,animeInfo,animeSlug}: { id: any ,animeInfo:any,animeSlug:any}) => {
    const [animeEpisodes, setAnimeEpisodes] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("");
    const { width, height } = useWindowDimension();
    const [visible, setMoreVisible] = useState(12);
    const {currentUser,} = useStateContext();
    const [animeDetails,setAnimeDetails] = useState<any>({});
    useEffect(() => {
        getAnimeData();
    }, [id]);

    const getAnimeData = async () => {
        console.log(animeInfo);
        try{
            let result = await axios.get(`https://redux-api-wine.vercel.app/api/info/anilist?id=${id}`);
            if(result.status === 200){
                setAnimeEpisodes(result.data.episodes);
                setAnimeDetails(result.data);
                setColor(result.data.color);
            }else{
                console.log("API return status code",result.status);
            }
        }catch(err){
            console.log(err);
            setAnimeEpisodes(animeInfo[0].gogoResponse.episodes);
        }
        
       setLoading(false);
       
          
    }
    const updateContinueWatching = (userId: any, newContinueWatching: any, animeString: any, StreamingLink: any) => {
        const db = database;
        const dbref = ref(database, `users/${userId}/continueWatching/animes`);
        let arr: any = [];
        get(ref(database, `users/${userId}/continueWatching/animes/animes_arr`)).then(async (snapshot: any) => {
            if (snapshot.exists()) {
                snapshot.forEach((snap: any) => {
                    if (snap.val().id !== newContinueWatching.id) {
                        arr.push(snap.val());
                    }
                });
                arr.push({ ...newContinueWatching, movieId: animeString, StreamingLink: StreamingLink });
                set(dbref, {
                    animes_arr: arr,
                });///End 
            }

            else {
                arr.push({ ...newContinueWatching, movieId: animeString, StreamingLink: StreamingLink });
                console.log("No data available");
                set(dbref, {
                    animes_arr: arr,
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
                    if (snap.val().id !== newContinueWatching.id) {
                        arr2.push(snap.val());
                    }
                });
                arr2.push({ ...newContinueWatching, movieId: animeString, StreamingLink: StreamingLink });
                set(newdbref, {
                    recently_watched_arr: arr2,
                })
            } else {
                arr2.push({ ...newContinueWatching, movieId: animeString, StreamingLink: StreamingLink });
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
                <Heading>
                    <h1>
                        Episodes
                    </h1>

                </Heading>
                {loading && (<HomeCardSkeleton />)}
                {!loading && (width > 600) && (
                    <Swiper /// this breakpointer works like 320>=\
                        modules={[Navigation, Mousewheel,Scrollbar]}
                        scrollbar={{draggable:true}}
                        mousewheel={true}
                        breakpoints={
                            {
                                1800: {
                                    slidesPerView: 5,
                                    spaceBetween: 25,
                                },
                                1600: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 3,
                                    spaceBetween: 15,
                                },
                                1000: {
                                    slidesPerView: 2,
                                    spaceBetween: 15,
                                },
                                900: {
                                    slidesPerView: 2,
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

                            }
                        }
                    >
                        {animeEpisodes.map((episode: any, index: any) => (
                            <SwiperSlide>
                                <Wrapper to={`/animes/watch&episodeId=${(animeInfo[0].gogoResponse.episodes[index] ?? animeInfo[0].anilistResponse.episodes[index])?.replace("/","")}&animeName=${animeSlug}&id=${id}`} 
                                onClick={()=>updateContinueWatching(currentUser.uid,animeInfo[0].anilistResponse,id,
                                    `/animes/watch&episodeId=${(animeInfo[0].gogoResponse.episodes[index] ?? animeInfo[0].anilistResponse.episodes[index])?.replace("/","")}&animeName=${animeSlug}&id=${id}`)}>
                                    <img src={`${episode.image ?? animeInfo[0].anilistResponse.anilistPoster.large}`} alt="" />
                                    <p style={{ color: color !== "" ? color : "white" }}>Ep {episode.number ?? animeInfo[0].gogoResponse.episodes[index].split("-").reverse()[0]}: {episode.title ?? "NA"}</p>
                                    <div>
                                        {animeInfo[0].gogoResponse.title.toLowerCase().includes("dub") ? "Dub" : "Sub"}
                                    </div>
                                </Wrapper>
                            </SwiperSlide>

                        ))}

                    </Swiper>
                )}

                {!loading && (width <= 600) && (
                    <MainContent>
                        <Content>
                            <CardWrapper>
                                {animeEpisodes.slice(0, visible).map((episode: any, index: any) => (
                                    <Link  to={`/animes/watch&episodeId=${(animeInfo[0].gogoResponse.episodes[index] ?? animeInfo[0].anilistResponse.episodes[index])?.replace("/","")}&animeName=${animeSlug}&id=${id}`} 
                                    onClick={()=>updateContinueWatching(currentUser.uid,animeInfo[0].anilistResponse,id,
                                        `/animes/watch&episodeId=${(animeInfo[0].gogoResponse.episodes[index] ?? animeInfo[0].anilistResponse.episodes[index])?.replace("/","")}&animeName=${animeSlug}&id=${id}`)}>
                                        {/* <img src={`https://images.weserv.nl/?url=${episode.image}`} alt="" /> */}
                                        <img src={`${episode.image ?? animeInfo[0].anilistResponse.anilistPoster.large}`} alt="" />
                                        <p style={{ color: color !== "" ? color : "white" }}>Ep {episode.number ?? animeInfo[0].gogoResponse.episodes[index].split("-").reverse()[0]}: {episode.title ?? "NA"}</p>
                                        <div>
                                            {animeInfo[0].gogoResponse.title.toLowerCase().includes("dub") ? "Dub" : "Sub"}
                                        </div>
                                    </Link>
                                ))}
                            </CardWrapper>
                        </Content>
                        {visible <= animeEpisodes.length && (
                            <button onClick={() => setMoreVisible(visible + animeEpisodes.length)} className="load-more" style={{ backgroundColor: color !== null ? color : "red" }}>
                                Load More
                            </button>
                        )}

                    </MainContent>

                )}
            </MainDiv>
        </div>
    )
}


const MainContent = styled.div`
    text-align:center;
    .load-more{
        margin-top:1rem;
        border :none;
        color: black;
        padding: 0.5rem;
        font-family: "Gilroy-Bold",sans-serif;
        border-radius: 0.5rem;
    }
`

const Content = styled.div`
    text-align: center;
    margin-right: 2rem;
    margin-top: 1rem;
    position:relative;
    @media screen and (max-width:400px){
        margin-right:0.5rem;
        text-align:left;
        overflow-y:scroll;
        max-height:470px;
    }
`

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,180px);
    grid-row-gap: 1rem;
    justify-content: space-around;
    a{
        text-decoration: none;
        position: relative;
        div{
            position: absolute;
            top: 10px;
            right: 10px;
            color: #ffffffe1;
            padding: 0.1rem 0.1rem;
            background-color: #ff0000ae;
            font-family: 'Gilroy-Bold',sans-serif;
            border-radius: 4px;

        }
    }
    p{
        max-width: 160px;
        font-family: "Gilroy-Medium",sans-serif;
        font-size : 1.1rem;
    }
    img{
        width: 180px;
        height: 120px;
        object-fit: cover;
        border-radius: 0.5rem;
    }
    @media screen and (max-width:400px){
        display: flex;
        flex-direction:column;
        a{
            display : flex;
        }
        img{
            width: 155px;
            height: 85px;
        }
        p{
            font-size: 0.9rem;
            margin-left : 1rem;
        }
    }
`
const Wrapper = styled(Link)`
    text-decoration: none;
    /* position: relative; */
    width: 300px;
    p{
        max-width: 300px;
        font-family: "Gilroy-Medium",sans-serif;
        font-size : 1.1rem;
    }
    img{
        width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 0.5rem;
    }
    div{
        position: absolute;
        top: 10px;
        right: 10px;
        color: #ffffffe1;
        padding: 0.2rem 0.2rem;
        background-color: #ff0000ae;
        font-family: 'Gilroy-Bold',sans-serif;
        border-radius: 4px;
    }
    @media screen and (max-width:900px){
        width: 180px;
        img{
            width: 180px;
            height: 120px;
        }
        p{
            font-size : 1rem;
            margin: 1rem 0;
            max-width: 180px;
        }
    }
    @media screen and (max-width:400px){
        width: 160px;
        p{
            width: 160px;
            
        }
        img{
            width:150px;
            height: 100px ;
        }
    }
    
`

const Heading = styled.div`
    h1{
        font-size : 2.3rem;
    }
    margin-bottom: 2rem;
    @media screen and (max-width:400px){
        margin: 3rem 0 2rem 0 ;
        h1{
            font-size : 2rem;
        }
    }
`
const MainDiv = styled.div`
    margin-left: 0rem;
    margin-right: 2rem;
    .swiper-pagination{
        margin-top: 3rem;
    }
    .swiper-scrollbar-drag{
        background-color: #837f7f;
    }
    .swiper-scrollbar-horizontal{
        background-color: #333232;
        height: 7px;
    }
    @media screen and (max-width:600px) {
        margin: 0 0rem 3rem 0rem;
    }
`

export default EpisodeSectionWithImage