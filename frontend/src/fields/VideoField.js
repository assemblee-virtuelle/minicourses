import React from 'react';
import ReactPlayer from "react-player";

const detectPlayer = url => {
  if (url.includes("youtube") || url.includes("facebook") || url.includes("fb.watch")) {
    return "basic";
  } else if (url.includes("videos/watch") || url.includes("videos/embed")){
    return "peertube";
  } else if (url.includes("dailymotion")) {
    return "dailymotion";
  }
}

const VideoField = ({ record, source, ...rest }) => {
  let url = record?.[source] || '';

  switch (detectPlayer(url)) {
    case 'peertube':
      if (!url.includes("embed")) {
        const splitUrl = url.split("watch/")
        url = splitUrl[0] + "embed/" + splitUrl[1]
      }
      return <iframe title="Vidéo" width="100%" height="100%" sandbox="allow-same-origin allow-scripts" src={url} frameBorder="0" allow="fullscreen" {...rest} />;

    case "dailymotion":
      if (!url.includes("embed")) {
        const splitUrl = url.split("video/");
        url = "https://www.dailymotion.com/embed/video/" + splitUrl[1].split('?play')[0]
      }
      return <ReactPlayer url={url} controls {...rest} />;

    case 'basic':
      return <ReactPlayer url={url} controls {...rest} />;

    default:
      return null;
  }
};

export default VideoField;