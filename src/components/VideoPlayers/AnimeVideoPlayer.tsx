import React, { useEffect, useState } from 'react';
import Hls, { HlsSkip } from "hls.js";
import Plyr from 'plyr';
import "plyr/dist/plyr.css";


const AnimeVideoPlayer = ({ sourceLinks }: { sourceLinks: any }) => {
    console.log(sourceLinks)
    let src = sourceLinks.sources[0].file;
    if (src.includes(".mp4")) {
        src = sourceLinks.sources_bk[0].file;
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
                    plyr.appendChild(button);
                    window.screen.orientation.lock("landscape");
                });

                player.on("exitfullscreen", (event: any) => {
                    document.querySelector(".skip-button")?.remove();
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

    }, [src]);



    return (
        <div>
            <video id="player" playsInline crossOrigin="anonymous"></video>
        </div>
    )
}

export default AnimeVideoPlayer