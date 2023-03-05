import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import HomepageNav from '../../components/NavBars/HomepageNav'

import SearchResultsSkeleton from '../../components/Skeletons/SearchResultsSkeleton'
import { database } from '../../Firebase/firebase'
import { useStateContext } from '../../GlobalContext/ContextProvider'

const Wishlist = () => {
    const [loading,setLoading] = useState(true);
    const [wishlist,setWishlist] = useState<any>([]);
    const {currentUser} = useStateContext();
    const dbref = ref(database,`users/${currentUser.uid}/wishlist/wishlist_arr`);

    useEffect(()=>{
        getWishlist();
    },[]);

    const getWishlist=()=>{
        setLoading(true);
        onValue(dbref,(snapshot)=>{
            if(snapshot.exists()){
                let fav = snapshot.val();
                setWishlist(fav);
            }
        });
        setLoading(false);
    }
  return (
    <div>
        <MainDiv>
        <HomepageNav/>
        <Parent>
            <Heading>
                <h1>
                    My Wishlist
                </h1>
            </Heading>
            {loading&&<SearchResultsSkeleton movieName={""}/>}
            {!loading && (
                <CardWrapper>
                    {wishlist.map((item:any,index:any)=>(
                        <Wrapper to={item.animePageLink ? item.animePageLink : item.movieStreamingLink.includes('tv')? 
                        "/tvshows/details&id="+(item.movieStreamingLink.replace("https:/dopebox.se/","").replace("https://dopebox.se/","").replace("/tv","tv").replace("tv/","tv+")):
                        item.movieStreamingLink}>
                            <img src={item.filmPoster ? item.filmPoster : item.anilistPoster.large} alt="" />
                            <p>{item.animePageLink ? item.title.userPreferred !== null ? item.title.userPreferred : item.title.romaji : item.title}</p>
                        </Wrapper>
                    ))}
                </CardWrapper>
            )}

        </Parent>
        </MainDiv>
    </div>
  )
}
const Wrapper = styled(Link)`
  text-decoration:none;
  img{
    width: 160px;
    height: 235px;
    object-fit: cover;
    border-radius: 1rem;
  }
  p{
    color: #ffffff;
    font-family: "Gilroy-Bold",sans-serif;
    font-weight: 600;
    font-size: 18px;
    max-width: 160px;
    @media screen and (max-width:900px){
      font-size:16px;
    }
  }
  @media screen and (max-width:400px){
    img{
        width:120px;
        height:180px;
    }
  }
`

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,180px);
  grid-gap: 1rem;
  grid-row-gap: 2rem;
  justify-content: space-between;
  margin-right: 2rem;
  @media screen and (max-width:900px){
    grid-template-columns: repeat(auto-fill,160px);
    grid-gap: 0.3rem;
    grid-row-gap:1.5rem ;
    margin-right:0rem;
  }
  @media screen and (max-width:400px){
    grid-template-columns: repeat(auto-fill,120px);
    grid-gap: 0.3rem;
    grid-row-gap:1.5rem ;
    margin-right:0rem;
  }

`

const Heading = styled.p`
  font-family:"Gilroy-Bold",sans-serif;
  margin-bottom: 2rem;
  @media screen and (max-width:900px){
    font-size : 1rem;
  }
`
const Parent = styled.div`
  margin-left: 2rem;
  @media screen and (max-width:900px){
    margin-right: 2rem;
    
  }
`

const MainDiv = styled.div`
  position: relative;
  margin: 0 0 0 12rem;
  display: flex;
  flex-direction: column;
  color: white;
  width:90vw;
  @media screen and (max-width:1850px){
    width:86vw;
  }
  @media screen and (max-width:1450px){
    width:83vw;
  }
  @media screen and (max-width:1150px){
    width: 79vw;
  }
  @media screen and (max-width:900px){
    width: 99vw;
    margin: 0 0 0 0rem;
  }
`
export default Wishlist
