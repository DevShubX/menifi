import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import NavBar from '../../components/NavBars/NavBar';
import { AiOutlineNumber, AiTwotoneCalendar } from 'react-icons/ai';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import useWindowDimension from '../../hooks/useWindowDimension';
import { BiPlay } from 'react-icons/bi';

const AlbumsDetails = () => {
    const albumId = useParams().albumId;
    const [albumDetails, setAlbumDetails] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [artistsImage, setArtistsImage] = useState<any>();
    const { setActiveSong, setIsActive, setIsPlaying, setCurrentIndex, activeSong, setCurrentSongs } = useStateContext();
    const { width } = useWindowDimension();
    useEffect(() => {
        getAlbumsDetails();
    }, [albumId]);

    const getAlbumsDetails = async () => {
        let albumDetails = await axios.get(`https://saavn.me/albums?id=${albumId}`);
        setAlbumDetails(albumDetails.data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getArtistsDetails();
    }, [albumDetails?.primaryArtistsId]);

    const getArtistsDetails = async () => {
        let artists = await axios.get(`https://saavn.me/artists?id=${albumDetails?.primaryArtistsId}`);
        setArtistsImage(artists.data.data.image);
    }
    const getTime = (time: any) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

    setCurrentSongs(albumDetails?.songs);
    console.log(albumDetails);
    return (
        <div>
            <MainDiv>
                <NavBar placeHolder={"Search For Any Song, Album etc..."} path={"/music/search/"} />
                <AlbumInfo>
                    <div className='albumImage'>
                        <img src={albumDetails?.image[2]?.link !== undefined ? albumDetails?.image[2]?.link : 
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU"
                        } alt="" className='albumPhoto' />
                    </div>
                    <div className='details'>
                        <p className='album'>
                            {'ALBUM'}
                        </p>

                        <p className='albumName'>
                            {albumDetails?.name}
                        </p>
                        <p className='artists'>
                            <span>{artistsImage !== undefined && <img src={artistsImage[0]?.link} alt="" width={30} height={30} />}</span>
                            <span>{albumDetails?.primaryArtists.length > 0  ?  albumDetails?.primaryArtists.replaceAll("&amp;", "&") : "N/A"}</span>
                        </p>
                        <p className='release'>
                            <AiTwotoneCalendar className='icon' /> <span>{albumDetails?.releaseDate !== "" ? albumDetails?.releaseDate : "N/A"}</span>
                        </p>
                        <p className='songsCount'>
                            <AiOutlineNumber className='icon' /> <span>{albumDetails?.songCount} Songs</span>
                        </p>
                    </div>
                </AlbumInfo>

                <Heading>
                    <div className='title'>
                        <AiOutlineNumber className='icon' />
                        <p>
                            TITLE
                        </p>
                    </div>
                    <p className='time'>
                        TIME
                    </p>
                </Heading>
                <SongsWrapper>
                    {albumDetails?.songs.map((item: any, index: any) => {
                        return <div className='song-chip' onClick={function () {
                            setActiveSong(item);
                            setIsPlaying(true);
                            setIsActive(true);
                        }}>
                            <div className='image-number'>
                                <p className='number'>
                                    {index + 1}
                                </p>
                                <div className='first-child'>
                                    <img src={item.image[2].link} alt="" />
                                    <div>
                                        <p className='title'>
                                            {item?.name.split("(")[0]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='time-play'>
                                <p className='time'>{getTime(item?.duration)}</p>
                                {width > 900 && <BiPlay className='play-icon'/>}
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
    margin:1rem 5rem 0 1rem ;
    align-items:center;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
    display : flex;
    justify-content : space-between;
    .title{
        margin-left : 1rem;
        display : flex;
        align-items : center;
        .icon{
            margin-right : 3rem;
        }
    }
    .time{
        margin-right : 5rem;
    }
    @media screen and (max-width : 600px){
        margin : 1rem 1rem 0 1rem;
        .time{
            margin-right:1rem;
        }
    }
`


const SongsWrapper = styled.div` 
  margin:1rem 5rem 0 1rem ;
  img{
    width:60px;
    height:60px;
    margin-left:1rem;
  }
  .song-chip{
    padding : 1rem 1rem 1rem 1rem;
    cursor:pointer;
    display:flex;
    justify-content : space-between;
    align-items:center;
    :hover{
        background-color : #2d2d2d;
        border-radius : 1rem;
        .play-icon{
            opacity : 1;
        }
    }

    .play-icon{
        font-size : 2rem;
        margin-left : 2rem;
        opacity : 0;
    }
    .time-play{
        display: flex;
        align-items:center;
        
    }
    .image-number{
        display:flex;
    }
    .number{
      color:#bdbdbd;
      font-family:'Gilroy-Medium',sans-serif;
      margin-right : 0.5rem;
    }
    .title{
      font-family:'Gilroy-Bold',sans-serif;
      margin-left : 0.5rem;
      margin-top:0.3rem;
      margin-right:1rem;
    }
    .artists{
      font-size:0.90rem;
      margin-left : 0.5rem;
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
    @media screen and (max-width:600px){
        padding : 1rem 1rem 1rem 1rem;
    }
  }

  @media screen and (max-width:600px){
    margin : 1rem 1rem 1rem 1rem;
  }
  
`


const AlbumInfo = styled.div`
    display : flex;
    margin : 2rem 0 0 2rem;
    .icon{
        color : red;
    }
    .albumPhoto{
        width:232px;
        height:232px;
        margin-right: 2rem;
    }
    .album{
        font-size : 0.75rem;
        font-family: 'Gilroy-Bold',sans-serif;
    }

    .albumName{
        font-size : 3rem;
        margin : 0.08em 0px 0.12em;
        font-family : "Gilroy-Bold",sans-serif;
    }
    .artists{
        display:flex;
        align-items:center;
        img{
            width:24px;
            height:24px;
            border-radius:50%;
            object-fit:cover;
        }
        gap : 0.5rem;
        font-family:'Gilroy-Medium',sans-serif;
        font-weight : 700;
    }
    .release,.songsCount{
        display:flex;
        gap : 0.5rem;
        font-family : 'Gilroy-Regular',sans-serif;
        font-weight : 700;
    }

    @media screen and (max-width : 600px){
        flex-direction : column;
        margin : 2rem 1rem 0 1rem;
        .albumImage{
            width : 100%;
            text-align:center;
            img{
                width : 200px;
                height : 200px;
            }
        }
        .albumName{
            font-size : 2rem;
        }
    }
`



const MainDiv = styled.div`
  padding : 0 0 15rem 0 ;
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

export default AlbumsDetails