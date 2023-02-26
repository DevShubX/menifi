import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MoviesSearchResults from './pages/MoviePages/MoviesSearchResults';
import SideBar from './components/SideBars/SideBar';
import useWindowDimension from './hooks/useWindowDimension';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviePages/MoviesPage';
import MoviesDetailsPage from './pages/MoviePages/MoviesDetailsPage';
import { useStateContext } from './GlobalContext/ContextProvider';
import WatchMoviesOnline from './pages/MoviePages/WatchMoviesOnline';
import TvShowPage from './pages/TvShowsPages/TvShowPage';
import TvShowsSearchResults from './pages/TvShowsPages/TvShowsSearchResults';
import TvShowDetailsPage from './pages/TvShowsPages/TvShowDetailsPage';
import WatchTvShowPage from './pages/TvShowsPages/WatchTvShowPage';
import AnimePage from './pages/AnimePages/AnimePage';
import AnimeSearchResultPage from './pages/AnimePages/AnimeSearchResultPage';
import AnimeDetailsPage from './pages/AnimePages/AnimeDetailsPage';
import WatchAnimePage from './pages/AnimePages/WatchAnimePage';
import MangaPage from './pages/MangaPages/MangaPage';
import MangaSearchResults from './pages/MangaPages/MangaSearchResults';
import MangaDetailsPage from './pages/MangaPages/MangaDetailsPage';
import MangaReadPage from './pages/MangaPages/MangaReadPage';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import AccountPage from './components/Account/AccountPage';
import { Toaster } from 'react-hot-toast';
import ComicPage from './pages/ComicPages/ComicPage';
import FavouritePage from './pages/FavouritePage/FavouritePage';
import Wishlist from './pages/WishlistPage/Wishlist';
import TopRatedMoviesPage from './pages/MoviePages/TopRatedMoviesPage';
import TopTrendingPage from './pages/MoviePages/TopTrendingPage';
import UpcomingMoviesPage from './pages/MoviePages/UpcomingMoviesPage';
import PopularMoviesPage from './pages/MoviePages/PopularMoviesPage';
import MusicPage from './pages/MusicPages/MusicPage';
import SongsSearchPage from './pages/MusicPages/SongsSearchPage';
import AllSongsPage from './pages/MusicPages/AllSongsPage';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import AlbumsDetails from './pages/MusicPages/AlbumsDetails';
import PopularTVShowsPage from './pages/TvShowsPages/PopularTVShowsPage';
import TopRatedTvShowsPage from './pages/TvShowsPages/TopRatedTvShowsPage';
import TVOnAirPage from './pages/TvShowsPages/TVOnAirPage';
import TrendingTvShowsPage from './pages/TvShowsPages/TrendingTvShowsPage';
function App() {
  const { width, height } = useWindowDimension();
  const { openMenu, currentUser, setCurrentUser, activeSong ,isActive} = useStateContext();
  return (
    <Router>
      {width < 600 && openMenu ?
        <Toaster
          position="top-right"
          reverseOrder={false}
        /> :
        <Toaster
          position="top-center"
          reverseOrder={false} />}
      <MainDiv>
        {((currentUser) && ((width >= 900) || openMenu)) && <SideBar />}
        <Routes>
          <Route path='/' element={!currentUser ? <Navigate to='/login' /> : <Navigate to='/home' replace />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignupPage />} />
          <Route path={"/home"} element={!currentUser ? <Navigate to={'/login'} /> : <HomePage />} />
          <Route path={"/movies"} element={currentUser !== null ? <MoviesPage /> : <Navigate to={'/login'} />} />
          <Route path={"/movies/search/:movieName"} element={<MoviesSearchResults />} />
          <Route path={"/movies/details&id=:episodeId"} element={<MoviesDetailsPage />} />
          <Route path={"/movies/watch&episodeId=:episodeId&mediaId=:mediaId"} element={<WatchMoviesOnline />} />
          <Route path={"/tvshows"} element={currentUser !== null ? <TvShowPage /> : <Navigate to={'/login'} />} />
          <Route path={"/tvshows/search/:tvshowname"} element={<TvShowsSearchResults />} />
          <Route path={"/tvshows/details&id=:tvId"} element={<TvShowDetailsPage />} />
          <Route path={"/tvshows/watch&episodeId=:episodeId&mediaId=:mediaId&episodeName=:episodeName"} element={<WatchTvShowPage />} />
          <Route path={"/animes"} element={currentUser !== null ? <AnimePage /> : <Navigate to={'/login'} />} />
          <Route path={"/animes/search/:animeName"} element={<AnimeSearchResultPage />} />
          <Route path={"/animes/category/:animeSlug"} element={<AnimeDetailsPage />} />
          <Route path={"/animes/watch&episodeId=:episodeSlug&animeName=:animeSlug&id=:animeId"} element={<WatchAnimePage />} />
          <Route path={"/mangas"} element={currentUser !== null ? <MangaPage /> : <Navigate to={'/login'} />} />
          <Route path={"/mangas/search/:mangaName"} element={<MangaSearchResults />} />
          <Route path={"/mangas/info/:mangaId"} element={<MangaDetailsPage />} />
          <Route path={"/mangas/read/:chapterId"} element={<MangaReadPage />} />
          <Route path={"/account"} element={currentUser !== null ? <AccountPage /> : <Navigate to={'/login'} />} />
          <Route path='/comics' element={currentUser !== null ? <ComicPage /> : <Navigate to={'/login'} />} />
          <Route path={'/myfav'} element={currentUser !== null ? <FavouritePage /> : <Navigate to={'/login'} />} />
          <Route path={'/wishlist'} element={currentUser !== null ? <Wishlist /> : <Navigate to={'/login'} />} />
          <Route path={"/movies/popular"} element={currentUser !== null ? <PopularMoviesPage /> : <Navigate to={'/login'} />} />
          <Route path={'/movies/top_rated'} element={currentUser !== null ? <TopRatedMoviesPage /> : <Navigate to={'/login'} />} />
          <Route path={'/movies/trending'} element={currentUser !== null ? <TopTrendingPage /> : <Navigate to={'/login'} />} />
          <Route path={'/movies/upcoming'} element={currentUser !== null ? <UpcomingMoviesPage /> : <Navigate to={'/login'} />} />
          <Route path={'/music'} element={currentUser !== null ? <MusicPage /> : <Navigate to={'/login'} />} />
          <Route path={'/music/search/:songName'} element={<SongsSearchPage />} />
          <Route path={'/music/allsongs/:songName'} element={<AllSongsPage />} />
          <Route path={'/music/albumdetails/:albumId'} element={<AlbumsDetails/>}/>
          <Route path={"/tvshows/popular"} element={currentUser !== null ? <PopularTVShowsPage /> : <Navigate to={'/login'} />} />
          <Route path={"/tvshows/top_rated"} element={currentUser !== null ? <TopRatedTvShowsPage /> : <Navigate to={'/login'} />}/>
          <Route path={"/tvshows/on_the_air"} element={currentUser !== null ? <TVOnAirPage /> : <Navigate to={'/login'} />}/>
          <Route path={"/tvshows/trending_tvshows"} element={currentUser !== null ? <TrendingTvShowsPage /> : <Navigate to={'/login'} />}/>
        </Routes>
        <div className='player'>
          {activeSong?.name && isActive && <MusicPlayer />}
        </div>
      </MainDiv>
    </Router>

  );
}

const MainDiv = styled.div`
 
  position:relative;
  .player{
    width:100%;
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
  }
`
export default App;



