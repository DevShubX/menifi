import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowDimension from '../../hooks/useWindowDimension';
import HomeCardSkeleton from '../Skeletons/HomeCardSkeleton';

const AnimeAdditionalVideos = ({ idMal }: { idMal: any }) => {
  const [loading, setLoading] = useState(true);
  const [promoVideo, setPromoVideos] = useState<any>([]);
  const [musicVideo, setMusicVideo] = useState<any>([]);
  const {width,height} = useWindowDimension()
  useEffect(() => {
    getAnimeAddVideos();
  }, []);

  const getAnimeAddVideos = async () => {
    let result = await axios.get(`https://api.jikan.moe/v4/anime/${idMal}/videos`);
    setPromoVideos(result.data.data.promo);
    setMusicVideo(result.data.data.music_videos);
    setLoading(false);
  }
  return (
    <div>
      <MainDiv>
        <Heading>
          <h1>
            Trailers
          </h1>
        </Heading>
        {loading && (<HomeCardSkeleton />)}
        {!loading && (
          <div>
            <Content>
              {promoVideo.map((item: any, index: any) => (
                <Wrapper>
                  <iframe allowFullScreen
                    src={item.trailer.embed_url.replace("autoplay=1", "autoplay=0")
                    } ></iframe>
                  <p>{item.title}</p>
                </Wrapper>
              ))}
            </Content>
          </div>
        )}
        <Heading>
          <h1>
            Music Videos
          </h1>
        </Heading>
        {loading && (<HomeCardSkeleton />)}
        {!loading && (
          <div>
            <Content>
              {musicVideo.slice(0,10).map((item: any, index: any) => (
                <Wrapper>
                  <iframe allowFullScreen width={width>900?"350px":"300px"} height = {width>900?"200px":"150px"}
                    src={item.video.embed_url.replace("autoplay=1", "autoplay=0")
                    } >
                    </iframe>
                  <p>{item.title}</p>
                </Wrapper>
              ))}
            </Content>
          </div>
        )}
      </MainDiv>
    </div>
  )
}

const Content = styled.div`
  display:flex;
  max-width: 1700px;
  overflow-x: scroll;
  margin-bottom: 2rem;
`

const Wrapper = styled.div`
  margin-right: 2rem;
  p{
    font-family: "Gilroy-Medium",sans-serif;
    font-size : 1.1rem;
  }
`

const Heading = styled.div`
  h1{
    font-family : "Gilroy-Bold",sans-serif;
  }
  @media screen and (max-width:600px){
    h1{
      font-size : 1.5rem;
    }
  }
`

const MainDiv = styled.div`
  margin: 5rem 0 0 0;
`
export default AnimeAdditionalVideos