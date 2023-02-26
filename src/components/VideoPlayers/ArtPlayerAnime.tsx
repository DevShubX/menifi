import Artplayer from 'artplayer';
import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';

const ArtPlayerAnime = ({sourcesLinks}:{sourcesLinks:any}) => {
    let src = sourcesLinks.sources[0].file;
    const artRef = useRef<any>();
    useEffect(() => {
        const art = new Artplayer({
            container : artRef.current,
            url: src,
            autoOrientation:true,
            muted: false,
            autoplay: false,
            pip: true,
            autoSize: false,
            autoMini: false,
            setting: true,
            loop: true,
            flip: true,
            playbackRate: true,
            aspectRatio: true,
            fullscreen: true,
            subtitleOffset: true,
            mutex: true,
            backdrop: true,
            autoPlayback: true,
            whitelist: ['*'],
            screenshot:true,
            lock:true,
            moreVideoAttr: {
                crossOrigin: 'anonymous',
            },
            quality:[
                {
                    html:'Auto',
                    url : src,
                },
            ],
            customType: {
                m3u8: function (video, url) {
                    if (Hls.isSupported()) {
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = url;
                    } else {
                        art.notice.show = 'Does not support playback of m3u8';
                    }
                },
            },
            
            icons: {
                indicator: '<img width="16" heigth="16" src="/assets/indicator.svg">',
            },
        });
        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);

    return <VideoDiv ref={artRef}></VideoDiv>;
}


const VideoDiv = styled.div`
    width: 100%;
    height: 500px;
    @media screen and (max-width:600px){
        height: 300px;
    }
`

export default ArtPlayerAnime