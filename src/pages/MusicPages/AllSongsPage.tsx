import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import NavBar from '../../components/NavBars/NavBar';
import axios from 'axios';
import SongFetchAPI from '../../components/Music/SongFetchAPI';
import { ImGift } from 'react-icons/im';
import useWindowDimension from '../../hooks/useWindowDimension';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';

const AllSongsPage = () => {
  const songName = useParams().songName;
  const [pageNumber, setPageNumber] = useState(1);
  const { hasNextPage, isLoading, Allsongs } = SongFetchAPI(songName, pageNumber);
  const {width} = useWindowDimension();
  const {setActiveSong,setIsActive,setIsPlaying,setCurrentIndex,activeSong,setCurrentSongs} = useStateContext()
  const observer: any = useRef();
  const pagenumberChange = (node: any) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        setPageNumber(pageNumber + 1);
      }
    })

    if (node) {
      observer.current.observe(node);
    }

  }
  const lastSongElement = useCallback((node: any) => pagenumberChange(node), [isLoading, hasNextPage]);
  setCurrentSongs(Allsongs);
  const getTime = (time: any) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;
  return (
    <div>
      <MainDiv>
        <NavBar placeHolder={"Search For Song,Albums etc..."} path={'/music/search/'} />
       
        <h2>
          All Songs
        </h2>

        <Heading>
          <p>
            #
          </p>
          <p>
            TITLE
          </p>
          {width > 800 ? <p>
            ALBUM
          </p> : <></>}
          <p className='Time'>
            TIME
          </p>
        </Heading>
        <SongsWrapper>
          {Allsongs.map((item: any, index: any) => {
            if (Allsongs.length === index + 1) {
              return <div ref={lastSongElement} key={item.id} className="song-chip">
                <p className='number'>
                  {index + 1}
                </p>
                <div className='first-child'>
                  <img src={item.image[2].link} alt="" />
                  <div>
                    <p className='title'>
                      {item?.name}
                    </p>
                    <p className='artists'>
                      {item?.primaryArtists}
                    </p>
                  </div>

                </div>
                <div>
                  <p className='album'>{item?.album.name}</p>
                </div>
                <div>
                  <p className='time'>{getTime(item?.duration)}</p>
                </div>
              </div>
            }
            return <div className='song-chip' onClick={function() {
              setActiveSong(item);
              setIsPlaying(true);
              setIsActive(true);
              setCurrentIndex(index);
              }}>
              <p className='number'>
                {index + 1}
              </p>
              <div className='first-child'>
                <img src={item.image[2].link} alt="" />
                <div>
                  <p className='title'>
                    {item?.name.split("(")[0]}
                  </p>
                  <p className='artists'>
                    {item?.primaryArtists}
                  </p>
                </div>

              </div>
              <div>
                {width>800 && <p className='album'>{item?.album.name}</p>}
              </div>
              <div>
                <p className='time'>{getTime(item?.duration)}</p>
              </div>
            </div>
          })}
        </SongsWrapper>

      </MainDiv>
    </div>
  )
}

const Heading = styled.div`
    font-family:'Gilroy-Bold',sans-serif;
    display:grid;
    margin:1rem 0 0 1rem ;
    align-items:center;
    justify-content:center;
    grid-template-columns: [index] 25px [first] 5fr [var1] 2fr [last] 99px;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
    @media screen and (max-width:800px){
      grid-template-columns:[index] 25px [first] 5fr [last] minmax(120px,1fr);
    }
    @media screen and (max-width:450px){
      grid-template-columns:[index] 25px [first] 10fr [last] 55px;
    }
`


const SongsWrapper = styled.div`
  margin:0 0 0 1rem ;
  img{
    width:60px;
    height:60px;
    margin-left:1rem;
    border-radius:0.5rem;
  }
  .song-chip{
    cursor:pointer;
    .number{
      color:#bdbdbd;
      font-family:'Gilroy-Medium',sans-serif;
    }
    .title{
      font-family:'Gilroy-Bold',sans-serif;
      margin-left : 1rem;
      margin-top:0.3rem;
      margin-right:1rem;
    }
    .artists{
      font-size:0.90rem;
      margin-left : 1rem;
      color:#bdbdbd;
    }
    .album{
      color:#bdbdbd;
      margin-right:2rem;
    }
    .time{
      color:#bdbdbd;
    }
    .first-child{
      display:flex;
      align-items:center;
    }
    display:grid;
    margin:1rem 0 0 0 ;
    align-items:center;
    justify-content:center;
    grid-template-columns: [index] 16px [first] 5fr [var1] 2fr [last] 99px;
    @media screen and (max-width:800px){
      grid-template-columns:[index] 25px [first] 5fr [last] 2fr 120px;
    }
    @media screen and (max-width:450px){
      grid-template-columns:[index] 10px [first] 10fr [last] 2fr 50px;
    }
  }
  
`

const MainDiv = styled.div`
  h2{
    margin:1rem 0 0 1rem;
  }
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

export default AllSongsPage