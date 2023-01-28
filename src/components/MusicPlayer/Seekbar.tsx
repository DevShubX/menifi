import React from 'react'
import styled from 'styled-components';


interface seek {
    value: any
    , min: any
    , max: any
    , onInput: any
    , setSeekTime: any
    , currentTime: any

}


const Seekbar = ({ value, min, max, onInput, setSeekTime, currentTime }: seek) => {
    const getTime = (time: any) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;


    return (
        <MainDiv>
            <p>
                {value===0?'0:00' : getTime(value)}
            </p>
            <input 
                type="range"
                step={"any"}
                value={value}
                min={min}
                max={max}
                onInput={onInput}
            />
             <p>
                {max==0 ? '0:00' : getTime(max)}
             </p>
        </MainDiv>

    )
}

const MainDiv = styled.div`
    font-family:"Gilroy-Medium",sans-serif;
    align-items:center;
    display:flex;
    width:80%;
    input{
        width:100%;
    }
    @media screen and (max-width:600px){
        margin-left: 2rem;
      }
`;

export default Seekbar