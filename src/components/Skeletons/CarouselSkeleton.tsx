import React from 'react';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useWindowDimension from '../../hooks/useWindowDimension';


function CarouselSkeleton() {
    const {width,height}=useWindowDimension();

  return (
    <div style={{
      marginBottom : "1rem",
      marginRight : width<=600 ? "1rem": '3rem',
      marginLeft : width<=600 ? "1rem" : "2rem",
      marginTop : "1rem"
    }}>
        <Skeleton
        height={width<=600?"270px" : "330px"}
        baseColor={"#808080"}
        highlightColor={"#404040"}
        borderRadius={width<=600 ? "0.5rem" : "1rem"}
        />
    </div>
  )
}

export default CarouselSkeleton