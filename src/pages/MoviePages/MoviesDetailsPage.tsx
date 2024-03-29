import axios from 'axios';
import {  get,ref, set,} from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { toast } from 'react-hot-toast';
import { BsFillHeartFill } from 'react-icons/bs';
import { RiFileList3Fill } from 'react-icons/ri';
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components';
import UpcomingMoviesSlider from '../../components/Movies/UpcomingMoviesSlider';
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';
import { database } from '../../Firebase/firebase';
import { useStateContext } from '../../GlobalContext/ContextProvider';


const MoviesDetailsPage = () => {
  let episodeId = useParams().episodeId;
  episodeId = episodeId?.replace(":", "").replace("(", "").replace(")", "").replace("+", "/");
  let menifi_movieId = episodeId?.replace("movie/", "");
  const [consumetMovieDetail, setConsumetMovieDetail] = useState<any>({});
  const [menifiMovieDetail, setMenifiMovieDetail] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useStateContext();
  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    let menifi_data = await axios.get(`https://menifi-api.vercel.app/api/info/flixhq/movie/${menifi_movieId}`);
    setMenifiMovieDetail(menifi_data.data);
    setLoading(false);
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

  const updateContinueWatching = (userId: any, newContinueWatching: any, movieString: any) => {
    const dbref = ref(database, `users/${userId}/continueWatching/movies`);
    let arr: any = [];
    get(ref(database, `users/${userId}/continueWatching/movies/movies_arr`)).then(async (snapshot: any) => {
      if (snapshot.exists()) {
        snapshot.forEach((snap: any) => {
          if (snap.val().movieId !== newContinueWatching.movieId) {
            arr.push(snap.val());
          }
        });
        arr.push({ ...newContinueWatching, movieStreamingLink: movieString });
        set(dbref, {
          movies_arr: arr,
        })
      } else {
        arr.push({ ...newContinueWatching, movieStreamingLink: movieString });
        set(dbref, {
          movies_arr: arr,
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
        arr2.push({ ...newContinueWatching, movieStreamingLink: movieString });
        set(newdbref, {
          recently_watched_arr: arr2,
        })
      } else {
        arr2.push({ ...newContinueWatching, movieStreamingLink: movieString });
        set(newdbref, {
          recently_watched_arr: arr2,
        })
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const addMovieToFav=(userId: any, newContinueWatching: any, movieString: any)=>{
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
        <NavBar placeHolder={"Search for Movies..."} path={"/movies/search/"} />
        {loading && (<DetailsPageSkeleton />)}
        {!loading && (
          <Parent>
            <Content>
              <Banner src={`${menifiMovieDetail?.backgroundImage}`} />
              <ContentWrapper>
                <Poster>
                  <img src={`${menifiMovieDetail?.filmPoster}`} alt="" />
                  <Button onClick={() => updateContinueWatching(currentUser.uid, menifiMovieDetail,
                    `/movies/watch&episodeId=${menifiMovieDetail?.episodes[0]?.id}&mediaId=${"movie+" + menifiMovieDetail?.id}`)} to={`/movies/watch&episodeId=${menifiMovieDetail?.episodes[0]?.id}&mediaId=${"movie+"+menifiMovieDetail?.id}`}>
                    Watch Now
                  </Button>
                  <FavAndWishWrapper>
                    <button onClick={() => addMovieToFav(currentUser.uid, menifiMovieDetail,
                    `/movies/watch&episodeId=${menifiMovieDetail?.episodes[0]?.id}&mediaId=${"movie+" + menifiMovieDetail?.id}`)}>
                    Add to <BsFillHeartFill className='icon-h'/> 
                    </button>
                    <button onClick={()=>addToWishlist(currentUser.uid, menifiMovieDetail,
                    `/movies/watch&episodeId=${menifiMovieDetail?.episodes[0]?.id}&mediaId=${"movie+" + menifiMovieDetail?.id}`)}>
                      Add to <RiFileList3Fill className='icon-h'/>
                    </button>
                  </FavAndWishWrapper>
                </Poster>
                <div>
                  <h1>
                    {menifiMovieDetail.title}
                  </h1>
                  <p>
                    <span>Type: </span>
                    {menifiMovieDetail.type}
                  </p>
                  <p>
                    <span>Genres: </span>
                    {menifiMovieDetail?.genres?.map((item: any, index: any) => (<>{item}  , </>))}
                  </p>
                  <p>
                    <span>Release Date: </span>
                    {menifiMovieDetail.releaseDate}
                  </p>
                  <p>
                    <span>Overview: </span>
                    <div style={{ marginTop: "0.5rem" }}>{menifiMovieDetail.description}</div>
                  </p>
                  <p>
                    <span>Duration: </span>
                    {menifiMovieDetail.duration}
                  </p>
                  <p className='rating-p'>
                    <div style={{ width: "50px", height: "50px" }}>
                      <CircularProgressbar
                        value={menifiMovieDetail.rating * 10}
                        text={`${menifiMovieDetail.rating * 10}%`}
                        background
                        backgroundPadding={5}
                        strokeWidth={8}
                        styles={buildStyles({
                          backgroundColor: 'black',
                          textColor: "white",
                          pathColor: checkRating(menifiMovieDetail.rating),
                          textSize: "1.7rem",
                          trailColor: 'transparent',
                        })} />
                    </div>
                    <span>User Rating</span>
                  </p>
                  <p>
                    <span>Cast: </span>
                    {menifiMovieDetail?.casts?.map((item: any, index: any) => (<>{item} ,  </>))}
                  </p>
                </div>
              </ContentWrapper>
            </Content>
            <UpcomingMoviesSlider />
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
const Button = styled(Link)`
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
    color: red;
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
    border:1px solid red;
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
export default MoviesDetailsPage