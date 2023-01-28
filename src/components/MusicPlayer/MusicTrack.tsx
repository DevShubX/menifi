import React from 'react'
import styled from 'styled-components'
import useWindowDimension from '../../hooks/useWindowDimension'
import Marquee from 'react-fast-marquee';


interface track {
  isPlaying: any,
  isActive: any,
  activeSong: any,
}

const MusicTrack = ({ isPlaying, isActive, activeSong }: track) => {
  const {width} = useWindowDimension();
  return (
    <div>
      <TrackWrapper>
        {isPlaying && isActive && width > 900?
          <ImageWrapperRotate>
            <img src={activeSong?.image[2]?.link} alt="" />
          </ImageWrapperRotate>
          :
          <ImageWrapper>
            <img src={activeSong?.image[2]?.link} alt="" />
          </ImageWrapper>
          }
          <TextWrapper>
              {activeSong?.name && width >= 1100 && <p className='name'>{activeSong?.name.split("(")[0]}</p>}
              {activeSong?.name && width < 1100 && <Marquee className='marquee'
              gradient={false}>{activeSong?.name?.split("(")[0] + " "}</Marquee>}
            <p className='artists'>
              {activeSong?.primaryArtists ? activeSong?.primaryArtists.split(",")[0].replace("&amp;",","): 'No artist name' }
            </p>
          </TextWrapper>
      </TrackWrapper>
    </div>
  )
}

const TextWrapper = styled.div`

  .marquee{
    font-family:"Gilroy-Bold",sans-serif;
    @media screen and (max-width:600px){
      max-width:200px;
    }
  }
  .name{
    font-family:"Gilroy-Bold",sans-serif;
    font-size:1.3rem;
  }
  .artists{
    font-family:'Gilroy-Medium',sans-serif;
    color:#dfdbdb;
  }
  @media screen and (max-width:900px){
    text-align:center;
  }
  @media screen and (min-width:900px){
    margin-left:1rem;
  }
`

const ImageWrapper = styled.div`
  img{
      border-radius:50%;
      width:80px;
      height:80px;
      @media screen and (max-width:900px){
        width:50px;
        height:50px;
      }
    }
`
const ImageWrapperRotate = styled.div`
    img{
      border-radius : 50%;
      width:80px;
      height:80px;
      @media screen and (max-width:900px){
        width:150px;
        height:150px;
      }
    }
    animation: spin 3s linear infinite;
    @keyframes spin{
      0% {transform : rotate(0deg);}
      100% {transform : rotate(360deg);}
  }
`

const TrackWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:start;
  @media screen and (max-width:900px){
    justify-content:center;
    flex-direction:column;
  }
    
`

export default MusicTrack