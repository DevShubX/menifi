import React, { useEffect, useState } from 'react'
import useWindowDimension from '../../hooks/useWindowDimension';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import NavBar from '../../components/NavBars/NavBar';
import SearchResultsSkeleton from '../../components/Skeletons/SearchResultsSkeleton';

const UpcomingMoviesPage = () => {
    const [loading,setLoading] = useState(true);
    const [upcomingMovies,setUpcomingMovies] = useState<any>([]);
    const {width} = useWindowDimension();
    const [pageNumber,setPageNumber] = useState(1);

    useEffect(()=>{
        getUpcoming();
    },[pageNumber]);

    const getUpcoming=async()=>{
        setLoading(true);
        let result = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNumber}`);
        setUpcomingMovies(result.data);
        setLoading(false);
    }
  return (
        <div>
            <MainDiv>
                <NavBar placeHolder={"Search For Movies..."} path={"/movies/search/"} />
                <Heading>
                    <span>Upcoming Movies</span> Results
                </Heading>
                {loading && <SearchResultsSkeleton movieName={'Upcoming Movies Result'} />}
                {!loading && (
                    <>
                        <CardWrapper>
                            {upcomingMovies.results.map((item: any, index: any) => (
                                <Links to={`/movies/search/` + (item.title !== null || undefined ? item.title : item.original_title)}>
                                    <img src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`} alt="" />
                                    <p>
                                        {item.title !== null || undefined ? item.title : item.original_title}
                                    </p>
                                </Links>
                            ))}
                        </CardWrapper>
                        
                    </>
                )}
                <ReactPaginate
                            className='React-paginate'
                            pageCount={upcomingMovies.total_pages}
                            nextLabel="Next >"
                            previousLabel="< Previous"
                            breakLabel="..."
                            pageRangeDisplayed={width <= 600 ? 2 : 8}
                            onPageChange={(event: any) => {
                                setPageNumber(event.selected + 1);
                            }}
                        />
            </MainDiv>
        </div>
    )
}

const Links = styled(Link)`
    text-decoration:none;
    img{
        object-fit:cover;
        border-radius:0.5rem;
        @media screen and (max-width:600px){
            width: 120px;
            height: 180px;
            border-radius: 0.3rem;
        }
        @media screen and (max-width:400px){
            width: 100px;
            height: 160px;
            
        }
        @media screen and (max-width:380px){
            width: 90px;
            height: 150px;
        }
    }
    p{
        color : white;
        font-family::"Gilroy-Bold",sans-serif;
        max-width:160px;
        @media screen and (max-width:400px){
            font-size : 0.9rem;
        }
    }
`
const CardWrapper = styled.div`
    margin:0 0 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill,180px);
    grid-gap: 1rem;
    grid-row-gap: 2rem;
    justify-content: space-between;
    margin-right: 2rem;
    @media screen and (max-width:900px){
        grid-template-columns: repeat(auto-fill,180px);
        grid-gap: 0.3rem;
        grid-row-gap:1.5rem ;
        margin-right:0rem;
        margin-left:1rem;
    }
    @media screen and (max-width:600px){
        margin-right:0.5rem;
        grid-template-columns:repeat(auto-fill,120px);
        grid-gap: 0.5rem;
        grid-row-gap: 1.5rem ;
    }
    @media screen and (max-width:400px){
        grid-template-columns: repeat(auto-fill,110px);
        grid-gap: 0.3rem;
        grid-row-gap:1.5rem ;
        margin-right:0.5rem;
        margin-left:1rem;
    }
    @media screen and (max-width:380px){
        grid-template-columns:repeat(auto-fill,100px);
        grid-gap: 0rem;
        grid-row-gap: 1.5rem ;
    }
`

const Heading = styled.div`
    font-family:"Gilroy-Light",sans-serif;
    font-size : 1.8rem;
    margin:2rem 0 3rem 2rem;
    span{
        font-family:"Gilroy-Bold",sans-serif;
    }
    @media screen and (max-width:600px){
        font-size : 1.6rem;
        margin:1rem 1.5rem 2rem 1rem;

    }
    @media screen and (max-width:400px){
        margin:1rem 1.5rem 2rem 1rem;
        font-size : 1.3rem;
    }
`

const MainDiv = styled.div`
  position: relative;
  margin:0 0 0 12rem;
  display: flex;
  flex-direction:column;
  color: white;
  width: 90vw;
  @media screen and (max-width:1850px) {
    width:86vw;
  }
  @media screen and (max-width:1450px){
    width :83vw;
  }
  @media screen and (max-width:1150px){
    width: 79vw;
  }
  @media screen and (max-width:900px){
    width: 99vw;
    margin: 0 0 0 0rem;
  }
  .React-paginate{
        margin:1rem;
        display: flex;
        justify-content: space-around;
        text-decoration: none;
        background-color: #232425;
        padding: 0.8rem;
        cursor: pointer;
        list-style: none;
        border-radius: 1.5rem;
        justify-items: center;
        align-items: center;
        font-family: "Gilroy-Bold",sans-serif;
        a{
            font-size: 1rem;
        }
        .selected{
            color: #ff0000;
            align-items: center;
            justify-items: center;
        @media screen and (max-width:768px){
            a{
                font-size: 0.8rem;
            }
        }
    }
}
`
export default UpcomingMoviesPage