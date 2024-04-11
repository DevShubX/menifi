import React from 'react'
import styled from 'styled-components';
import AnimeRelations from './AnimeRelations';
import AnilistCharacters from './AnilistCharacters';
import AnilistStaff from './AnilistStaff';
import AnimeRecommendations from './AnimeRecommendations';

interface OverViewContainerProps{
    animeDetails:any;
}
const OverviewContainer = ({animeDetails}:OverViewContainerProps) => {
  return (
    <MainDiv>
      <div>
        <Heading>
          Description
        </Heading>
        <div className="description" dangerouslySetInnerHTML={{__html:animeDetails?.description}}></div>
      </div>
      <div>
        <Heading>
          Relations
        </Heading>
        <AnimeRelations relations={animeDetails?.relations} />
      </div>
      <div>
        <Heading>
          Characters
        </Heading>
        <AnilistCharacters characters={animeDetails?.characters}/>
      </div>
      <div>
        <Heading>
          Staff
        </Heading>
        <AnilistStaff staff={animeDetails?.staff}/>
      </div>
      <Trailer>
        <Heading>
          Trailer
        </Heading>
        <iframe title={animeDetails?.trailer?.id} src={`https://www.youtube.com/embed/${animeDetails?.trailer?.id}?enablejsapi=1&wmode=opaque&autoplay=0`}></iframe>
      </Trailer>
      <div>
        <AnimeRecommendations recommendations={animeDetails?.recommendations} />
      </div>
    </MainDiv>
  )
}


const Trailer = styled.div`
  iframe{
    width: 521px;
    height: 230px;
  }
  @media screen and (max-width:900px) {
    iframe{
      width: 350px;
      height: 150px;
    }
  }
  @media screen and (max-width:900px) {
    iframe{
      width: 300px;
      height: 150px;
    }
  }
`

const Heading = styled.h2`
  font-size:1.2rem;
  font-weight: 500;
  font-family:'Gilroy-Medium',sans-serif;
  color: rgb(159,173,189);
`


const MainDiv = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .description-title{
    font-size:1.2rem;
    font-weight: 500;
    font-family:'Gilroy-Medium',sans-serif;
    color: rgb(159,173,189);  
  }
  .description{  
    font-family:'Gilroy-Medium',sans-serif;
  }
`
export default OverviewContainer