import React from 'react'
import styled from 'styled-components'
import useWindowDimension from '../../hooks/useWindowDimension'


interface AnimeRelationsProps{
  relations : any;
}


const AnimeRelations = ({relations}:AnimeRelationsProps) => {
  return (
    <AnimeRelationsContainer>
      {relations?.edges?.length <= 6 && (
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
      )}
      {relations?.edges?.length > 6 && (
        <RelationContainer2>
          {relations?.edges?.map((relation:any,index:any)=>(
            <div className='smallcard'>
              <div className='cover'>
                <img src={relation?.node?.coverImage?.medium} alt="" />
                <div className="image-text">
                  {relation?.relationType === "ADAPTATION" ? "Source" : relation?.relationType?.toLowerCase()?.replaceAll("_"," ")}
                </div>
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
        </RelationContainer2>
      )}
    </AnimeRelationsContainer>
  )
}


const RelationContainer2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  box-sizing: border-box;
  .smallcard{
    background: rgb(21,31,46);
    border-radius: 3px;
    display: inline-grid;
    grid-template-columns: 85px auto;
    height: 115px;
    max-height: 115px;
    position: relative;
  }
  .cover{
    position: relative;
    width: 85px;
    height: 115px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 3px;
      :hover{
        border-radius: 0;
      }
    }
    :hover{
      .image-text{
        opacity: 0;
      }
    }
  }
  .image-text{
    background-color: rgb(31,38,49,.7);
    color: rgb(237,241,245,.91);
    position: absolute;
    bottom: 0;
    left: 0;
    text-transform: capitalize;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 10px 0;
    font-size:14px;
    font-family:'Gilroy-Medium',sans-serif;
    font-weight: 400;
    border: 0 0 3px 3px;
    transition: all .3s;
  }
  .cover + .content {
    height: 80% !important;
    left: 100%;
    position: absolute;
    top: 0;
  }
  .content {
    display: inline-grid;
    grid-template-columns: 240;
    background: rgb(21,31,46);
    border-radius: 0 3px 3px 0;
    padding: 12px;
    position: relative;
    opacity: 0;
    transition: opacity .3s;
    width: 240px;
    z-index: -1;
    @media screen and (max-width:600px){
      width: 0;
    }
    
  }
  
  .cover:hover + .content{
    display: block;
    opacity: 1;
    z-index: 9;
    @media screen and (max-width:600px) {
      width: 0;
      opacity: 0;
      z-index: -1;
    }
  }
`



const AnimeRelationsContainer = styled.div`
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

export default AnimeRelations