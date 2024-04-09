import React from 'react'
import styled from 'styled-components';
import { dateOptions, formatDate, secondsToDateTime, timeUntilAiring } from '../../constants/methods';


interface AnilistAdditionalInformationProps{
    animeDetails: any,
}


const AnilistAdditionalInformation = ({animeDetails}:AnilistAdditionalInformationProps) => {
  return (
    <MainDiv>
      {animeDetails?.nextAiringEpisode && (
          <AiringBox>
            <div className="type">
              Airing
            </div>
            {/* <div className="hovertext">
              Ep {animeDetails?.nextAiringEpisode?.episode} {secondsToDateTime(animeDetails?.nextAiringEpisode?.airingAt)?.toLocaleString('en-GB',dateOptions)}
            </div> */}
            <div className='value'>
              Ep {animeDetails?.nextAiringEpisode?.episode} {timeUntilAiring(animeDetails?.nextAiringEpisode?.timeUntilAiring)}
            </div>
        </AiringBox>
        )}
      <div className='box'>
        <div className='type'>
          Format
        </div>
        <div className='value'>
          {animeDetails?.format}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Type
        </div>
        <div className="value">
          {animeDetails?.type?.toLowerCase()}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Episodes
        </div>
        <div className="value">
          {animeDetails?.episodes}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Episode Duration
        </div>
        <div className="value">
          {animeDetails?.duration} mins
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Status
        </div>
        <div className="value">
          {animeDetails?.status?.toLowerCase().replaceAll("_"," ")}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Start Date
        </div>
        <div className="value">
          {formatDate(`${animeDetails?.startDate?.month}/${animeDetails?.startDate?.day}/${animeDetails?.startDate?.year}`)}
        </div>
      </div>
      {animeDetails?.endDate?.month && animeDetails?.endDate?.day && animeDetails?.endDate?.year && (
        <div className='box'>
          <div className="type">
            End Date
          </div>
          <div className="value">
            {formatDate(`${animeDetails?.endDate?.month}/${animeDetails?.endDate?.day}/${animeDetails?.endDate?.year}`)}
          </div>
      </div>
      )} 
      <div className='box'>
        <div className="type">
          Season
        </div>
        <div className="value">
          {animeDetails?.season} {animeDetails?.seasonYear}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Average Score
        </div>
        <div className="value">
          {animeDetails?.averageScore}%
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Mean Score
        </div>
        <div className='value'> 
          {animeDetails?.meanScore}%
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Popularity
        </div>
        <div className="value">
          {animeDetails?.popularity}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Favourites
        </div>
        <div className="value">
          {animeDetails?.favourites}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Studios
        </div>
        <div className="value">
          {animeDetails?.studios?.edges.find((studio:any)=>studio?.isMain == true)?.node?.name}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Producers
        </div>
        <div>
          {animeDetails?.studios?.edges?.map((studio:any,index:any)=>{
            if(studio?.isMain == false){
              return (
                <div className='value'>
                  {studio?.node?.name}
                </div>
              )
            }
          })}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Source
        </div>
        <div className="value">
          {animeDetails?.source?.toLowerCase().replace("_"," ")}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Genres
        </div>
        <div>
          {animeDetails?.genre?.map((genre:any,index:any)=>(
            <div className="value">
              {genre}
            </div>
          ))}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Romaji
        </div>
        <div className="value">
          {animeDetails?.title?.romaji ?? " "}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          English
        </div>
        <div className="value">
          {animeDetails?.title?.english ?? " "}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Native
        </div>
        <div className="value">
          {animeDetails?.title?.native ?? " "}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          User Preferred
        </div>
        <div className="value">
          {animeDetails?.title?.userPreferred ?? " "}
        </div>
      </div>
      <div className='box'>
        <div className="type">
          Synonyms
        </div>
        <div>
          {animeDetails?.synonyms?.map((synonym:any)=>(
            <div className='value'>
              {synonym}
            </div>
          ))}
        </div>
      </div>
    </MainDiv>
  )
}

const AiringBox = styled.div`
    .type,.value{
      color: rgb(61,180,242) !important;
    }
`

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgb(21,31,46);
  border-radius: 3px;
  padding: 18px;
  width: 248px;
  max-width: 248px;
  .box{
    display: flex;
    flex-direction: column;

  }
  .type{
    font-size: 14px;
    padding-bottom: 5px;
    color: #9dadbb;
    font-family: 'Gilroy-Bold',sans-serif;
  }
  .value{
    text-transform: capitalize;
    font-size: 13px;
    color: rgb(133,150,165);
    font-family: 'Gilroy-Medium',sans-serif;

  }

  @media screen and (max-width:900px) {
    flex-direction: row;
    overflow-x: scroll;
    width: 100%;
    max-width: 100%;
    height: 120px;
    .type,.value{
      white-space: nowrap;
    }
  }

`

export default AnilistAdditionalInformation