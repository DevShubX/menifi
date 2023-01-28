import Hls from 'hls.js';
import Plyr from 'plyr';
import React, { useEffect, useState } from 'react'
import "plyr/dist/plyr.css"
import styled from 'styled-components';
interface videoplayer {
  sourceslinks: any,
}
const MovieVideoPlayer = ({ sourceslinks }: videoplayer) => {
  let src = sourceslinks?.sources[0].url || sourceslinks?.sources[0].file;
  useEffect(() => {
    const video: any = document.getElementById("player");
    let flag = true;
    const defaultOptions: any = {
      caption: { active: true, update: true,language:"en"},
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
        "captions",
      ]
    };
    const updateQuality = (quality: any) => {
      sourceslinks.sources.map((item: any, index: any) => {
        if (item.quality === quality.toString()) {
          src = item.url;
        }
      })
    }
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event: any, data: any) {
        defaultOptions.quality = {
          default: src,
          options: sourceslinks.sources.map((l: any) => l.quality),
          forced: true,
          onChange: (e: any) => updateQuality(e)
        };
        let player = new Plyr(video, defaultOptions);
        var button = document.createElement("button");
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
        player.on("seeking", (event: any) => {
          let round: any = Math.round(player.currentTime);
        });
      })
    }
  }, [src]);


  return (
    <div>
      <video id="player" playsInline crossOrigin='anonymous'>
      </video>
    </div>
  )
}


export default MovieVideoPlayer