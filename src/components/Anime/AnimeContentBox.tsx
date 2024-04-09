import React, { useState } from 'react'
import styled from 'styled-components'
import OverviewContainer from './OverviewContainer';
import EpisodeSectionWithImage from './EpisodeSectionWithImage';
import { useParams } from 'react-router-dom';
import AnimeCharacterSection from './AnimeCharacterSection';
import AnimeStaffSection from './AnimeStaffSection';
import AnimeRelationSection from './AnimeRelationSection';

interface AnimeContextBoxProps{
  animeDetails : any;
  isLoading : boolean;
}

const AnimeContentBox = ({animeDetails,isLoading}:AnimeContextBoxProps) => {
  let animeSlug = useParams().animeSlug;
  animeSlug = animeSlug?.replace(":", "").replace("(", "").replace(")", "");
  const [selectedItem,setSelectedItem] = useState(1);
  return (
    <MainDiv>
      <div>
        <SelectorMenu>
              <button onClick={()=>setSelectedItem(1)} disabled={isLoading}>Overview</button>
              <button onClick={()=>setSelectedItem(2)} disabled={isLoading}>Watch</button>
              <button onClick={()=>setSelectedItem(3)} disabled={isLoading}>Characters</button>
              <button onClick={()=>setSelectedItem(4)} disabled={isLoading}>Staff</button>
              <button onClick={()=>setSelectedItem(5)} disabled={isLoading}>Relations</button>
              <button onClick={()=>setSelectedItem(6)} disabled={isLoading}>Reviews</button>

              <select name="selector" id="" onChange={(e:any)=>setSelectedItem(parseInt(e.target.value))}>
                <option value={1}>Overview</option>
                <option value={2}>Watch</option>
                <option value={3}>Characters</option>
                <option value={4}>Staff</option>
                <option value={5}>Relations</option>
                <option value={6}>Reviews</option>
              </select>

          </SelectorMenu>
          {selectedItem === 1 && (
            <OverviewContainer animeDetails={animeDetails?.anilistResponse}/>
          )}
          {selectedItem === 2 && (
            <EpisodeContainer>
              <EpisodeSectionWithImage id={animeDetails?.anilistResponse?.id} animeInfo={animeDetails} animeSlug={animeSlug}/>
            </EpisodeContainer>
          )}
          {selectedItem === 3 && (
            <AnimeCharacterSection characters={animeDetails?.anilistResponse?.characters}/>
          )}
          {selectedItem === 4 && (
            <AnimeStaffSection staff={animeDetails?.anilistResponse?.staff}/>
          )} 
          {selectedItem === 5 && (
            <AnimeRelationSection relations={animeDetails?.anilistResponse?.relations}/>
          )}
      </div>
    </MainDiv>
  )
}

const EpisodeContainer = styled.div`
  padding: 18px;
`
const SelectorMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap:4rem;
  flex-wrap:wrap;
  margin-bottom: 2rem;
  button{
    border:none;
    background-color: transparent;
    font-family: 'Gilroy-Bold',sans-serif;
    color: white;
    font-size:15px;
    cursor:pointer;
  }
  select{
        display: none;
        padding: 5px 50px 5px 5px;
        font-size: 1.2rem;
        background-color: rgb(21,31,46);
        color: rgb(159,173,189);
        outline: 0;
        border:0;
        transition: all .2s;
        width: 100%;
        border-radius: 4px;
        font-family: 'Gilroy-Medium',sans-serif;

    }
    option{
        font-family: 'Gilroy-Medium',sans-serif;
        color: rgb(159,173,189);
        border-radius: 4px;
        outline: 0;
        border:0;
    }
  @media screen and (max-width:900px) {
    margin-bottom: 0;
    button{
      display:none;
    }  
    select{
      display: block;
      margin: 18px 18px 0 18px;
      padding: 18px;
    }
  }
`

const MainDiv = styled.div`
    width: 100%;
    border-radius: 8px;
    border: 1px solid #ffffff28;
    padding: 18px;
    margin: 0 0 0 2rem;
    @media screen and (max-width:600px) {
        margin: 0;
    }
`


export default AnimeContentBox