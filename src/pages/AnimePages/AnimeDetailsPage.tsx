import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { BsFillHeartFill } from 'react-icons/bs';
import { RiFileList3Fill } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AnimeAdditionalVideos from '../../components/Anime/AnimeAdditionalVideos';
import AnimeSeriesCharacters from '../../components/Anime/AnimeSeriesCharacters';
import EpisodeSectionWithImage from '../../components/Anime/EpisodeSectionWithImage';
import RelatedAnimePictures from '../../components/Anime/RelatedAnimePictures';
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';
import { database } from '../../Firebase/firebase';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import useWindowDimension from '../../hooks/useWindowDimension';
import { get, ref, set } from 'firebase/database';
import toast from 'react-hot-toast';
const AnimeDetailsPage = () => {
  let animeSlug = useParams().animeSlug;
  animeSlug = animeSlug?.replace(":", "").replace("(", "").replace(")", "");
  const [animeDetails, setAnimeDetails] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowDimension();
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState("black");
  const {currentUser} = useStateContext();
  useEffect(() => {
    getAnimeDetails();
  }, []);
  const getAnimeDetails = async () => {
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/getanime?link=/category/${animeSlug}`);
    setAnimeDetails(result.data);
    result.data[0].anilistResponse !== "NONE" ?
      setColor(result?.data[0]?.anilistResponse?.anilistPoster?.color) :
      setColor("black");
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
        console.log("No data available");
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
        console.log("No data available");
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
        {!loading && (animeDetails.length > 0) && (
          <Parent>
            <div>
              <Banner
                src={
                  animeDetails[0].anilistResponse !== "NONE" &&
                    animeDetails[0].anilistResponse.anilistBannerImage !== null ?
                    animeDetails[0].anilistResponse.anilistBannerImage :
                    "https://i.pinimg.com/originals/84/4d/28/844d28d84caee970f1d0d77dc680db8d.png"} alt=""
              />
              <ContentWrapper>
                <Poster>
                  <img src={(animeDetails[0].gogoResponse.image !== null || undefined || "") ?
                    animeDetails[0].gogoResponse.image : animeDetails[0].anilistResponse.anilistPoster.large} alt="" />
                  <Button to="">
                    Watch Now
                  </Button>
                  <FavAndWishWrapper>
                    <button onClick={()=>addAnimeToFav(currentUser.uid,animeDetails[0].anilistResponse,
                      `/animes/category/${animeSlug}`)}>
                    Add to <BsFillHeartFill className='icon-h' /> 
                    </button>
                    <button onClick={()=>addToWishlist(currentUser.uid,animeDetails[0].anilistResponse,
                      `/animes/category/${animeSlug}`)}>
                      Add to <RiFileList3Fill className='icon-h'/>
                    </button>
                  </FavAndWishWrapper>
                </Poster>
                <div className='info'>
                  <h1>{animeDetails[0].anilistResponse !== "NONE" ? (animeDetails[0].anilistResponse.title.userPreferred) : (animeDetails[0].gogoResponse.title)}
                  </h1>
                  <p>
                    <span>Type: </span>
                    {animeDetails[0].gogoResponse.type.replace("Type:", "")}
                  </p>
                  {width <= 600 && expanded && (
                    <p>
                      <span>Plot Summary: </span>
                      {
                        animeDetails[0].gogoResponse.description.replace("Plot Summary:", "")
                      }
                      <button onClick={() => setExpanded(!expanded)}>
                        read less
                      </button>
                    </p>
                  )}
                  {width <= 600 && !expanded && (
                    <p>
                      <span>Plot Summary: </span>
                      {animeDetails[0].gogoResponse.description.replace("Plot Summary:", "").
                        substring(0, 200) + "..."}
                      <button onClick={() => { setExpanded(!expanded) }}>
                        read more
                      </button>
                    </p>
                  )}
                  {width > 600 && (
                    <p>
                      <span>Plot Summary: </span>
                      {animeDetails[0].gogoResponse.description.
                        replace("Plot Summary:", "")}
                    </p>
                  )}
                  <p>
                    <span>Genre: </span>
                    {animeDetails[0].gogoResponse.genre.replace("Genre:", "")}
                  </p>
                  <p>
                    <span>Season: </span>
                    {animeDetails[0].anilistResponse !== "NONE" ? (animeDetails[0].anilistResponse.season + " " + animeDetails[0].anilistResponse.released) : "N/A"}
                  </p>
                  <p>
                    <span>Released: </span>
                    {
                      animeDetails[0].gogoResponse.released.replace("Released:", "")
                    }
                  </p>
                  <p>
                    <span>Status: </span>
                    {animeDetails[0].gogoResponse.status.replace("Status:", "")}
                  </p>
                  <p>
                    <span>Number of Episodes: </span>
                    {animeDetails[0].gogoResponse.numOfEpisodes}
                  </p>
                  <p className='rating-p'>
                    <div style={{ width: "50px", height: "50px" }}>
                      <CircularProgressbar
                        value={animeDetails[0].anilistResponse !== "NONE" ? (animeDetails[0].anilistResponse.averageScore) : "N/A"}
                        text={`${animeDetails[0].anilistResponse !== "NONE" ? (animeDetails[0].anilistResponse.averageScore) : "N/A"}%`}
                        background
                        backgroundPadding={5}
                        strokeWidth={8}
                        styles={buildStyles({
                          backgroundColor: 'black',
                          textColor: "white",
                          pathColor: animeDetails[0].anilistResponse !== "NONE" ? (checkRating(animeDetails[0].anilistResponse.averageScore)) : "white",
                          textSize: "1.7rem",
                          trailColor: 'transparent',
                        })} />
                    </div>
                    <span>User Rating</span>
                  </p>
                </div>
              </ContentWrapper>
              {animeDetails[0].anilistResponse === "NONE" ? (
                <EpisodeSection>
                  <h1>
                    Episodes
                  </h1>
                  {width <= 600 && (
                    <Episodes>
                      {animeDetails[0].gogoResponse.episodes.map((item: any, index: any) => (
                        <EpisodeLink to={`/animes/watch${item}&id=null`} style={{ backgroundColor: `${color}`, color: color === "black" ? 'white' : 'black' }}>
                          {index + 1}
                        </EpisodeLink>
                      ))}
                    </Episodes>
                  )}
                  {width > 600 && (
                    <Episodes>
                      {animeDetails[0].gogoResponse.episodes.map((item: any, index: any) => (
                        <EpisodeLink to={`/animes/watch${item}&id=null`} style={{ backgroundColor: `${color}`, color: color === "black" ? 'white' : 'black' }}>
                          Episode {index + 1}
                        </EpisodeLink>
                      ))}
                    </Episodes>
                  )}
                </EpisodeSection>
              ) : <EpisodeSectionWithImage id={animeDetails[0].anilistResponse.id} animeInfo={animeDetails} animeSlug={animeSlug}/>}

              {animeDetails[0].anilistResponse !== "NONE" ? (
                <RelatedAnimePictures idMal={animeDetails[0].anilistResponse.malId} />
              ) :
                <div>
                  <h2>
                    Related Photos From Anime
                  </h2>
                  <div>
                    No image Found
                  </div>
                </div>
              }
              {animeDetails[0].anilistResponse !== "NONE" && (
                <AnimeAdditionalVideos idMal={animeDetails[0].anilistResponse.malId}/>
              )}
              {animeDetails[0].anilistResponse !== "NONE" && (
                <AnimeSeriesCharacters  idMal={animeDetails[0].anilistResponse.malId}/>
              )}
            </div>
          </Parent>
        )
        }

      </MainDiv >
    </div >
  )
}
const FavAndWishWrapper = styled.div`
  position :relative;
  display : flex;
  flex-direction : column;
  align-items:center;
  justify-content:center;
  top:-20%;
  .icon-h{
    margin-left : 0.5rem;
    color : red;
  }
  button{
    border:none;
    font-size:1rem;
    font-family: "Gilroy-Bold",sans-serif;
    border-radius:0.5rem;
    margin-top:1rem;
    padding : 1rem 1rem;
    background-color: #000000;
    color: white;
    text-align: center;
    display : flex;
    align-items:center;
    justify-content:center;
    cursor: pointer;
    :hover{
      background-color: #0a0a0a;
    }
  }
  @media screen and (max-width:900px){
    flex-direction:row;
    button{
      margin: 2rem 1rem 0 1rem;
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
  margin : 0 0 5rem 0;
  .info{
    margin: 1rem 2rem;
    font-family: "Gilroy-Regular",sans-serif;
    span{
      font-family: "Gilroy-Bold",sans-serif;
    }
    p{
      text-align: justify;
    }
    h1{
      font-family: "Gilroy-Bold",sans-serif;
    }
    
  }
  .rating-p{
      font-family: "Gilroy-Bold",sans-serif;
      display: flex;
      align-items: center;
      span{
        margin-left : 0.5rem;

      }
    }
  @media screen and (max-width:900px) {
    flex-direction: column-reverse;
    padding: 0;
    .info{
      margin: 1rem;
      h1{
        font-size : 1.6rem;
      }
      p{
        font-size : 1rem;
      }
      button{
        color: white;
        background-color: transparent;
        border: none;
        font-family: "Gilroy-Bold",sans-serif;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`

const Banner = styled.img`
  width: 99%;
  height: 30rem;
  object-fit: cover;
  border-radius: 1rem;
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
  margin: 0 0 0 12rem;
  display: flex;
  flex-direction: column;
  color: white;
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