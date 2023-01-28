import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiArrowToBottom } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import EpisodeSectionWithImage from '../../components/Anime/EpisodeSectionWithImage'
import NavBar from '../../components/NavBars/NavBar'
import DetailsPageSkeleton from '../../components/Skeletons/DetailsPageSkeleton'
import AnimeVideoPlayer from '../../components/VideoPlayers/AnimeVideoPlayer'
import ArtPlayerAnime from '../../components/VideoPlayers/ArtPlayerAnime'
import useWindowDimension from '../../hooks/useWindowDimension'
const WatchAnimePage = () => {
  let episodeSlug = useParams().episodeSlug;
  let animeId = useParams().animeId;
  const [animeSources, setAnimeSources] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowDimension();
  const [animeDetails, setAnimeDetails] = useState<any>([]);
  useEffect(() => {
    getAnimeSources();
  }, [episodeSlug]);

  const getAnimeSources = async () => {
    setLoading(true);
    window.scroll(0, 0);
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/getlinks?link=/${episodeSlug}`);
    setAnimeSources(result.data);
    setLoading(false);
  }
  useEffect(() => {
    getAnimeDetails();
  }, []);
  const getAnimeDetails = async () => {
    let name = animeSources[0].baseEpisodeLink.replace("/", "").replace("-episode-", "");
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/getanime?link=/category/${name}`);
    setAnimeDetails(result.data);
  }
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
                  </div>
                </div>
              </div>
            )}
            {animeId !== "null" && (<EpisodeSectionWithImage id={animeId} animeInfo={animeDetails} />)}
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