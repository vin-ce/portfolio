import React from "react"
import "../styles/styles.styl"
import {
  navContainer,
  upIcon,
  subtitleContainer,
  subtitleText,
  contactContainer,
} from "../styles/nav.module.styl"

import UpIcon from "../assets/icons/UpIcon.svg"
import scrollTo from 'gatsby-plugin-smoothscroll';

import homeData from "../assets/data/homeData.yaml"

export default function Nav({ videoPlayerRef }) {

  const [videoCaption, setVideoCaption] = React.useState(null)
  const subtitles = homeData.subtitles

  React.useEffect(() => {
    if (videoPlayerRef.current && !videoCaption) {
      let curSeconds = 0
      setInterval(() => {
        curSeconds = Math.floor(videoPlayerRef.current.getCurrentTime())
        if (subtitles[curSeconds]) setVideoCaption(subtitles[curSeconds])
      }, 1000)
    }
  }, [videoPlayerRef])

  return (
    <div className={['rowContainer', navContainer].join(" ")}>
      <div className={'leftCol'}>
        <UpIcon onClick={() => scrollTo("#top")} className={upIcon} />
      </div>

      <div className={['middleCol', subtitleContainer].join(" ")}>
        <span className={subtitleText}>{videoCaption}</span>
      </div>

      <div className={['rightCol', contactContainer].join(" ")}>
        <a href="mailto:yc.li.vincent@gmail.com">yc.li.vincent (at) gmail (dot) com</a>
        <a href="https://twitter.com/vincent_yc_li" target="_blank">twitter: @vincent_yc_li</a>
      </div>
    </div>
  )

}