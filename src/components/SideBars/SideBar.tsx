import React, { useState } from 'react'
import styled from 'styled-components'
import { IoHome, IoTvSharp ,IoLogOutOutline} from 'react-icons/io5';
import { AiFillCloseCircle, AiFillStar } from 'react-icons/ai';
import { BsCameraReelsFill } from 'react-icons/bs'
import { FaNimblr } from 'react-icons/fa';
import { SiBookstack } from 'react-icons/si';
import { NavLink, useNavigate } from 'react-router-dom';
import { RiFileList3Fill } from 'react-icons/ri';
import {MdAccountCircle} from 'react-icons/md';
import {GiEvilBook} from 'react-icons/gi'
import useWindowDimension from '../../hooks/useWindowDimension';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import {CgMusicSpeaker} from 'react-icons/cg'
const SideBar = () => {
  const {width} = useWindowDimension(); 
  const {openMenu,setOpenMenu,currentUser} = useStateContext();
  const navigate = useNavigate();
  const handleSignout=async()=>{
    await signOut(auth).then(()=>{
      navigate('/login');
    }).catch((error)=>{
    });
  }
  return (
    <>
    {currentUser.uid && (
      <Nav>
      {width<=900&&(<AiFillCloseCircle onClick={()=>setOpenMenu(!openMenu)} className="close-icon"/>)}
        <MainHeading>
          <div><span>M</span>ENIFI</div>
        </MainHeading>
        <MenuArea>
          <Headings>MENU</Headings>
          <NavLink to='/home' onClick={()=>setOpenMenu(!openMenu)}>
            <p><IoHome className='menu-icons' /><span>Home</span></p>
          </NavLink>
          <NavLink to="/myfav" onClick={()=>setOpenMenu(!openMenu)}>
            <p><AiFillStar className='menu-icons' /><span>My Fav</span></p>
          </NavLink>
          <NavLink to="/wishlist" onClick={()=>setOpenMenu(!openMenu)}>
            <p><RiFileList3Fill className='menu-icons' /><span>Wishlist</span></p>
          </NavLink>
          <Headings>CATEGORY</Headings> {/* Catergory */}
          <NavLink to="/movies" onClick={()=>setOpenMenu(!openMenu)}>
            <p><BsCameraReelsFill className='menu-icons' /><span>Movies</span></p>
          </NavLink>
          <NavLink to="/tvshows" onClick={()=>setOpenMenu(!openMenu)}>
            <p><IoTvSharp className='menu-icons' /><span>TV Shows</span></p>
          </NavLink>
          <NavLink to="/animes" onClick={()=>setOpenMenu(!openMenu)}>
            <p><FaNimblr className='menu-icons' /><span>Animes</span></p>
          </NavLink>
          <NavLink to="/mangas" onClick={()=>setOpenMenu(!openMenu)}>
            <p><SiBookstack className='menu-icons' /><span>Mangas</span></p>
          </NavLink>
          <NavLink to="/comics" onClick={()=>setOpenMenu(!openMenu)}>
            <p><GiEvilBook className='menu-icons' /><span>Comics</span></p>
          </NavLink>
          <NavLink to="/music" onClick={()=>setOpenMenu(!openMenu)}>
            <p><CgMusicSpeaker className='menu-icons'/><span>Music</span></p>
          </NavLink>
          <Headings>GENERAL</Headings>
          <NavLink to="/account" onClick={()=>setOpenMenu(!openMenu)}>
            <p><MdAccountCircle className='menu-icons' /><span>Account</span></p>
          </NavLink>
          <a onClick={()=>handleSignout()}><IoLogOutOutline className='menu-icons'/><span>Log Out</span></a>
        </MenuArea>
      </Nav>  
    )}
      
    </>
  )
}
const Headings = styled.div`
  margin:2rem 0 2rem 0;
  font-size: 0.7rem;
  color: #bbb9b9;
  @media screen and (max-width:900px){
    text-align: center;
  }
`
const MenuArea = styled.div`
  margin-left: 2rem;
  font-family: 'Gilroy-Regular',sans-serif;
  a{
    text-decoration: none;
    color: #c5c5c5;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span{
      margin-left:0.5rem;
      font-size: 1rem;
    }
    p{
      justify-content: center;
      align-items: center;
      padding: 0.4rem 0 0.4rem 0;
      margin-top: 0.6rem ;
    }
    .menu-icons{
      font-size:1rem;
      vertical-align: -3px;
    }
   
    
  }
  .active{
    p{
      border-right: 3px solid red;
      color: red;
    }
    span{
      color: #c5c5c5;
    }
  }

  @media screen and (max-width:900px){
    text-align: center;
    margin-left: 0;
      p{
        display: flex;
        font-size: 0.5rem;
      }
  }
  @media screen and (max-width:600px){
    padding : 0 0 4rem  0 ;
    
  }
  
`
const Nav = styled.div`
  background-color: #0e1829;
  position: fixed;
  width: 11rem;
  height: 100%;
  z-index:10000;
  overflow-y: auto;
  
  .close-icon{
    position: absolute;
    top: 5px;
    right: 5px;
    color: red;
    font-size:1.5rem;
    cursor:pointer;
  }
  @media screen and (max-width:600px){
    margin : 0 0 4rem  0 ;
  }
`
const MainHeading = styled.div`
  margin-top:2rem;
  text-align: center;
  font-size: 1.7rem;
  font-family: 'Gilroy-Bold',sans-serif;
  color:#ffffff;
  span{
    color: red;
  }
  
`
export default SideBar