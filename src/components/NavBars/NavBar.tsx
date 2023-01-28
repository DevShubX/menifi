import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BiSearch } from 'react-icons/bi';
import useWindowDimension from '../../hooks/useWindowDimension';
import { HiOutlineMenu } from 'react-icons/hi';
import { useStateContext } from '../../GlobalContext/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
const NavBar = ({ placeHolder, path }: { placeHolder: any, path: any }) => {
  const { width, height } = useWindowDimension();
  const { openMenu, setOpenMenu } = useStateContext();
  const [searchText, setSearchText] = useState("");
  const { currentUser, setCurrentUser } = useStateContext();

  const navigate = useNavigate();
  const searchEnter = () => {
    if (searchText !== "") {
      navigate(`${path}` + searchText);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    }
  }, [currentUser]);

  return (
    <>
      <NavDiv>
        {width <= 900 && (<button onClick={() => setOpenMenu(!openMenu)}>
          <HiOutlineMenu className='menu-icon' /></button>
        )}
        <InputDiv>
          <button><BiSearch className='search-icon' /></button>
          <input
            type="text"
            placeholder={placeHolder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchEnter();
              }
            }}
          />
        </InputDiv>
        <AccountDiv>
          <Link to={'/account'}>
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
      </NavDiv>
    </>
  )
}
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
        height:55px;
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
`;

const NavDiv = styled.div`
  margin-left: 1rem ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button{
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  .menu-icon{
        margin : 1rem 0rem 0 1rem;
        font-size:2.5rem;
        vertical-align: middle;
        color: white;
    }
  @media screen and (max-width:900px) {
    margin-left:0;
  }
`;

const InputDiv = styled.div`
  padding: 0.5rem 0.5rem;
  display: flex;
  background-color: #3a3a3af4;
  border-radius: 2rem ;
  margin: 1rem 0rem 0 1rem;
  width: 50%;
  align-items: center;
  input{
    border: none;
    width: 100%;
    padding: 0rem 0.5rem;
    background-color: transparent;
    outline: none;
    font-size: 1rem;
    color: white;
    align-items: center;
    justify-content: center;
  }
  
  .search-icon{
    vertical-align: middle;
    font-size:1.5rem;
    padding: 0.5rem 0.4rem;
    color: #a09e9e;
    :hover{
      color: #808080;
    }
  }
  @media screen and (max-width:600px) {
    width: 50%;
  }
`;
export default NavBar