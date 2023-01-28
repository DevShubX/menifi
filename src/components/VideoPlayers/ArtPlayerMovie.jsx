import Artplayer, { html } from 'artplayer';
import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import useWindowDimension from '../../hooks/useWindowDimension';

const ArtPlayerMovie = ({ sourceslinks }) => {
    
    let src = sourceslinks?.sources[0]?.url || sourceslinks?.sources[0]?.file;
    let subtitle = sourceslinks?.subtitles?.map((item)=>{
        return {
            html : item.lang,
            url : item.url,
        }
    });
    const artRef = useRef();
    useEffect(() => {
        const art = new Artplayer({
            container: artRef.current,
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
            quality:sourceslinks.sources.map((item)=>{
                let container = {};
                container["html"] = item.quality;
                container["url"] = item.url;
                return container;
            }),
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
            settings: [
                {
                    width: 200,
                    html: 'Subtitle',
                    tooltip : 'Subtitle',
                    selector: subtitle,
                    onSelect: function (item) {
                        art.subtitle.switch(item.url, {
                            name: item.html,
                        });
                        return item.html;
                    },
                },
            ],
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

export default ArtPlayerMovie