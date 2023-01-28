import React from 'react'
import { BsFillVolumeUpFill, BsVolumeDownFill, BsVolumeMuteFill } from 'react-icons/bs'
import styled from 'styled-components'

interface volumebar {
    value:any,min:any,max:any,onChange:any,setVolume:any
}


const VolumeBar = ({value,min,max,onChange,setVolume}:volumebar) => {
  return (
    <VolumeWrapper>
        {value > 0.5 && value <= 1 && <BsFillVolumeUpFill onClick={()=>setVolume(0)} size={20}/>}
        {value >0 && value <=0.5 && <BsVolumeDownFill onClick={()=>setVolume(0)} size={25}/>}
        {value == 0 && <BsVolumeMuteFill size={25}/>}
        <input type="range" 
        step={'any'}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        />
    </VolumeWrapper>
  )
}


const VolumeWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  input{
    font-size:0.4rem;
  }
  @media screen and (max-width:900px){
    justify-content:end;
  }

`
export default VolumeBar