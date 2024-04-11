import React, { useState } from 'react'
import styled from 'styled-components';

interface AnimeRecommendationProps{
    recommendations : any;
}


const AnimeRecommendations = ({recommendations}:AnimeRecommendationProps) => {
    const [showAll,setShowAll] = useState(false);
  return (
    <div>
        <Heading>
          <span>Recommendations</span>
          <span className='showmore' onClick={()=>setShowAll(!showAll)}>{showAll ? "Show Less" : "Show More"}</span>
        </Heading>
        <MainDiv>
            {recommendations?.edges?.slice(0, showAll ? recommendations?.edges?.length : 7).map((item:any,index:any)=>(
                <div className='cover'>
                    <img src={item?.node?.mediaRecommendation?.coverImage?.large} alt="" />
                    <div className="title">
                        {item?.node?.mediaRecommendation?.title?.romaji ?? item?.node?.mediaRecommendation?.title?.userPreferred}
                    </div>
                </div>
            ))}
        </MainDiv>
    </div>
    
  )
}


const Heading = styled.h2`
  display: flex;
  justify-content: space-between;
  font-size:1.2rem;
  font-weight: 500;
  font-family:'Gilroy-Medium',sans-serif;
  color: rgb(159,173,189);
  .showmore{
    cursor: pointer;
  }
`

const MainDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
    .title{
        font-family: 'Gilroy-Medium',sans-serif;
        color: rgb(159,173,189);
        font-weight: 600;
        font-size: 14px;
    }
    .cover{
        width:150px;
    }
    img{
        width: 150px;
        height: 210px;
        object-fit: cover;
        border-radius: 3px;
    }
`
export default AnimeRecommendations