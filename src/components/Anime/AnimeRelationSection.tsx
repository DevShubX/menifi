import React from 'react'
import styled from 'styled-components';


interface AnimeRelationSectionProps{
    relations : any;
}

const AnimeRelationSection = ({relations}:AnimeRelationSectionProps) => {
  return (
    <MainDiv>
        <Heading>
            Relations
        </Heading>
        <div className='grid-wrap'>
          {relations?.edges?.map((relation:any,index:any)=>(
            <div className='media-card'>
              <div className='cover'>
                <img src={relation?.node?.coverImage?.medium} alt="" />
              </div>
              <div className='content'>
                <div className="info-header">
                  {relation?.relationType === "ADAPTATION" ? "Source" : relation?.relationType?.toLowerCase()?.replaceAll("_"," ")}
                </div>
                <div className="title">
                  {relation?.node?.title?.romaji ?? relation?.node?.title?.english}
                </div>
                <div className="info">
                  {relation?.node?.format === "OVA"
                  ? "OVA" :
                  relation?.node?.format?.toLowerCase()} · {relation?.node?.status?.toLowerCase().replaceAll("_"," ")}
                </div>
              </div>
            </div>
          ))}
        </div>
    </MainDiv>
  )
}

const Heading = styled.h1`
    margin-bottom: 2rem;
    font-size:1.2rem;
    font-weight: 500;
    font-family:'Gilroy-Medium',sans-serif;
    color: rgb(159,173,189);

`

const MainDiv = styled.div`
    padding: 18px;
    img{
    object-fit: cover;
    height: 100%;
    border-radius: 3px 0 0 3px;
    }
    .grid-wrap{
        display: grid;
        grid-column-gap: 30px;
        grid-row-gap: 20px;
        grid-template-columns: repeat(3,1fr);
        @media screen and (max-width:1200px) {
        grid-template-columns: repeat(1,1fr);
        }
        @media screen and (max-width:900px) {
        grid-template-columns: repeat(1,1fr);
        }
    }
    .media-card{
        background: rgb(21,31,46);
        border-radius: 3px;
        display: inline-grid;
        grid-template-columns: 85px auto;
        height: 115px;
        max-height: 115px;
    }
    .cover{
        height: 115px;
    }
    .content{
        border-radius: 0 3px 3px 0;
        background: rgb(21,31,46);
        padding: 12px;
        position: relative;
    }
    .info-header,.info{
        text-transform: capitalize;
    }
    .info-header{
        color: rgb(61,180,242);
        font-family: 'Gilroy-Medium',sans-serif;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 8px;
    }
    .title{
        overflow-wrap:break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 'Gilroy-Medium',sans-serif;
        font-size: 14px;
        color:rgb(191, 204, 219);
    }
    .info{
        bottom: 12px;
        color: rgb(133,150,165);
        font-size: 13px;
        left: 12px;
        position: absolute;
        font-family: 'Gilroy-Medium',sans-serif;
    }
`


export default AnimeRelationSection