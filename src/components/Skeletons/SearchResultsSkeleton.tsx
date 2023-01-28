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
                {[...Array(40)].map((item:any,index:any)=>(
                    <div>
                        <Skeleton
                        key={index}
                        width={"160px"}
                        height={"235px"}
                        borderRadius={width<=900?"0.5rem":"1rem"}
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        />
                        <Skeleton
                        width={"160px"}
                        baseColor={"#808080"}
                        highlightColor={"#404040"}
                        count={2}
                        style={{
                            marginTop : width<=900 ? "0.5rem" : "1rem"
                        }}
                        />
                    </div>
                ))}
            </CardWrapper>
        </MainDiv>
    </div>
  )
}

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,180px);
    grid-gap: 1rem;
    grid-row-gap: 2rem;
    justify-content: space-between;
    margin-right: 2rem;
    @media screen and (max-width:900px){
        grid-template-columns: repeat(auto-fill,160px);
        grid-gap: 0.3rem;
        grid-row-gap: 1.5rem;
        margin-right: 0rem;
    }
`

const MainDiv = styled.div`
    
`



export default SearchResultsSkeleton