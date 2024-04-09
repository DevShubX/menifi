import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';
import { database } from '../../Firebase/firebase';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import useWindowDimension from '../../hooks/useWindowDimension';
import { get, ref, set } from 'firebase/database';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import { getContrastColor } from '../../constants/methods';
import AnilistAdditionalInformation from '../../components/Anime/AnilistAdditionalInformation';
import AnimeContentBox from '../../components/Anime/AnimeContentBox';
const AnimeDetailsPage = () => {
  let animeSlug = useParams().animeSlug;
  animeSlug = animeSlug?.replace(":", "").replace("(", "").replace(")", "");
  const [animeDetails, setAnimeDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const {currentUser} = useStateContext();
  useEffect(() => {
    if(!animeDetails){
      getAnimeDetails();
    }
  }, []);
  const getAnimeDetails = async () => {
    setLoading(true);
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/getanime?link=/category/${animeSlug}`);
    // let result = await axios.get(`http://localhost:8080/api/getanime?link=/category/${animeSlug}`);
    setAnimeDetails(result.data);
    setLoading(false);
  };

  function checkRating(r: any) {
    if (r >= 70 && r <= 100) {
      return "#45f542";
    }
    else if (r > 50 && r < 70) {
      return "#b7cf30";
    }
    else if (r === 50) {
      return "#eeff00";
    }
    else if (r >= 30 && r < 50) {
      return "#f59b42";
    }
    else if (r >= 0 && r < 30) {
      return "#f54242";
    }
  }

  const addAnimeToFav=(userId: any, newContinueWatching: any, animeString: any)=>{
    const dbref = ref(database,`users/${userId}/favourites/`);
    let arr: any = [];
    get(ref(database,`users/${userId}/favourites/fav_arr`)).then(async(snapshot)=>{
      if(snapshot.exists()){
        snapshot.forEach((snap:any)=>{
          if (snap.val().movieId || snap.val().id !== newContinueWatching.id) {
            arr.push(snap.val());
          }
        });
        arr.push({ ...newContinueWatching, animePageLink: animeString });
        set(dbref, {
          fav_arr: arr,
        });
      }else {
        arr.push({ ...newContinueWatching, animePageLink: animeString });
        set(dbref, {
          fav_arr: arr,
        })
      }
    }).catch((error) => {
      console.error(error);
    });
    toast.success("Added To Favourites");
  }

  const addToWishlist=(userId: any, newContinueWatching: any, animeString: any)=>{
    const dbref = ref(database,`users/${userId}/wishlist/`);
    let arr: any = [];
    get(ref(database,`users/${userId}/wishlist/wishlist_arr`)).then(async(snapshot)=>{
      if(snapshot.exists()){
        snapshot.forEach((snap:any)=>{
          if (snap.val().movieId || snap.val().id !== newContinueWatching.id) {
            arr.push(snap.val());
          }
        });
        arr.push({ ...newContinueWatching, animePageLink: animeString });
        set(dbref, {
          wishlist_arr: arr,
        });
      }else {
        arr.push({ ...newContinueWatching, animePageLink: animeString });
        set(dbref, {
          wishlist_arr: arr,
        })
      }
    }).catch((error) => {
      console.error(error);
    });
    toast.success("Added To Wishlist");
  }



  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search For Anime..."} path={"/animes/search/"} />
        {loading && (<DetailsPageSkeleton />)}
        {!loading && (animeDetails) && (
          <Parent>
            <div>
              <Banner
                src={
                    animeDetails?.anilistResponse?.anilistBannerImage ??
                    "https://i.pinimg.com/originals/84/4d/28/844d28d84caee970f1d0d77dc680db8d.png"} alt=""
              />
              <ContentWrapper>
                <Poster>
                  <img src={animeDetails[0]?.gogoResponse?.image ?? animeDetails?.anilistResponse?.anilistPoster?.large ?? "/assets/banner-not-found.jpg"} alt="" />
                  <Button to="">
                    Watch Now
                  </Button>
                </Poster>
                <AnimeUpperBox>
                  <h1>
                    {animeDetails?.anilistResponse?.title?.userPreferred ?? animeDetails?.gogoResponse?.title}
                  </h1>
                  <div className='mscinfo'>
                    <div className='pg-box'>
                      {animeDetails?.anilistResponse?.isAdult ? "18+" : "PG"}
                    </div>
                    <div className='subordub'>
                      {animeSlug?.includes("dub") ? "DUB" : "SUB"}
                    </div>
                    <div className='season-time-box'>
                      <span>{animeDetails?.anilistResponse?.season} {animeDetails?.anilistResponse?.seasonYear}</span>
                      <span>|</span>
                      <span>Ep {animeDetails?.anilistResponse?.numOfEpisodes}</span>
                      <span>|</span>
                      <span>{animeDetails?.anilistResponse?.duration} m</span>
                    </div>
                  </div>
                  <GenreBox>
                    {animeDetails?.anilistResponse?.genre?.map((genre:any,index:number)=>(
                      <div key={index} className='genrebox' style={{
                        backgroundColor: animeDetails?.anilistResponse?.color ?? "lightgray",
                        color : getContrastColor(animeDetails?.anilistResponse?.color),
                      }}>
                        {genre}
                      </div>
                    ))}
                  </GenreBox>
                  <div className='rating-box'>
                    <img src="/assets/anilist-logo.svg" alt="" width={30} height={30} />
                    <p>{animeDetails?.anilistResponse?.averageScore / 10}/10</p>
                  </div>
                  <FavAndWishWrapper>
                    <button onClick={()=>addToWishlist(currentUser.uid,animeDetails?.anilistResponse,
                      `/animes/category/${animeSlug}`)} className='list'>
                      <FaPlus className='icon-plus'/> Add to List
                    </button>
                    <button onClick={()=>addAnimeToFav(currentUser.uid,animeDetails?.anilistResponse,
                      `/animes/category/${animeSlug}`)} className='favourite'>
                      <BsFillHeartFill className='icon-heart' /> 
                    </button>
                  </FavAndWishWrapper>
                </AnimeUpperBox>
              </ContentWrapper>
            </div>
          </Parent>
        )
        }
        <AnimeDetailsAndEpisodes>
            <AnimeContentBox animeDetails={animeDetails} isLoading={loading}/>
            <AnilistAdditionalInformation animeDetails={animeDetails?.anilistResponse} />
        </AnimeDetailsAndEpisodes>

      </MainDiv >
    </div >
  )
}


