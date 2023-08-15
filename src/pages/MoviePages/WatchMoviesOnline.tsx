import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import PopularMoviesSlider from '../../components/Movies/PopularMoviesPageSlider';
import TopRatedMoviesSlider from '../../components/Movies/TopRatedMoviesSlider';
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';
import ArtPlayerMovie from '../../components/VideoPlayers/ArtPlayerMovie';
import MovieVideoPlayer from '../../components/VideoPlayers/MovieVideoPlayer';
import { link } from 'fs';

const WatchMoviesOnline = () => {
  let episodeId = useParams().episodeId;
  episodeId = episodeId?.replace(":", "").replace("(", "").replace(")", "").replace("+", "/")
  let mediaId = useParams().mediaId?.replace("+", "/");
  let mediaId_menifi = useParams().mediaId?.replace("movie+","");
  const [movieDetail, setMovieDetails] = useState<any>({});
  const [movieSources, setMovieSources] = useState<any>({});
  const [movieReferer,setMovieReferer] = useState<any>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMovieStreamingLinks();
  }, []);

  

  const getMovieStreamingLinks = async () => {
    window.scroll(0, 0);
    const links = await axios.get(`https://menifi-api.vercel.app/api/links/sources/?episodeId=${episodeId}&mediaId=${mediaId}`);
    let menifi_data = await axios.get(`https://menifi-api.vercel.app/api/info/flixhq/movie/${mediaId_menifi}`);
    setMovieDetails(menifi_data.data);
    setMovieReferer(links.data.headers.Referer);
    setMovieSources(links.data.sources);
    setLoading(false)
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
  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search for Movies..."} path={"/movies/search/"} />
        {loading && (<DetailsPageSkeleton />)}
        {!loading && (
          <Parent>
            <div>
              <VideoPlayerWrapper>
                {/* {movieSources !== undefined || null || "" ? (<MovieVideoPlayer sourceslinks={movieSources} />)
                  :(<div className='media-not-found'>
                    Media Not Found... Try again Sometime Later
                    </div>)} */}
                 {/* {movieSources !== undefined || null || "" ? (
                 <ArtPlayerMovie
                  sourceslinks={movieSources}
                  />)
                  :(<div className='media-not-found'>
                    Media Not Found... Try again Sometime Later
                    </div>)} */}
                  <iframe src={movieReferer} allowFullScreen referrerPolicy='origin-when-cross-origin'></iframe>
              </VideoPlayerWrapper>
              <div className='info'>
                <h1>
                  {movieDetail.title !== null || undefined || "" ? movieDetail.title : ""}
                </h1>
                <p>
                  <span>Type: </span>
                  {movieDetail.type}
                </p>
                <p>
                  <span>Genres: </span>
                  {movieDetail?.genres?.map((item: any, index: any) => (<>{item}  , </>))}
                </p>
                <p>
                  <span>Release Date: </span>
                  {movieDetail.releaseDate}
                </p>
                <p>
                  <span>Overview: </span>
                  <div style={{ marginTop: "0.5rem" }}>{movieDetail.description}</div>
                </p>
                <p>
                  <span>Duration: </span>
                  {movieDetail.duration}
                </p>
                <p className='rating-p'>
                  <div style={{ width: "60px", height: "60px" }}>
                    <CircularProgressbar
                      value={movieDetail.rating * 10}
                      text={`${movieDetail.rating * 10}%`}
                      background
                      backgroundPadding={5}
                      strokeWidth={8}
                      styles={buildStyles({
                        backgroundColor: 'black',
                        textColor: "white",
                        pathColor: checkRating(movieDetail.rating),
                        textSize: "1.7rem",
                        trailColor: 'transparent',
                      })} />
                  </div>
                  <span>User Rating</span>
                </p>
                <p>
                  <span>Cast: </span>
                  {movieDetail?.casts?.map((item: any, index: any) => (<>{item} ,  </>))}
                </p>
              </div>
              <PopularMoviesSlider />
            </div>
          </Parent>
        )}

      </MainDiv>
    </div>
  )
}
const VideoPlayerWrapper = styled.div`
  /* padding: 2rem 2rem; */
  margin:2rem 2rem 2rem 2rem;
  .media-not-found{
    background-color: #141414;
    height: 300px;
    text-align: center;
    font-size:1.5rem;
    background-image: url("https://png.pngtree.com/thumb_back/fw800/back_our/20190625/ourmid/pngtree-black-solid-material-banner-image_262525.jpg");
    @media screen and (max-widht:900px){
      height: 200px;
    }
  }
  iframe{
    width: 100%;
    height: 700px;
    border: none;
  }
  @media screen and (max-width:900px){
    margin : 1rem 1rem 0 1rem;
    iframe{
      height: 300px;
    }
  }
`
const Parent = styled.div`
  margin : 1rem 0 0 0;
  span{
    font-weight: 600;
  }
  p{
    font-weight: 400;
    font-family: "Gilroy-Regular",sans-serif;
  }
  .rating-p{
    display: flex;
    align-items: center;
    span{
      margin-left:0.5rem;
    }
  }
  .info{
    margin-left:2rem;
    h1{
      font-family: 'Gilroy-Bold',sans-serif;
    }
    @media screen and (max-width:900px){
      margin-right:1rem;
      h1{
        font-size: 1.5rem;
      }
    }
  }
  @media screen and (max-width:900x){
    margin:1rem 0 0 0 ;
  }
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
export default WatchMoviesOnline
