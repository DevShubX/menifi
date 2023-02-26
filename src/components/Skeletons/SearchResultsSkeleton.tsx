import React from 'react'
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import useWindowDimension from '../../hooks/useWindowDimension'

const SearchResultsSkeleton = ({movieName}:{movieName:any}) => {
    const {width,height} = useWindowDimension();
  return (
    <div>
        <MainDiv>
            <CardWrapper>
                {[...Array(width<=600 ? 10 : 20)].map((item:any,index:any)=>(
                    <div>
                        <Skeleton
                        key={index}
                        borderRadius={width<=900?"0.5rem":"1rem"}
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        className="skeletoncard"
                        />
                        <Skeleton
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        count={2}
                        style={{
                            marginTop : width<=900 ? "0.5rem" : "1rem"
                        }}
                        className="skeletontext"
                        />
                    </div>
                ))}
            </CardWrapper>
        </MainDiv>
    </div>
  )
}


const CardWrapper = styled.div`
    margin:0 0 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill,180px);
    grid-gap: 1rem;
    grid-row-gap: 2rem;
    justify-content: space-between;
    margin-right: 2rem;
    @media screen and (max-width:900px){
        grid-template-columns: repeat(auto-fill,180px);
        grid-gap: 0.3rem;
        grid-row-gap:1.5rem ;
        margin-right:0rem;
        margin-left:1rem;
    }
    @media screen and (max-width:600px){
        margin-right:0.5rem;
        grid-template-columns:repeat(auto-fill,120px);
        grid-gap: 0.5rem;
        grid-row-gap: 1.5rem ;
    }
    @media screen and (max-width:400px){
        grid-template-columns: repeat(auto-fill,110px);
        grid-gap: 0.3rem;
        grid-row-gap:1.5rem ;
        margin-right:0.5rem;
        margin-left:1rem;
    }
    @media screen and (max-width:380px){
        grid-template-columns:repeat(auto-fill,100px);
        grid-gap: 0rem;
        grid-row-gap: 1.5rem ;
    }
`

const MainDiv = styled.div`
    .skeletoncard{
        width: 165px;
        height: 235px;
        @media screen and (max-width:600px){
            width: 120px;
            height: 180px;
            border-radius: 0.3rem;
        }
        @media screen and (max-width:400px){
            width: 100px;
            height: 160px;
            
        }
        @media screen and (max-width:380px){
            width: 90px;
            height: 150px;
        }
    }
    .skeletontext{
        width: 165px;
        @media screen and (max-width:600px){
            width: 120px;
            border-radius: 0.3rem;
        }
        @media screen and (max-width:400px){
            width: 100px;
        }
        @media screen and (max-width:380px){
            width: 90px;
        }
    }
`



export default SearchResultsSkeleton