const AnimeDetailsAndEpisodes = styled.div`
  display: flex;
  gap: 2rem;
  margin: 0 2rem 0 0;
  @media screen and (max-width:900px) {
    flex-direction: column-reverse;
    align-items: center;
    margin: 2rem 2rem;
  } 
`


const AnimeUpperBox = styled.div`
  margin: 1rem 2rem;
  font-family: "Gilroy-Regular",sans-serif;
  position: relative;
  span{
    font-family: "Gilroy-Bold",sans-serif;
  }
  p{
    text-align: justify;
  }
  h1{
    font-family: "Gilroy-Bold",sans-serif;
  }

  @media screen and (max-width:900px){  
    margin: 1rem;
    h1{
      font-size : 1.6rem;
    }
    p{
      font-size : 1rem;
    }
  }
`
const GenreBox = styled.div`
  display: flex;
  margin: 1.5rem 0 0 0;
  gap: 1rem;
  .genrebox{
    border: 1px solid;
    font-family: 'Gilroy-Medium',sans-serif;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 0.3rem;
    font-weight: 400;
  }
  @media screen and (max-width:900px){
    overflow-x: auto;
    ::-webkit-scrollbar{
      
    }
  }
`

const FavAndWishWrapper = styled.div`
  position :relative;
  display : flex;
  gap: 1rem;
  margin: 1rem 0 0 0;
  .icon-heart{
    color: white;
    font-size:1rem;
  }
  .favourite{
    background-color: rgb(236,41,75);
    border: none;
    padding: 0.5rem;
    height: 35px;
    border-radius: .2rem;
    cursor: pointer;
  }
  .list{
    display: flex;
    align-items:center;
    gap: .5rem;
    font-family:"Gilroy-Medium",sans-serif;
    background-color: rgb(61,180,242);
    color: white;
    border: none;
    padding: .5rem 1.3rem;
    height: 35px;
    line-height: 1.3rem;
    font-size:1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    
  }
  @media screen and (max-width:900px){
    flex-direction:row;
    button{
      /* margin: 2rem 1rem 0 1rem; */
    }
  }

`

