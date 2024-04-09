import React from 'react'
import styled from 'styled-components'

interface AnilistCharactersProps{
    characters : any,
}


const AnilistCharacters = ({characters}:AnilistCharactersProps) => {
  return (
    <AnilistCharactersContainer>
        <div className="grid-wrap">
            {characters?.edges?.map((character:any,index:any)=>{
                if(character?.role === "MAIN"){
                    return (
                        <div className="role-card">
                            <div className="character">
                                <div className="cover">
                                    <img src={character?.node?.image?.medium} alt="" />
                                </div>
                                <div className="content">
                                    <div className="name">
                                        {character?.node?.name?.full}
                                    </div>
                                    <div className="role">
                                        {character?.role?.toLowerCase()}
                                    </div>
                                </div>
                                </div>
                            <div className="staff">
                                <div className="cover">
                                    <img src={character?.voiceActors?.find((voiceActor:any)=> voiceActor?.languageV2 === "Japanese")?.image?.medium} alt="" />
                                </div>
                                <div className='content'>
                                    <div className="name">
                                        {character?.voiceActors?.find((voiceActor:any)=> voiceActor?.languageV2 === "Japanese")?.name?.full}
                                    </div>
                                    <div className="role">
                                        {character?.voiceActors?.find((voiceActor:any)=> voiceActor?.languageV2 === "Japanese")?.languageV2}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                
            })}
        </div>
    </AnilistCharactersContainer>
  )
}


const AnilistCharactersContainer = styled.div`
    .grid-wrap{
        display: grid;
        grid-column-gap: 30px;
        grid-row-gap: 15px;
        grid-template-columns: repeat(3,1fr);
        @media screen and (max-width:1200px) {
            grid-template-columns: repeat(2,1fr);
        }
        @media screen and (max-width:600px) {
            grid-template-columns: repeat(1,1fr);
        }
    }
    .role-card{
        background-color: rgb(21,31,46);
        display: inline-grid;
        grid-template-columns: 50% 50%;
        height: 85px;
        grid-template-areas: "character staff";
        border-radius: 3px;
    }
    .character{
        display: inline-grid;
        grid-template-columns: 60px auto;
        grid-area: character;
        grid-template-areas: "image content";
        .cover{
            img{
                border-radius: 3px 0 0 3px;
            }
        }
    }
    .staff{
        display: inline-grid;
        grid-template-columns: auto 60px;
        grid-area: staff;
        grid-template-areas: "content image";
        .content{
            text-align: right;
        }
        .cover{
            img{
                border-radius: 0 3px 3px 0;
            }
        }
    }
    .cover{
        grid-area: image;
        img{
            width: 60px;
            height: 85px;
            object-fit: cover;
            
        }
    }
    .content{
        grid-area: content;
        padding: 10px;
    }
    .name{
        display: block;
        height: 48px;
        font-size: 14px;
        line-height: 1.3;
        font-family:'Gilroy-Medium',sans-serif;
        text-transform: capitalize;
        color:rgb(191, 204, 219);

    }
    .role{
        font-size:13px;
        color:rgb(133,150,165);
        font-family: 'Gilroy-Medium',sans-serif;
        text-transform: capitalize;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
`

export default AnilistCharacters