import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SongFetchAPI = (songName, pageNumber) => {

  const [isLoading,setLoading] = useState(false);
  let [Allsongs,setSongs] = useState([]);
  const [hasNextPage,sethasNextPage] = useState(false);
  useEffect(()=>{
    setSongs([]);
  },[songName]);

  useEffect(()=>{
    getSongs();
  },[pageNumber]);
  const getSongs=async()=>{
    setLoading(true);
    let songs = await axios.get(`https://saavn.me/search/songs?query=${songName?.replaceAll(" ","+")}&page=${pageNumber}&limit=10`);
    Allsongs = Allsongs.concat(songs.data.data.results);
    setSongs(Allsongs);
    sethasNextPage(Boolean(songs.data.data.total));
    setLoading(false);
  }
  return {Allsongs,isLoading,hasNextPage};
}

export default SongFetchAPI