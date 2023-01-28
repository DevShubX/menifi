import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useWindowDimension from '../../hooks/useWindowDimension';
import AnimeArticleSkeleton from '../Skeletons/AnimeArticleSkeleton';

const AnimeArticles = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowDimension()
  useEffect(() => {
    getAnimeReviews();
  }, []);

  const getAnimeReviews = async () => {
    let result = await axios.get(`https://redux-api-wine.vercel.app/api/anime-reviews`);
    setReviews(result.data.data.Page.reviews);
    setLoading(false);
  }
  function checkWidth() {
    if (width >= 1700 && width <= 1920) {
      return "large";
    }
    else if (width >= 1000 && width < 1700) {
      return "medium";
    }
    else if (width <= 900) {
      return "small";
    }
  }
  return (
    <div>
      <MainDiv>
        <Heading>
          <h1>
            Articles
          </h1>
        </Heading>
        {loading && (<AnimeArticleSkeleton />)}
        {!loading && (
          <div>
            {reviews.slice(0, 3).map((review: any, index: any) => (
              <CardWrapper>
                <div className='image-div'>
                  <img src={review.media.coverImage.extraLarge} alt="" />
                </div>
                <div className='info'>
                  <h2>
                    {review.media.title.english !== null ? review.media.title.english : review.media.title.romaji}
                  </h2>
                  <>
                    {review?.media?.genres?.map((genre: any, index: any) => (genre !== null || undefined || "")&& (
                      <span>{genre} | </span>
                    ))}
                  </>
                  <p className='summary'>
                    {checkWidth() === "large" ? (review.body.substring(0, 1000) + "...") :
                      checkWidth() === "medium" ? (review.body.substring(0, 300) + "...") :
                        checkWidth() === "small" ? (review.body.substring(0, 100) + "...") :
                          (review.body.substring(0, 100) + "...")}
                  </p>
                  <Link to="">
                    Read More <BsArrowRight className='read-more' />
                  </Link>
                </div>
              </CardWrapper>
            ))}
          </div>
        )}

        <div className='button-div'>
          <Link to="/animes/articles">
            See More
          </Link>
        </div>

      </MainDiv>
    </div>
  )
}
const CardWrapper = styled.div`
  display: flex;
  background-color: #3a3a3a;
  margin-right: 3rem;
  margin-bottom:3rem;
  border-radius:1rem;
  padding: 0 3rem 0  0;
  .summary{
    max-width: 1086px;
  }
  .image-div{
    margin: 1.5rem 0 1.5rem 1.5rem; 
  }
  .info{
    position: relative;
    margin-left:2.5rem;
    h2{
      font-family:"Gilroy-Bold",sans-serif;
      margin-bottom: 0;
    }
    .summary{
      margin: 3rem 0 2.5rem 0;
      max-height: 200px;
      overflow-y: scroll;
      font-family:'Gilroy-Medium',sans-serif;
      @media screen and (max-width:900px){
        margin-top: 1rem;
        margin-bottom: 3rem;
      }
    }
    a{
      text-decoration: none;
      position: absolute;
      bottom: 5%;
      left: 0;
      border: none;
      background-color: transparent;
      color: white;
      font-family: "Gilroy-Bold",sans-serif;
      font-size : 1rem;
      cursor: pointer;
      .read-more{
        vertical-align: middle;
      }
    }
  }
  img{
    object-fit: cover;
    width: 450px;
    height: 350px;
    border-radius: 1rem ;
    @media screen and (max-width:900px){
      width: 300px;
      height: 150px;
    }
    @media screen and (max-width:400px) {
      width: 245px;
      height: 150px;
    }
  }
  @media screen and (max-width:1100px) {
    flex-direction: column;
    margin-right: 2rem;
    .image-div{
      margin: 1rem 1rem 1rem 2rem; 
    }
  }  

  
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 3rem;
  font-family: "Gilroy-Bold",sans-serif;
  a{
      color: red;
      text-decoration: none;
      border: 1px solid red;
      padding: 0.5rem 0.5rem;
      border-radius: 1rem;
  }
  h1{
      font-size:2.3rem;
      color:#ebe9e9;
      
  }
  @media screen and (max-width:900px){
  margin-right: 1rem;
  h1{
    font-size: 2rem;
  }
  a{
    font-size:0.9rem;
  }
  }
  @media screen and (max-width:600px){
      margin-right:1rem;
      h1{
      font-size: 1.6rem;
      }
  }
`

const MainDiv = styled.div`
  margin-left: 2rem;
  margin-bottom: 10rem;
  .button-div{
    margin-top: 2rem;
    text-align: center;
    a{
      text-decoration: none;
      cursor: pointer;
      border: none;
      background-color: red;
      color: white;
      border-radius: 0.5rem;
      font-size: 1rem;
      padding: 1rem 3rem;
      font-family: "Gilroy-Bold",sans-serif;
      filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));;
    }
  }
`

export default AnimeArticles