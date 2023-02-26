import React, { useEffect, useState } from 'react';
import Hls, { HlsSkip } from "hls.js";
import Plyr from 'plyr';
import "plyr/dist/plyr.css";
import styled, { useTheme } from 'styled-components';
import { IconContext } from 'react-icons';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';


const AnimeVideoPlayer = ({ sourceLinks ,internalPlayer,setInternalPlayer}: { sourceLinks: any ,internalPlayer:any,setInternalPlayer:any}) => {
    // if (src.includes(".mp4")) {
    //     src = sourceLinks.sources_bk[0].file;
    // }

    const [ChangeSource ,setChangeSource] = useState(false);
    let src:any;
    if(!ChangeSource){
        src =sourceLinks.sources[0].file;
    }else{
        src =sourceLinks.sources_bk[0].file;
    }


    useEffect(() => {
        const video: any = document.getElementById("player");
        let flag = true;
        const defaultOptions: any = {
            caption: { active: true, update: true, language: "en" },
            controls: [
                "play-large",
                "rewind",
                "play",
                "fast-forward",
                "progress",
                "current-time",
                "duration",
                "mute",
                "volume",
                "settings",
                "fullscreen",
            ],
        };

        function updateQuality(newQuality: any) {
            if (newQuality === 0) {
                (window as any).hls.currentLevel = -1;
                // console.log("Auto quality selection");

            } else {
                (window as any).hls.levels.forEach((level: any, levelIndex: any) => {
                    if (level.height === newQuality) {
                        // console.log("Found quality match with" + newQuality);
                        (window as any).hls.currentLevel = levelIndex;
                    }
                });
            }
        }
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, function (event: any, data: any) {
                const availableQualities = hls.levels.map((l: any) => l.height);
                availableQualities.unshift(0);
                defaultOptions.quality = {
                    default: 0,
                    options: availableQualities,
                    forced: true,
                    onChange: (e: any) => updateQuality(e),
                };
                hls.on(Hls.Events.LEVEL_SWITCHED, function (event: any, data: any) {
                    let span: any = document.querySelector(
                        ".plyr__menu__container [data-plyr='quality'][value='0'] span"
                    );
                    if (hls.autoLevelEnabled) {
                        span.innerHTML = `Auto (${hls.levels[data.level].height}p)`;
                    } else {
                        span.innerHTML = `Auto`;
                    }
                });

                let player = new Plyr(video, defaultOptions);
                var button = document.createElement("button");
                button.classList.add("skip-button");
                button!.innerHTML = "Skip Intro";
                button.addEventListener("click", function () {
                    player.forward(85);
                });

                let plyr: any;
                player.on("ready", () => {
                    plyr = document.querySelector(".plyr_controls");
                });

                player.on("enterfullscreen", (event: any) => {
                   
                    window.screen.orientation.lock("landscape");
                });

                player.on("exitfullscreen", (event: any) => {
                    
                    window.screen.orientation.lock("portrait");
                });

                player.on("timeupdate", (event: any) => {
                    var time: any = player.currentTime;
                });
            });
            hls.attachMedia(video);
            (window as any).hls = hls;
        } else if (video.canPlayType("application/vnd.apple.mpgeurl")) {
            video.src = src;
            const defaultOptions: any = {
                caption: { active: true, update: true, language: "en" },
                controls: [
                    "play-large",
                    "rewind",
                    "play",
                    "fast-forward",
                    "progress",
                    "current-time",
                    "duration",
                    "mute",
                    "volume",
                    "settings",
                    "fullscreen",
                ],
            };
            let player = new Plyr(video, defaultOptions);
            let button = document.createElement("button");
            button.classList.add("skip-button");
            button.innerHTML = "Skip Intro";
            button.addEventListener("click", function () {
                player.forward(85);
            });

            let plyr: any;
            player.on("ready", () => {
                plyr = document.querySelector(".plyr_controls");
            });

            player.on("enterfullscreen", (event: any) => {
                plyr.appendChild(button);
                window.screen.orientation.lock("landscape");
            });

            player.on("exitfullscreen", (event: any) => {
                document.querySelector(".skip-button")?.remove();
                window.screen.orientation.lock("portrait");
            });
        } else {
            const player = new Plyr(src, defaultOptions);
            player.source = {
                type: "video",
                title: "Example title",
                sources: [{
                    src: src,
                    type: "video/mp4",
                },]
            };

        }

    }, []);



    return (
        <div style={{
            marginBottom : '1rem',
            fontFamily : '"Gilroy-Medium",sans-serif',
        }}>
            <Container>
                <IconContext.Provider
                value={{
                    size: "1.5rem",
                    color : 'white',
                    style : {
                        verticalAlign : "middle",
                    }
                }} 
                >
                    {internalPlayer && <p>Internal Player</p>}
                    <div>
                        <div className='tooltip'>
                            <button onClick={()=>setInternalPlayer(!internalPlayer)}>
                                <HiOutlineSwitchHorizontal/>
                            </button>
                            <span className="tooltiptext">server</span>
                        </div>
                        <div className="tooltip">
                            <button onClick={()=>setChangeSource(!ChangeSource)}>
                                <HiOutlineSwitchHorizontal/>
                            </button>
                            <span className="tooltiptext">source</span>
                        </div>
                    </div>
                </IconContext.Provider>
            </Container>

            <video id="player" playsInline crossOrigin="anonymous"></video>
        </div>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(16, 16, 16);
    padding:0.5rem 1rem;
    border-radius:0.5rem 0.5rem 0 0;
    font-family: 'Gilroy-Medium',sans-serif;

    div{
        display: flex;
    }
    button{
        outline : none;
        border: none;
        background: transparent;
        margin-left: 1rem;
        cursor:pointer;
    }
    .tooltip{
        position : relative;
        display: flex;
        flex-direction: column;
        margin-right: 0.5rem;
        align-items: center;
        justify-content: center;

    }
    .tooptip .tooltiptext{
        visibility: hidden;
        width: 120px;
        background-color: rgba(0,0,0,0.8);
        color: #000;
        text-align: center;
        border-radius:6px;
        padding : 5px 5px ;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.2s;
    }
    .tooltip .tooltiptext::after{
        content: "";
        position: absolute;
        top: 100%;
        left : 50%;
        margin-left: -5px;
        border-width : 5px;
        border-style : solid;
        border-color: black transparent transparent transparent;
    }
    .tooltip:hover .tooltiptext{
        visibility: visible;
        opacity: 1;
    }


`


export default AnimeVideoPlayer