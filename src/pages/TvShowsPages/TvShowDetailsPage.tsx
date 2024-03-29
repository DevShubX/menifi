import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { BsFillHeartFill, BsFillMenuButtonWideFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';
import {ImMenu3} from 'react-icons/im'
import TvShowsEpisodeCards from '../../components/TvShows/TvShowsEpisodeCards';
import { StateContext, useStateContext } from '../../GlobalContext/ContextProvider';
import { database } from '../../Firebase/firebase';
import { get, ref, set } from 'firebase/database';
import { RiFileList3Fill } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
const TvShowDetailsPage = () => {
  let tvId = useParams().tvId;
  tvId = tvId?.replace(":", "").replace("(", "").replace(")", "").replace("+", "/");
  let menifi_id = tvId?.replace("tv/", "");
  const [menifiDetails, setMenifiDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [tvshowSeasons, setTvShowSeasons] = useState<any>([]);
  const [tvid, settvid] = useState(null);
  const [tvseasonId,setTvSeasonId] = useState(null);
  const {currentUser} = useStateContext();
  useEffect(() => {
    getTvShowDetails();
  }, []);

  useEffect(() => {
    getTvSeasons();
  }, [tvid]);

  
  const getTvShowDetails = async () => {
    let menifi_data = await axios.get(`https://menifi-api.vercel.app/api/info/flixhq/tv/${menifi_id}`);
    setMenifiDetails(menifi_data.data);
    settvid(menifi_data?.data.movieId?.split("-")[menifi_data?.data.movieId?.split("-").length - 1]);
    setLoading(false);
  }
  const getTvSeasons = async () => {
    let seasons = await axios.get(`https://menifi-api.vercel.app/api/tv/seasons/${tvid}`);
    setTvSeasonId(seasons.data[0].seasonId)
    setTvShowSeasons(seasons?.data);
  }

 
  function checkRating(rating: any) {
    let r = Math.floor(rating * 10);
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
  const updateContinueWatching = (userId: any, newContinueWatching: any, tvstring: any) => {
    const db = database;
    const dbref = ref(database, `users/${userId}/continueWatching/tvshows`);
    let arr: any = [];
    get(ref(database, `users/${userId}/continueWatching/tvshows/tvshows_arr`)).then(async (snapshot: any) => {
      if (snapshot.exists()) {
        snapshot.forEach((snap: any) => {
          if(snap.val().movieId !== newContinueWatching.movieId){
            arr.push(snap.val());
          } 
        });
        arr.push({...newContinueWatching,TvDetailsPage : tvstring});
        set(dbref,{
          tvshows_arr : arr,
        });///End 
      } 
      
      else {
        arr.push({...newContinueWatching,TvDetailsPage : tvstring});
        set(dbref,{
          tvshows_arr : arr,
        })
      }
    }).catch((error) => {
      console.error(error);
    });
    const newdbref = ref(database, `users/${userId}/recentlyWatched`);
    let arr2:any=[];
    get(ref(database, `users/${userId}/recentlyWatched/recently_watched_arr`)).then(async (snapshot: any) => {
      if (snapshot.exists()) {
        snapshot.forEach((snap: any) => {
          if (snap.val().movieId !== newContinueWatching.movieId) {
            arr2.push(snap.val());
          }
        });
        arr2.push({ ...newContinueWatching, movieStreamingLink: tvstring });
        set(newdbref, {
          recently_watched_arr: arr2,
        })
      } else {
        arr2.push({ ...newContinueWatching, movieStreamingLink: tvstring });
        set(newdbref, {
          recently_watched_arr: arr2,
        })
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  const addTvShowToFav=(userId: any, newContinueWatching: any, movieString: any)=>{
    const dbref = ref(database,`users/${userId}/favourites/`);
    let arr: any = [];
    get(ref(database,`users/${userId}/favourites/fav_arr`)).then(async(snapshot)=>{
      if(snapshot.exists()){
        snapshot.forEach((snap:any)=>{
          if (snap.val().movieId !== newContinueWatching.movieId) {
            arr.push(snap.val());
          }
        });
        arr.push({ ...newContinueWatching, movieStreamingLink: movieString });
        set(dbref, {
          fav_arr: arr,
        });
      }else {
        arr.push({ ...newContinueWatching, movieStreamingLink: movieString });
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


  const addToWishlist=(userId: any, newContinueWatching: any, movieString: any)=>{
    const dbref = ref(database,`users/${userId}/wishlist/`);
    let arr: any = [];
    get(ref(database,`users/${userId}/wishlist/wishlist_arr`)).then(async(snapshot)=>{
      if(snapshot.exists()){
        snapshot.forEach((snap:any)=>{
          if (snap.val().movieId !== newContinueWatching.movieId) {
            arr.push(snap.val());
          }
        });
        arr.push({ ...newContinueWatching, movieStreamingLink: movieString });
        set(dbref, {
          wishlist_arr: arr,
        });
      }else {
        arr.push({ ...newContinueWatching, movieStreamingLink: movieString });
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
        <NavBar placeHolder={"Search For TV Shows..."} path={"/tvshows/search/"} />
        {loading && (<DetailsPageSkeleton />)}
        {!loading && (
          <Parent>
            <Content>
              <Banner src={`${menifiDetails?.backgroundImage}`} />
              <ContentWrapper>
                <Poster>
                  <img src={`${menifiDetails?.filmPoster}`} alt="" />
                  <Button onClick={()=>updateContinueWatching(currentUser.uid,menifiDetails,tvId)}>
                    Watch Now
                  </Button>
                  <FavAndWishWrapper>
                    <button onClick={()=>addTvShowToFav(currentUser.uid,menifiDetails,tvId)}>
                    Add to <BsFillHeartFill className='icon-h'/> 
                    </button>
                    <button onClick={()=>addToWishlist(currentUser.uid,menifiDetails,tvId)}>
                      Add to <RiFileList3Fill className='icon-h'/>
                    </button>
                  </FavAndWishWrapper>
                </Poster>
                <div>
                  <h1>
                    {menifiDetails.title}
                  </h1>
                  <p>
                    <span>Type: </span>
                    {menifiDetails.type}
                  </p>
                  <p>
                    <span>Genres: </span>
                    {menifiDetails.genres?.map((item: any, index: any) => (<>{item}  , </>))}
                  </p>
                  <p>
                    <span>Release Date: </span>
                    {menifiDetails.releaseDate}
                  </p>
                  <p>
                    <span>Overview: </span>
                    <div style={{ marginTop: "0.5rem" }}>{menifiDetails.description}</div>
                  </p>
                  <p>
                    <span>Duration: </span>
                    {menifiDetails.duration}
                  </p>
                  <p className='rating-p'>
                    <div style={{ width: "50px", height: "50px" }}>
                      <CircularProgressbar
                        value={menifiDetails.rating * 10}
                        text={`${menifiDetails.rating * 10}%`}
                        background
                        backgroundPadding={5}
                        strokeWidth={8}
                        styles={buildStyles({
                          backgroundColor: 'black',
                          textColor: "white",
                          pathColor: checkRating(menifiDetails.rating),
                          textSize: "1.7rem",
                          trailColor: 'transparent',
                        })} />
                    </div>
                    <span>User Rating</span>
                  </p>
                  <p>
                    <span>Cast: </span>
                    {menifiDetails?.casts?.map((item: any, index: any) => (<>{item} ,  </>))}
                  </p>
                  <p>
                    <span>Production: </span>
                    {menifiDetails.production}
                  </p>
                  <p>
                    <span>Country: </span>
                    {menifiDetails.country}
                  </p>
                </div>
              </ContentWrapper>
            </Content>
            <SeasonDiv>
              <ImMenu3 className="icon" />
              <select name="Seasons" className="seasons" onChange={(e:any)=>setTvSeasonId(e.target.value)}>
                {tvshowSeasons.map((item: any, index: any) => (
                  <option value={item.seasonId}>{item.seasonName}</option>
                ))}
              </select>
            </SeasonDiv>
            <EpisodeWrapper>
              <TvShowsEpisodeCards tvSeasonID={tvseasonId} mediaId={tvId} tvDetails={menifiDetails} />
            </EpisodeWrapper>
          </Parent>
        )}
      </MainDiv>
    </div>
  )
}
const FavAndWishWrapper = styled.div`
  position :relative;
  display : flex;
  flex-direction : column;
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
      background-color: #615c5c;
    }
  }
  @media screen and (max-width:900px){
    flex-direction:row;
    button{
      margin: 2rem 1rem 0 1rem;
    }
  }

`
const EpisodeWrapper = styled.div`
  
`


const SeasonDiv = styled.div`
  margin-top:3rem;
  margin-left:2rem;
  background-color:#000000;
  border-radius:0.5rem;
  padding : 0 1rem;
  width: 170px;
  border : 1px solid #0e3b9c;
  filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
  .icon{
    font-size : 1.5rem;
    vertical-align:middle;
    margin-bottom:0.5rem;
    color:#0e3b9c;
  }
  select{
    border-radius:0.5rem;
    border:none;
    font-size:1.5rem;
    padding:0.5rem;
    background-color : transparent;
    color : white;
    .active{
      color: blue;
    }
    :active{
      border: none;
    }
  }
  option{
    font-size : 1.5rem;
    font-family: "Gilroy-Medium",sans-serif;
    background-color: #2c2c2c;
    color:white;
  }
`


const Button = styled.button`
    position: relative;
    text-decoration: none;
    top: -20%;
    border:none;
    font-size:1.5rem;
    font-family: "Gilroy-Bold",sans-serif;
    border-radius:0.5rem;
    margin-top:2rem;
    padding:1rem 3rem;
    background-color: #000000;
    color : white;
    text-align: center;
    cursor: pointer;
    :hover{
      background-color: #0f0b0b;
    }
`

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  margin-right:2rem;align-items: center;
  justify-content: center;

  img{
    position: relative;
    width: 240px;
    border-radius: 1rem;
    object-fit:cover;
    top:-100px;
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
    border:1px solid #142192;
  }

  @media screen and (max-width:900px){
    align-items: center;
    justify-content: center;
    img{
      position: static;
    }
    margin-right:0;
    margin-top: 2rem;
  }
`



const ContentWrapper = styled.div`
  display: flex;
  margin:0 2rem 0 2rem;
  span{
    font-weight:600;
    font-family: "Gilroy-Bold",sans-serif;
    font-size: 1rem;
  }
  p{
    font-size:1rem;
  }
  h1{
    font-size:2rem;
  }
  .rating-p{
    display: flex;
    align-items: center;
    span{
      margin-left:0.5rem;
    }
    div{
      transform: scale(1);
      transition: transform 0.5s;
      :hover{
        transform: scale(1.1);
      }
    }
  }

  @media screen and (max-width:900px){
    flex-direction: column;
  }

`
const Banner = styled.img`
  width: 99%;
  height: 600px;
  border-radius: 1rem;
  object-fit: cover;
  filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
  @media screen and (max-width:900px){
    height: 200px;
    width: 100%;
  }

`
const Content = styled.div`
  position: relative;
  @media screen and (max-width:900px){
    padding : 0 1rem 0 1rem
  }
`
const Parent = styled.div`
  margin-top:2rem;
  margin-bottom:20rem;
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

export default TvShowDetailsPage