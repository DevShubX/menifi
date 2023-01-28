import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import styled from 'styled-components'
import useWindowDimension from '../../hooks/useWindowDimension'

const AnimeArticleSkeleton = () => {
    const { width, height } = useWindowDimension();
    return (
        <div>
            <MainDiv>
                <div className='imgdiv'>
                    <Skeleton
                        height={width <= 600 ? "150px" : "350px"}
                        width={width <= 600 ? "240px" : "450px"}
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        borderRadius={"1rem"}
                    />
                </div>
                <div className='info'>
                    <Skeleton
                        className='sk'
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        borderRadius={"1rem"}
                    />
                    <Skeleton
                        className='sk'
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        borderRadius={"1rem"}
                    />
                   <Skeleton
                        className='sk'
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        borderRadius={"1rem"}
                    />
                    <Skeleton
                        className='sk'
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        borderRadius={"1rem"}
                    />
                </div>
            </MainDiv>
        </div>
    )
}

const MainDiv = styled.div`
    display: flex;
    background-color: #3a3a3a;
    margin-right: 3rem;
    margin-bottom:3rem;
    border-radius:1rem;
    padding: 2rem 3rem 2rem  2rem;
    .info{
        width: 100%;
        margin-left: 2rem;
        .sk{
            width: 100%;
            height: 2rem;
            margin-bottom: 3rem;
            @media screen and (max-width:600px){
                height: 1rem;
            }
        }

        @media screen and (max-width:600px){
            margin-top:1rem;
            margin-left: 0;
        }
        
    }
    .imgdiv{
        width: 100%;
        
    }
    @media screen and (max-width:1100px) {
    flex-direction: column;
    margin-right: 2rem;
    .imgdiv{
        text-align: center;
    }
  }  

`
export default AnimeArticleSkeleton