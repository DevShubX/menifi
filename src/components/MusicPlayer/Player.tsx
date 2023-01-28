import React, { useEffect, useRef } from 'react'

interface playerParameters{
    activeSong:any,
    volume:any,
    seekTime:any,
    onTimeUpdate:any,
    onLoadedData:any,
    repeat:any,
    isPlaying:boolean,
    currentIndex:any,
}


const Player = ({ activeSong, volume,isPlaying, seekTime,onTimeUpdate, onLoadedData, repeat,currentIndex }:playerParameters) => {
    const ref:any = useRef(null);
    if (ref.current){
        if(isPlaying){
            ref.current.play();
        }
        else{
            ref.current.pause();
        }
    }
    useEffect(()=>{
        ref.current.volume = volume;
    },[volume]);

    useEffect(()=>{
        ref.current.currentTime = seekTime;
    },[seekTime]);
  return (
    <audio src={activeSong?.downloadUrl[activeSong?.downloadUrl?.length-1]?.link}
    ref={ref}
    loop={repeat}
    onTimeUpdate={onTimeUpdate}
    onLoadedData={onLoadedData}
    />
  )
}

export default Player