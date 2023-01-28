import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImMenu3 } from 'react-icons/im';
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../../components/NavBars/NavBar';
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton';
import TvShowsEpisodeCards from '../../components/TvShows/TvShowsEpisodeCards';
import ArtPlayerMovie from '../../components/VideoPlayers/ArtPlayerMovie';

const WatchTvShowPage = () => {
  let episodeId = useParams().episodeId;
  episodeId = episodeId?.replace(":", "").replace("(", "").replace(")", "");
  let mediaId = useParams().mediaId;
  mediaId = mediaId?.replace("tv+", "tv/");
  let menifi_id = mediaId?.replace("tv/", "");
  let title = useParams().episodeName;
  const [loading, setLoading] = useState(true);
  const [tvshowsources, setTvShowSources] = useState<any>([]);
  const [tvshowSeasons, setTvShowSeasons] = useState<any>([]);
  const [tvseasonId, setTvSeasonId] = useState(null);
  const [tvid, settvid] = useState(mediaId?.split("-")[mediaId.split("-").length - 1]);
  const [tvshowsDetails,setTvshowsDetails] = useState<any>({});
  useEffect(() => {
    getSourcesTvshow();
  }, [episodeId]);

  useEffect(() => {
    getTvSeasons();
  }, [tvid]);

  useEffect(()=>{
    getTvshowsDetails();
  },[menifi_id]);
  const getSourcesTvshow = async () => {
    let sources = await axios.get(`https://menifi-api.vercel.app/api/links/sources/?episodeId=${episodeId}&mediaId=${mediaId}`)
    setTvShowSources(sources.data.sources);
    setLoading(false);
  }
  const getTvSeasons = async () => {
    let seasons = await axios.get(`https://menifi-api.vercel.app/api/tv/seasons/${tvid}`);
    setTvSeasonId(seasons.data[0].seasonId)
    setTvShowSeasons(seasons?.data);
  }
  const getTvshowsDetails=async()=>{
    let menifi_data = await axios.get(`https://menifi-api.vercel.app/api/info/tv/${menifi_id}`);
    setTvshowsDetails(menifi_data.data);
  }
  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search For TvShows..."} path={"/tvshows/search/"} />
        {loading && (<DetailsPageSkeleton/>)}
        {!loading && (
          <Parent>
            <Heading>
              <h1>{title}</h1>
            </Heading>
            <VideoPlayerWrapper>
              {/* {tvshowsources.sources !== undefined || null || "" ? (<MovieVideoPlayer sourceslinks={tvshowsources} />)
                : (<div className='media-not-found'>
                  Media Not Found... Try again Sometime Later
                </div>)} */}
                {tvshowsources?.sources !== undefined || null || "" && tvshowsources !== undefined? (<ArtPlayerMovie sourceslinks={tvshowsources} />)
                : (<div className='media-not-found'>
                  Media Not Found... Try again Sometime Later
                </div>)}
            </VideoPlayerWrapper>
            <SeasonDiv>
              <ImMenu3 className="icon" />
              <select name="Seasons" className="seasons" onChange={(e:any) => { setTvSeasonId(e.target.value)}}>
                {tvshowSeasons.map((item: any, index: any) => (
                  <option value={item.seasonId} key={item.seasonId}>{item.seasonName}</option>
                ))}
              </select>
            </SeasonDiv>
            <div>
              <TvShowsEpisodeCards tvSeasonID={tvseasonId} mediaId={mediaId} tvDetails={tvshowsDetails}/>
            </div>
          </Parent>
        )}
      </MainDiv>
    </div>
  )
}
const Heading = styled.p`
  margin:2rem 0 2rem 2rem;
  font-family:"Gilroy-Bold",sans-serif;
  span{
    font-size : 1.3rem;
  }
  @media screen and (max-width:900px){
    margin:2rem 0 2rem 1rem;
    h1{
      font-size : 1.3rem;
    }
    span{
      font-size : 1.1
    }
  }
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
    font-family:"Gilroy-Bold",sans-serif;
    .active{
      color: blue;
    }
    :visited{
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


const VideoPlayerWrapper = styled.div`
  margin:2rem 2rem 6rem 2rem;
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
  @media screen and (max-width:900px){
    margin : 1rem 1rem 0 1rem;
  }
`
const Parent = styled.div`
    
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
export default WatchTvShowPage