const EpisodeLink = styled(Link)`
  text-decoration: none;
  padding: 1rem 2rem;
  color : #050404;
  text-align: center;
  font-family: "Gilroy-Medium",sans-serif;
  border-radius: 0.5rem;
  @media screen and (max-width:600px){
    padding: 1rem;
    border-radius: 0.3rem;
    font-family: "Gilroy-Bold",sans-serif;
  }
`

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
  grid-row-gap: 1rem;
  grid-gap: 1rem;
  justify-content: space-between;
  border: 2px solid #0e0c0c;
  border-radius: 0.5rem;
  max-height: 400px;
  overflow-y: scroll;
  padding: 1rem;
  @media screen and (max-width:600px){
    grid-template-columns: repeat(auto-fit,minmax(4rem,1fr));
  }
`

const EpisodeSection = styled.div`
  margin: 0rem 3rem 10rem 2rem;
  h1{
      margin-bottom: 2rem;
    }
  @media screen and (max-width:600px){
    margin: 3rem 1rem 3rem 1rem;
    h1{
      text-decoration: underline;
    }
  }
`

const Button = styled(Link)`
  text-decoration: none;
  background-color: black;
  text-align: center;
  color: white;
  font-size : 1.5rem;
  padding: 1rem 2rem;
  position: relative;
  top: -20%;
  border-radius: 0.5rem;
  font-family: "Gilroy-Bold",sans-serif;
  cursor: pointer;
  :hover{
    background-color: #0a0a0a;
  }

`

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  img{
    width: 220px;
    height: 300px;
    object-fit: cover;
    position: relative;
    margin-bottom: 2rem;
    top: -20%;
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
    border-radius: 0.5rem;
  }
  @media screen and (max-width:900px){
    margin: 0 2rem 0 1rem;
  }

  @media screen and (min-width:900px) {
    height: 400px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  padding: 0 3rem 0 3rem;
  .mscinfo{
    display: flex;
    gap: 1rem;
    align-items:center;
  }
  .pg-box,.subordub{
    border: 1.2px solid white;
    padding: 0.5rem 0.5rem;
    border-radius:0.2rem;
    font-size:0.8rem;
    font-family: 'Gilroy-Medium',sans-serif;
    font-weight: 600;
  }
  .season-time-box{
    display: flex;
    gap: .5rem;
    span{
      font-family: 'Gilroy-Medium',sans-serif;
      font-weight: 600;
    }
  }
  .rating-box{
    align-items: center;
    display: flex;
    margin: 1rem 0 0 0;
    gap: .7rem;
  }
  @media screen and (max-width:900px) {
    flex-direction: column-reverse;
    padding: 0;
  }
`

const Banner = styled.img`
  width: 100%;
  height: 30rem;
  object-fit: cover;
  /* border-radius: 1rem; */
  @media screen and (max-width:900px){
    height: 20rem;
  }
  @media screen and (max-width:600px){
    height: 10rem;
    width: 97%;
  }
`

const Parent = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  position: relative;
`
const MainDiv = styled.div`
  position: relative;
  margin: 0 0 0 11rem;
  display: flex;
  flex-direction: column;
  color: white;
  background-color: rgb(11,22,34); 
  /* Anilist Background Color */
  width:90vw;
  @media screen and (max-width:1850px){
    width:86vw;
  }
  @media screen and (max-width:1450px){
    width:83vw;
  }
  @media screen and (max-width:1150px){
    width: 79vw;
  }
  @media screen and (max-width:900px){
    width: 99vw;
    margin: 0 0 0 0rem;
  }
`
export default AnimeDetailsPage