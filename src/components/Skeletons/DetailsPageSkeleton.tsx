import React from 'react'
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import useWindowDimension from '../../hooks/useWindowDimension'

const DetailsPageSkeleton = () => {
    const { width, height } = useWindowDimension();
    return (
        <div>
            <Maindiv>
                <Skeleton height={width<=900 ? "250px" : "500px"}
                    baseColor={"#808080"}
                    highlightColor={"#404040"}
                    style={{
                        borderRadius: "0.7rem",
                        marginBottom: width <= 600 ? "1rem" : "2rem"
                    }}
                />
                <ContentWrapper>
                    <Skeleton
                    baseColor='#808080'
                    highlightColor='#404040'
                    count={7}
                    style={{
                        marginBottom:'1rem'
                    }}
                    />
                </ContentWrapper>
            </Maindiv>
        </div>
    )
}

const ContentWrapper = styled.div`
    margin:2rem 5rem 2rem 5rem;
    @media screen and (max-width:900px){
        margin:1rem;
    }
`
const Maindiv = styled.div`
    margin-top:2rem;
    padding: 0 3rem 0 3rem;
    @media screen and (max-width:900px){
        padding:1rem;
    }

`
export default DetailsPageSkeleton