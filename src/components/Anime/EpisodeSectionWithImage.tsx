import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { database } from '../../Firebase/firebase';
import { get, ref, set, update } from 'firebase/database';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import { kitsuApiUrl } from '../../constants/url';
const EpisodeSectionWithImage = ({ id ,animeInfo,animeSlug}: { id: any ,animeInfo:any,animeSlug:any}) => {
    let [animeEpisodes, setAnimeEpisodes] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isMoreLoading,setisMoreLoading] = useState(false);
    const [color, setColor] = useState(animeInfo?.anilistResponse?.color ?? "white");
    const [visible, setMoreVisible] = useState<number>(0);
    const {currentUser,} = useStateContext();
    const [animeDetails,setAnimeDetails] = useState<any>({});

    useEffect(() => {
        getAnimeData();
    }, [id]);

   


    const getAnimeData = async () => {
        try{
            let kitsuId = animeInfo?.anilistResponse?.kitsuId;
            if(kitsuId){
                await axios.get(`${kitsuApiUrl}?filter[mediaType]=Anime&filter[media_id]=${kitsuId}&page[limit]=20&page[offset]=0&sort=number`).then((response)=>{    
                    setMoreVisible(20);
                    setAnimeEpisodes(response.data.data);
                    setAnimeDetails(response.data); 
                }).catch((err)=>{
                    setAnimeEpisodes(animeInfo?.gogoResponse?.episodes);
                });
            }else{
                setAnimeEpisodes(animeInfo?.gogoResponse?.episodes);
            }
            
        }catch(err){
            setAnimeEpisodes(animeInfo?.gogoResponse?.episodes);
        }finally{
            setLoading(false);
             
        }
    }
    const loadMoreKitsuEpisodes = useCallback(async ()=>{
        try{
            setisMoreLoading(true);
            console.log("Visible number",visible);
            let kitsuId = animeInfo?.anilistResponse?.kitsuId;
            if(kitsuId){
                let result = await axios.get(`${kitsuApiUrl}?filter[mediaType]=Anime&filter[media_id]=${kitsuId}&page[limit]=20&page[offset]=${visible}&sort=number`);
                animeEpisodes = Array.from(new Set([...animeEpisodes,...result.data.data]));
                setAnimeEpisodes(animeEpisodes);
                setMoreVisible(prev => prev + 20);
            }
        }catch(err){
        }finally{
            setisMoreLoading(false);
        }

    },[visible,isMoreLoading,animeEpisodes]);

    useEffect(()=>{

        const handleScroll = ()=>{
            const {scrollTop,clientHeight,scrollHeight} = document.documentElement

            if(scrollTop + clientHeight >= scrollHeight - 10 && animeEpisodes?.length < animeInfo?.gogoResponse?.numOfEpisodes){
                loadMoreKitsuEpisodes();
            }
        }

        window.addEventListener('scroll',handleScroll);

        return()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[loadMoreKitsuEpisodes]);



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
                {/* <ProviderSelector>
                    <button>Crunchyroll</button>
                    <button>Gogoanime</button>  
                </ProviderSelector> */}
                {loading && (
                    <div className="loading">
                        <img src="/assets/haya-loading.gif" alt="" />
                        <p>
                            Loading...
                        </p>
                    </div>
                )}
                {!loading && (animeEpisodes?.length > 0) && animeEpisodes && (
                    <div className='container'>
                        <GridContainer>
                            {animeEpisodes?.map((episode:any,index:any)=>{
                                if(animeInfo?.gogoResponse?.episodes[index]){
                                    return (
                                         <Wrapper 
                                            key={index}
                                            to={`/animes/watch&episodeId=${(animeInfo?.gogoResponse?.episodes[index] ?? animeInfo?.anilistResponse?.episodes[index] ?? null)?.replace("/","")}&animeName=${animeSlug}&id=${id}&animeKitsuId=${episode?.id ?? null}`} 
                                            onClick={()=>updateContinueWatching(currentUser.uid,animeInfo?.anilistResponse,id,
                                            `/animes/watch&episodeId=${(animeInfo?.gogoResponse?.episodes[index] ?? animeInfo?.anilistResponse?.episodes[index] ?? null)?.replace("/","")}&animeName=${animeSlug}&id=${id}&animeKitsuId=${episode?.id}`)}
                                        >
                                            <img src={`${episode?.attributes?.thumbnail?.original ?? animeInfo?.anilistResponse?.anilistPoster?.large}`} alt="" />
                                            <p style={{ color: color !== "" ? color : "white" }}>
                                            <span> 
                                                    Episode {episode?.attributes?.number ?? animeInfo?.gogoResponse?.episodes[index].split("-").reverse()[0]}  
                                                </span> {episode?.attributes?.titles?.en_us ?? episode?.attributes?.titles?.en ?? episode?.attributes?.canonicalTitle ?? "NA"}
                                            </p>
                                        </Wrapper>
                                    )
                                }
                            })}
                        </GridContainer>
                        {/* { 

                            TODO : To Replace with infinite loader
                        } */}
                        {(animeEpisodes?.length < animeInfo?.gogoResponse?.numOfEpisodes) && !isMoreLoading && (
                            <EpisodeLoadButton>
                                <button type="button">
                                    Load More
                                </button>
                            </EpisodeLoadButton>
                        ) }
                        {isMoreLoading && (
                            <div className='loading'>
                                <img src="/assets/haya-loading.gif" alt="" />
                                <p>
                                    More Loading...
                                </p>
                            </div>
                        )}
                        {animeEpisodes?.length >= animeInfo?.gogoResponse?.numOfEpisodes && (
                            <div className='endreached'>
                                You have reached the end.
                            </div>
                        )}
                    </div>
                    
                )}

               
                {!loading && (animeEpisodes.length === 0) && (
                    <div className='emptyepisodes'>
                        No Episodes available
                    </div>
                )}

            </MainDiv>
        </div>
    )
}

