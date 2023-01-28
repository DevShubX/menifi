import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../components/NavBars/NavBar';
import HomeCardSkeleton from '../../components/Skeletons/HomeCardSkeleton';
import useWindowDimension from '../../hooks/useWindowDimension';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import { useStateContext } from '../../GlobalContext/ContextProvider';

const SongsSearchPage = () => {
  const [searchResult, setSearchResult] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<any>([]);
  const {setActiveSong,currentSongs,setCurrentSongs,activeSong,setIsPlaying,setIsActive,setCurrentIndex} = useStateContext();
  let songName = useParams().songName;
  const { width } = useWindowDimension();
  useEffect(() => {
    getSearchResult();
  }, [songName]);

  const getSearchResult = async () => {
    setLoading(true);
    let result = await axios.get(`https://saavn.me/search/all?query=${songName}`);
    let songs = await axios.get(`https://saavn.me/search/songs?query=${songName}&page=1&limit=12`);
    setSongs(songs.data.data.results);
    setSearchResult(result.data.data);
    setCurrentSongs(songs.data.data.results);
    setLoading(false);
  }

  const getTime = (time: any) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search For Songs,Albums etc..."} path={"/music/search/"} />

        <UpperDiv>
          {searchResult?.topQuery?.results[0]?.title !== undefined && (
            <TopQuery>
              <h2>
                Top Result
              </h2>
              <div className='wrapper'>
                <img src={searchResult.topQuery !== undefined ? searchResult?.topQuery?.results[0]?.image[1]?.
                  link : ""} alt="" />
                <h1>
                  {searchResult.topQuery !== undefined ?
                    searchResult?.topQuery?.results[0]?.title : ""}
                </h1>
                <span>
                  {searchResult.topQuery !== undefined ?
                    searchResult?.topQuery?.results[0]?.type : ""}
                </span>
              </div>
            </TopQuery>
          )}
          <Songs>
            <div className='song-heading'>
              <h2>Songs</h2>
              <Link to={`/music/allsongs/${songName}`}>
                See All
              </Link>
            </div>
            {loading && <HomeCardSkeleton />}
            {!loading && (
              <div className='song-box'>
                {songs.map((item: any, index: any) => (
                  <Link className='song-chip' to={''} onClick={function() {
                    setActiveSong(item);
                    setIsPlaying(true);
                    setIsActive(true);
                    setCurrentIndex(index);
                    }}>
                    <div className='internal-song-chip'>
                      <img src={item.image[0].link} alt="" />
                      <div>
                        <h3>{(width <= 400 && item.name.length > 10) ?
                          item.name.substring(0, 10) + "..." : item.name.split('(')[0]}</h3>
                        <p>{(width <= 400 && item.primaryArtists.length > 10) ?
                          item.primaryArtists.substring(0, 25) + "..." : item.primaryArtists}</p>
                      </div>
                    </div>
                    <p className='duration'>
                      {getTime(item.duration)}</p>
                  </Link>
                ))}
              </div>
            )}
          </Songs>
        </UpperDiv>



        <AlbumsWrapper>
          <div className='alb-heading'>
            <h2>Albums</h2>
            <Link to="">See All</Link>
          </div>
          {loading && <HomeCardSkeleton />}
          {!loading && (
            <AlbWr>
              {searchResult.albums.results.map((item: any, index: any) => (
                <Link to="">
                  <img src={item.image[2].link} alt="" />
                  <h3 className='title'>
                    {item.title.length > 10 ? item.title.substring(0, 14) + "..." : item.title}
                  </h3>
                  <p className='desc'>
                    {item.description}
                  </p>
                </Link>
              ))}
            </AlbWr>
          )}
        </AlbumsWrapper>

        {searchResult?.artists?.results.length > 0 && (
          <ArtistsWrapper>
            <div className='art-heading'>
              <h2>Artists</h2>
              <Link to={''}>See All</Link>
            </div>
            {loading && <HomeCardSkeleton />}
            {!loading && (
              <div className='Art-Wrapper'>
                {searchResult.artists.results.map((item: any, index: any) => (
                  <Link to="">
                    <img src={item.image[2].link} alt="" />
                    <h3 className='title'>
                      {item.title.length > 10 ? item.title.substring(0, 14) + "..." : item.title}
                    </h3>
                    <p className='desc'>
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </ArtistsWrapper>
        )}


        {searchResult?.playlists?.results.length > 0 && (
          <PlayListWrapper>
            <div className='play-heading'>
              <h2>Playlists</h2>
              <Link to={''}>See All</Link>
            </div>
            {loading && <HomeCardSkeleton/>}
            {!loading && (
              <div className='play-Wrapper'>
                {searchResult.playlists.results.map((item:any,index:any)=>{
                  return (
                    <Link to={""}>
                      <img src={item.image[2].link} alt="" />
                      <h3 className='title'>
                        {item.title.length > 10 ? item.title.substring(0, 14) + "..." : item.title}
                      </h3>
                      <p>
                        {item.description}
                      </p>
                    </Link>
                  )
                })}
              </div>
            )}

          </PlayListWrapper>
        )}
      </MainDiv>
    </div>
  )
}

const PlayListWrapper = styled.div`
  margin :2rem 2rem;
  .play-heading{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .play-Wrapper{
    display:flex;
    gap:1rem;
    overflow-x:scroll;
    scrollbar-width:none;
    a{
      text-decoration:none;
      color:white;
      font-family:"Gilroy-Medium",sans-serif;
      background-color:#2b2b2b;
      padding:1rem;
      border-radius:0.3rem;
    }
  }
  .title{
    font-weight:bold;
    font-family:"Gilroy-Bold",sans-serif;
    max-width:160px;
    font-size:0.95rem;
  }
  .desc{
    font-size:0.8rem;
    color:#f0f0f0;
  }
  img{
    width:160px;
    height:160px;
    object-fit:cover;
  }
  a{
    text-decoration:none;
    color:white;
    font-family:"Gilroy-Medium",sans-serif;
  }
  @media screen and (max-width:600px){
    margin:2rem 1rem 1rem 1rem;
    padding:0rem 1rem 1rem 1rem;
    img{
      width:150px;
      height:150px;
    }
  }
  @media screen and (max-width:400px){
    img{
      width:120px;
      height:120px;
    }
  }
`


const ArtistsWrapper = styled.div`
  margin: 2rem 2rem 2rem 2rem;
  .art-heading{
    display:flex;
    align-items:center;
    justify-content:space-between;
  }
  .Art-Wrapper{
    display:flex;
    gap:1rem;
    overflow-x:scroll;
    scrollbar-width:none;
    a{
      text-decoration:none;
      color:white;
      font-family:"Gilroy-Medium",sans-serif;
      background-color:#2b2b2b;
      padding:1rem;
      border-radius:0.3rem;
    }
  }
  .title{
    font-weight:bold;
    font-family:"Gilroy-Bold",sans-serif;
    max-width:160px;
    font-size:0.95rem;
  }
  .desc{
    font-size:0.8rem;
    color:#f0f0f0;
  }
  img{
    width:160px;
    height:160px;
    border-radius:50%;
    object-fit:cover;
  }
  a{
    text-decoration:none;
    color:white;
    font-family:"Gilroy-Medium",sans-serif;
  }
  @media screen and (max-width:600px){
    margin:2rem 1rem 1rem 1rem;
    padding:0rem 1rem 1rem 1rem;
    img{
      width:150px;
      height:150px;
    }
  }
  @media screen and (max-width:400px){
    img{
      width:120px;
      height:120px;
    }
  }
`


const TopQuery = styled.div`
  .wrapper{
    background-color:#1d1d1d;
    padding:2rem 0 1rem 1rem;
    border-radius:0.5rem;
    width:390px;
    height:200px;
    img{
      width:92px;
      border-radius:50%;
    }
    span{
      background-color:#0000006e;
      padding:0.5rem;
      border-radius:500px;
      font-weight:700;
      font-size:0.9rem;
      text-transform:uppercase;
      @media screen and (max-width:600px){
        font-size : 0.7rem;
      }
    }
  }
  @media screen and (max-width:600px){
    .wrapper{
      width:80vw;
      h1{
        font-size : 1.3rem;
      }
    }
  }
`

const UpperDiv = styled.div`
  margin:1rem 2rem 1rem 2rem;
  audio{
    width:85vw;
  }
`

const Songs = styled.div`
  .song-heading{
    display:flex;
    align-items:center;
    justify-content:space-between;
    a{
      text-decoration:none;
      color:white;
    }
  }
  .song-box{
    display:grid;
    grid-template-columns:repeat(auto-fill,450px);
    column-gap:100px;
    @media screen and (max-width:1400px){
      display:flex;
      flex-direction:column;
    }
  }
  .song-chip{
    text-decoration:none;
    cursor:pointer;
    display:flex;
    justify-content:space-between;
    padding:0.7rem 1rem 0.7rem 1rem;
    :hover{
      background-color:#252424;
      border-radius:0.5rem;
    }
    .duration{
      margin-left:2rem;
      font-size:0.95rem;
    }
    img{
      width:60px;
      height:60px;
      margin-right:1rem;
    }
    p{
      margin:0;
      color:#bdbdbd;
      font-size:0.85rem;
      margin-top:0.5rem;
    }
    h3{
      margin:0;
      color:white;
    }
    
  }
  .internal-song-chip{
    display:flex;
  }
  
`

const AlbWr = styled.div`
  display:flex;
  gap:1rem;
  overflow-x:scroll;
  scrollbar-width:none;
  .title{
    font-weight:bold;
    font-family:"Gilroy-Bold",sans-serif;
    font-size:0.95rem;
  }
  .desc{
    font-size:0.8rem;
    color:#f0f0f0;
  }
  p{
    max-width:160px;
  }
  a{
    text-decoration:none;
    color:white;
    font-family:"Gilroy-Medium",sans-serif;
    background-color:#2b2b2b;
    padding:1rem;
  }
  img{
    width:160px;
    height:160px;
  }
  @media screen and (max-width:600px){
    img{
      width:150px;
      height:150px;
    }
  }
  @media screen and (max-width:400px){
    img{
      width:120px;
      height:120px;
    }
  }
`

const AlbumsWrapper = styled.div`
  margin:2rem 2rem 1rem 2rem;
  border-radius:0.4rem;
  overflow-x:scroll;
  scrollbar-width:none;
  .alb-heading{
    display:flex;
    align-items:center;
    justify-content:space-between;
    a{
      text-decoration:none;
      color:white;
    }
  }
  @media screen and (max-width:600px){
    margin:2rem 1rem 1rem 1rem;
    padding:0rem 1rem 1rem 1rem;
  }
`

const MainDiv = styled.div`
  padding : 0 0 10rem 0 ;
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

export default SongsSearchPage