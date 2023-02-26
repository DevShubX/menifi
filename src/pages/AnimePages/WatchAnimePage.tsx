import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { BiArrowToBottom, BiFullscreen } from 'react-icons/bi'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import EpisodeSectionWithImage from '../../components/Anime/EpisodeSectionWithImage'
import NavBar from '../../components/NavBars/NavBar'
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton'
import AnimeVideoPlayer from '../../components/VideoPlayers/AnimeVideoPlayer'
import ArtPlayerAnime from '../../components/VideoPlayers/ArtPlayerAnime'
import { useStateContext } from '../../GlobalContext/ContextProvider'
import useWindowDimension from '../../hooks/useWindowDimension'
const WatchAnimePage = () => {
  let episodeSlug = useParams().episodeSlug;
  let animeId = useParams().animeId;
  let animeSlug = useParams().animeSlug;
  const [animeSources, setAnimeSources] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowDimension();
  const [animeDetails, setAnimeDetails] = useState<any>([]);
  const [episodeId,setEpisodeId] = useState(episodeSlug?.split("-")[episodeSlug?.split("-").length -1]);
  useEffect(() => {
    getAnimeSources();
  }, [episodeSlug]);

  const getAnimeSources = async () => {
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/getlinks?link=/${episodeSlug}`);
    setAnimeSources(result.data);
    setLoading(false);
  }
  useEffect(() => {
    getAnimeDetails();
  }, []);
  
  const getAnimeDetails = async () => {
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/getanime?link=/category/${animeSlug}`);
    setAnimeDetails(result.data);
  }
  console.log(animeDetails)
  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search For Anime..."} path={"/animes/search/"} />
        {loading && <DetailsPageSkeleton />}
        {!loading && (
          <Wrapper>
            {animeSources.length > 0 && (
              <div>
                <div>
                  <Heading>
                    <p>
                      <span>
                        {animeSources[0].titleName.substring(0, animeSources[0].titleName.indexOf("Episode"))}
                      </span>
                      {" "}-
                      {" " + animeSources[0].titleName.substring(animeSources[0].titleName.indexOf("Episode"))}
                    </p>
                    <div>
                      <a href={animeSources[0].downloadLink}
                        target="_blank"
                        rel='noopener noreferrer'
                      >
                        {width < 900 ? "" : "Download"} <BiArrowToBottom />
                      </a>
                    </div>
                  </Heading>
                </div>
                <div>
                  <div>
                      <ArtPlayerAnime sourcesLinks={animeSources[0].sources} />
                      {/* <AnimeVideoPlayer sourceLinks={animeSources[0].sources} internalPlayer={internalPlayer} setInternalPlayer={setInternalPlayer}/> */}
                  </div>
                </div>
              </div>
            )}
            <EpisodeSectionWithImage id={animeId} animeInfo={animeDetails} animeSlug={animeSlug}/>
            {animeId === "null" && (
              <EpisodeSection>
                <h1>
                  Episodes
                </h1>
                {width <= 600 && (
                  <Episodes>
                    {animeSources[0].episodes.map((item: any, index: any) => (
                      <EpisodeLink to={`/animes/watch${item}&id=null`} style={{ backgroundColor: "black", color: "white" }}>
                        {index + 1}
                      </EpisodeLink>
                    ))}
                  </Episodes>
                )}
                {width > 600 && (
                  <Episodes>
                    {animeSources[0].episodes.map((item: any, index: any) => (
                      <EpisodeLink to={`/animes/watch${item}&id=null`} style={{ backgroundColor: "black", color: 'white' }}>
                        Episode {index + 1}
                      </EpisodeLink>
                    ))}
                  </Episodes>
                )}
              </EpisodeSection>
            )}
          </Wrapper>
        )}
      </MainDiv>
    </div>
  )
}

const ExternalPlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(16,16,16);
    padding : 0.5rem 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    margin-top: 1rem;
    border-bottom: none;
    font-family: "Gilroy-Medium" , sans-serif;
    button{
        outline : none;
        border: none;
        background: transparent;
        margin-left: 1rem;
        cursor:pointer;
    }
    .tooltip{
        position : relative;
        display: flex;
        flex-direction: column;
        margin-right: 0.5rem;
        align-items: center;
        justify-content: center;

    }
`

const IFrameWrapper = styled.div`
    position: relative;
    padding-bottom: 56.25%; /* proportion value to aspect ratio 16:9 (9 / 16 = 0.5625 or 56.25%) */
    height: 0;
    overflow: hidden;
    margin-bottom: 1rem;
    border-radius:0 0 0.5rem 0.5rem;
    box-shadow : 0px 4.41109px 20.291px rgba(16,16,24,0.6);
    background-image: url("https://i.ibb.co/28yS92Z/If-the-video-does-not-load-please-refresh-the-page.png");
    background-size: 23rem;
    background-repeat:no-repeat ;
    background-position:center;
  iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border:none;
    }
    div{
        position:absolute;
        z-index: 10;
        padding : 1rem;
    }
    @media screen and (max-width:600px){
        padding-bottom: 66.3%;
        background-size: 13rem;
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
  margin: 0 3rem 10rem 2rem;
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


const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
    a{
      cursor: pointer;
        text-decoration: none;
        color: white;
        background-color: black;
        font-size : 1.2rem;
        padding: 1rem 1rem;
        border-radius:1rem;
        font-family: 'Gilroy-Medium',sans-serif;
    }
    p{
        font-size : 1.7rem;
        font-family:"Gilroy-Light",sans-serif
    }
    span{
        font-family:"Gilroy-Bold",sans-serif;
    }
    @media screen and (max-width:600px){
        p{
            font-size : 1.1rem
        }
        a{
            padding: 0.7rem;
            border-radius: 50%;
            margin-left: 1rem;
        }
    }
`

const Wrapper = styled.div`
    margin:2rem 2rem 5rem 2rem;
  @media screen and (max-width:600px){
    margin:2rem 1rem 5rem 1rem;
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
export default WatchAnimePage