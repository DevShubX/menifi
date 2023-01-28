import React, { useEffect } from 'react'
import styled from 'styled-components'
import { HiOutlineMenu } from 'react-icons/hi'
import useWindowDimension from '../../hooks/useWindowDimension'
import { useStateContext } from '../../GlobalContext/ContextProvider'
import { Link } from 'react-router-dom'
const HomepageNav = () => {
    const { width, height } = useWindowDimension();
    const { openMenu, setOpenMenu, currentUser, setCurrentUser } = useStateContext();
    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
        }
    }, [currentUser]);
    return (
        <>
            <MainDiv>
                {width <= 900 && (<button onClick={() => setOpenMenu(!openMenu)}>
                    <HiOutlineMenu className='menu-icon' /></button>)}
                {width > 900 && (
                    <Heading>
                        Hello,{currentUser.displayName}
                    </Heading>
                )}
                <AccountDiv>
                    <Link to={"/account"}>
                        <div className='image'>
                            <img src={currentUser.photoURL} alt="" />
                        </div>

                        {width > 600 && (
                            <div className='details'>
                                <h4>{currentUser.displayName}</h4>
                                <span>{currentUser.email}</span>
                            </div>
                        )}
                    </Link>

                </AccountDiv>
            </MainDiv>
        </>
    )
}

const Heading = styled.div`
    margin: 2rem 0 0 1rem;
    font-size:2rem;
    font-family: 'Gilroy-Bold',sans-serif;
    @media screen and (max-width:900px){
        font-size:1.5rem;
    }
`

const AccountDiv = styled.div`
    display: flex;
    margin: 1rem 2rem 0 0 ;
    a{
      display: flex;
      text-decoration: none;
      color : white
    }
    img{
        width: 55px;
        height: 55px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border : 2px solid red;
        object-fit: cover;
    }
    .details{
        display: flex;
        flex-direction: column;
        margin: 0.5rem 0 0 0.5rem;
    }
    h4{
        margin: 0;
        padding: 0;
        font-family: 'Gilroy-Regular',sans-serif;
    }
    span{
        font-family: 'Gilroy-Medium',sans-serif;
    }
`

const MainDiv = styled.div`
    display: flex;
    justify-content: space-between;
    .menu-icon{
        margin : 0 1rem 0 1rem;
        font-size:2rem;
        vertical-align: middle;
        color: white;
    }
    button{
        border: none;
        background-color: transparent;
        margin: 0;
        padding:0;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    @media screen and (max-width:900px){
        justify-content: space-between;
        width: 100vw;
    }

`

export default HomepageNav