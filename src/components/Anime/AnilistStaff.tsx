import React from 'react'
import { defaultImage } from '../../constants/url'
import styled from 'styled-components'

interface AnilistStaffProps{
    staff : any;
}


const AnilistStaff = ({staff}:AnilistStaffProps) => {
  return (
    <MainDiv>
        <div className="grid-wrap">
            {staff?.edges?.slice(0,6)?.map((staff:any,index:any)=>{
                return (
                    <div className="staff">
                        <div className="cover">
                            <img src={staff?.node?.image?.medium ?? defaultImage} alt="" />
                        </div>
                        <div className='content'>
                            <div className="name">
                                {staff?.node?.name?.userPreferred ?? staff?.node?.name?.full}
                            </div>
                            <div className="role">
                                {staff?.role}
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    </MainDiv>
  )
}

const MainDiv = styled.div`
    .grid-wrap{
        display: grid;
        grid-column-gap: 30px;
        grid-row-gap: 20px;
        grid-template-columns: repeat(3,1fr);
        @media screen and (max-width:1200px) {
            grid-template-columns: repeat(1,1fr);
        }
        @media screen and (max-width:900px) {
            grid-template-columns: repeat(1,1fr);
        }
    }
    .staff{
        background: rgb(21,31,46);
        border-radius: 3px;
        display: inline-grid;
        grid-template-columns: 60px auto;
        height: 85px;
        max-height: 85px;
    }
    .cover{
        img{
            width: 60px;
            height: 85px;
            object-fit: cover;
        }
        height: 85px;
    }
    .content{
        border-radius: 0 3px 3px 0;
        background: rgb(21,31,46);
        padding: 12px;
        position: relative;
    }
    .name{
        display: block;
        height: 48px;
        font-size: 14px;
        line-height: 1.3;
        font-family:'Gilroy-Medium',sans-serif;
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

export default AnilistStaff