const ProviderSelector = styled.div`
    
`

const EpisodeLoadButton = styled.div`
    width: 100%;
    margin: 2rem 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    button{
        width: 95%;
        border: none;
        background-color: rgb(21,31,46);
        color: white;
        font-size: 1.2rem;
        padding: .5rem;
        border-radius: 0.5rem;
        font-family: 'Gilroy-Medium',sans-serif;
        cursor: pointer;
        :hover{
            background-color: rgb(42, 62, 92);
        }
    }
    
`

const GridContainer = styled.div`
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    row-gap: 2rem;
    @media screen and (max-width:1500px) {
        grid-template-columns: repeat(1,1fr);
    }
`

const Wrapper = styled(Link)`
    text-decoration: none;
    /* background-color: #222121; */
    background-color: rgb(21,31,46);
    width: 400px;
    padding: 1rem 1rem 0.5rem 1rem;
    border-radius: 0.2rem;
    p{
        font-family: "Gilroy-Medium",sans-serif;
        font-size : 1.1rem;
        padding: 0;

    }
    img{
        width: 100%;
        height: 125px;
        object-fit: cover;
        border-radius: 3px;

    }
    span{
        font-weight: bold;
    }
    :hover{
        transform: scale(1.06);
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4,0,0.2,1);
        transition-duration: .2s;

    }
    @media screen and (max-width:500px){
        width: 90%;
        img{
            width: 100%;
            height: 125px;
            border-radius: 0.2rem;
        }
    }
    
`

const Heading = styled.div`
    margin-bottom: 2rem;
    h1{
        font-size:1.2rem;
        font-weight: 500;
        font-family:'Gilroy-Medium',sans-serif;
        color: rgb(159,173,189);
    }
   
`
const MainDiv = styled.div`
    width: 100%;
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
    .emptyepisodes{
        margin-top:3rem;
        font-size:18px;
        font-family: 'Gilroy-Bold',sans-serif;
        display: flex;
        align-items:center;
        justify-content: center;
    }
    .loading{
        margin-top: 5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 150px;
            border-radius: 3px;
        }
        p{
            font-family: 'Gilroy-Medium',sans-serif;
            font-size:18px;
        }
    }
    .endreached{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 4rem;
        margin-bottom:4rem;
        font-family: 'Gilroy-Bold',sans-serif;
    }
    @media screen and (max-width:600px) {
        margin: 0 0rem 3rem 0rem;
    }
`

export default EpisodeSectionWithImage