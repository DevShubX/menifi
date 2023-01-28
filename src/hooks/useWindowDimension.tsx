import React, { useEffect, useState } from 'react'

function getWindowDimension(){
    const {innerWidth:width,innerHeight:height} = window;

    return {
        width,
        height
    };
}


const useWindowDimension = () => {
  const [windowDimensions,SetWindowDimension] = useState(
    getWindowDimension()
  );
  useEffect(()=>{
    function handleResize(){
        SetWindowDimension(getWindowDimension());
    }
    window.addEventListener("resize",handleResize);
    return()=>window.removeEventListener("resize",handleResize);
  },[]);

  return windowDimensions;
}

export default useWindowDimension