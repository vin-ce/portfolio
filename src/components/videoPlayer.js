import React from "react"
import ReactPlayer from "react-player/lazy"

import {
  carouselPlayerContainer,
  fullPlayerContainer,
  projectPlayerContainer,

  carouselPlayerStyle,
  fullPlayerStyle,
  player,
  controlsContainer,

  playPauseContainer,
  play,
  pause,
  hidden,

  volumeMuteContainer,
  volumeStyle,
  muteStyle,

  progressBarContainer,
  progressBar,
  seekBar,

  durationContainer,

} from "../styles/videoPlayer.module.styl"

import PlayIcon from "../assets/icons/PlayIcon.svg"
import PauseIcon from "../assets/icons/PauseIcon.svg"

import VolumeIcon from "../assets/icons/VolumeIcon.svg"
import MuteIcon from "../assets/icons/MuteIcon.svg"



export default function VideoPlayer({ id, src, propsClasses, onClick, isAutoplay, hasSound, type, isMobile, videoPlayerRef, propsHandleOnReady }) {

  const playerRef = React.useRef(null)

  const [playing, setPlaying] = React.useState(false)
  const isPlaying = React.useRef(false)

  const [hasPlayed, setHasPlayed] = React.useState(false)

  const [isSeeking, setIsSeeking] = React.useState(false)

  const [duration, setDuration] = React.useState(null)

  const [volumeEl, setVolumeEl] = React.useState(null)

  // volume is on by default
  const [volume, setHasVolume] = React.useState(true)
  const hasVolume = React.useRef(true)

  const [playerContainerClass, setPlayerContainerClass] = React.useState(null)

  const [playerClass, setPlayerClass] = React.useState(null)

  // -----------------
  // PLAY / PAUSE

  const handlePlayPause = (e, bool) => {

    const playIconEl = document.getElementById(`${id}_playIcon`)

    if (!bool) isPlaying.current = !isPlaying.current
    else isPlaying.current = bool

    if (isPlaying.current) {
      // set icon to pause
      playIconEl.classList.add(hidden)
      if (isMobile) hideControls()

    } else {
      // set icon to play
      playIconEl.classList.remove(hidden)
      if (isMobile) displayControls()
    }

    // helps update the DOM by refreshing it
    setPlaying(isPlaying.current)
  }


  // ------------------
  // VOLUME / MUTE

  const handleVolumeMute = (e, bool) => {

    const volumeIconEl = document.getElementById(`${id}_volumeIcon`)

    if (!bool) hasVolume.current = !hasVolume.current
    else hasVolume.current = bool

    if (hasVolume.current) {
      // set icon to volume
      volumeIconEl.classList.remove(hidden)
    } else {
      // set icon to mute
      volumeIconEl.classList.add(hidden)
    }

    // helps update the DOM by refreshing it
    setHasVolume(hasVolume.current)
  }


  // --------------------
  // PROGRESS & SEEK


  const handleOnProgress = state => {
    if (isPlaying.current && !isSeeking) {
      const progressBarEl = document.getElementById(`${id}_progressBar`)
      progressBarEl.style.width = `${state.played.toFixed(2) * 100}%`
    }
  }



  const handleSeekMouseDown = e => {
    setIsSeeking(true)
  }

  const handleSeekChange = e => {
    if (isSeeking) {
      const progressBarEl = document.getElementById(`${id}_progressBar`)
      progressBarEl.style.width = `${getDecimalPercentOfBar(e).toFixed(2) * 100}%`
    }
  }

  const handleSeekMouseUp = e => {
    if (isSeeking) {
      setIsSeeking(false)
      const progressBarEl = document.getElementById(`${id}_progressBar`)
      progressBarEl.style.width = `${getDecimalPercentOfBar(e).toFixed(2) * 100}%`
      playerRef.current.seekTo(getDecimalPercentOfBar(e), 'fraction')
    }
  }


  const getDecimalPercentOfBar = (e) => {
    const bcr = e.target.getBoundingClientRect()
    const percentOfBar = (e.clientX - bcr.left) / bcr.width
    return percentOfBar
  }

  // ----------------------------
  // DISPLAY / HIDE CONTROLS

  const displayControls = () => {
    const controlsEl = document.getElementById(`${id}_controlsContainer`)
    controlsEl.style.opacity = 1
  }

  const hideControls = () => {
    if (isPlaying.current) {
      const controlsEl = document.getElementById(`${id}_controlsContainer`)
      controlsEl.style.opacity = 0
    }
  }


  // -----------------------
  // INITIALIZATION



  const handleOnReady = () => {

    if (hasPlayed) return

    // --------------------------
    // AUTOPLAY AND CONTROLS

    // hasSound is a check for the OnMeaning video in the carousel
    if (isAutoplay && !hasPlayed && !hasSound) {
      handlePlayPause(null, true)

      setHasVolume(false)
      hasVolume.current = false
    } else if (!hasPlayed) {
      displayControls()
    }

    setHasPlayed(true)

    // --------------------
    // STYLING & ICONS

    const seconds = playerRef.current.getDuration()

    // https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
    const m = Math.floor(seconds % 3600 / 60).toString().padStart(2, '0')
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');

    setDuration(`${m}:${s}`)



    const controlsEl = document.getElementById(`${id}_controlsContainer`)
    const playerEl = document.getElementById(`${id}_player`)

    switch (type) {

      case "carousel": {
        setPlayerContainerClass(carouselPlayerContainer)
        controlsEl.style.width = "32rem"
        // playerEl.style.height = "100%"

        setPlayerClass(carouselPlayerStyle)

        break
      }

      case "full": {
        setPlayerContainerClass(fullPlayerContainer)

        if (id === "intro") {
          // flex & unset is to fit the container
          // to the actual size of the video
          playerEl.style.display = "flex"
          playerEl.style.height = "unset"
          playerRef.current.getInternalPlayer().style.height = "unset"
          playerRef.current.getInternalPlayer().style.maxHeight = "90vh"
        }

        controlsEl.style.width = "100%"
        controlsEl.style.boxSizing = "border-box"
        // 2.4rem for height + 3.2rem padding
        controlsEl.style.height = "5.8rem"

        setPlayerClass(fullPlayerStyle)

        break
      }

    }

    // set volume
    if (hasSound) {

      // no "hidden" class is added to volume because
      // the volume icon is the only icon that doesn't display
      // what the state is on clicking it, but rather it's current state
      // vs e.g the play icon - the icon is pause when the video is playing
      // to show what the icon will do upon clicking it
      // the volume icon, instead, reflects realtime state
      setVolumeEl(
        <div className={volumeMuteContainer} onClick={handleVolumeMute} >
          <span className={[volumeStyle].join(' ')} id={`${id}_volumeIcon`} >
            <VolumeIcon />
          </span>
          <MuteIcon className={muteStyle} />
        </div>
      )
    }


    // props handle on ready

    if (propsHandleOnReady) propsHandleOnReady()

  }




  // passes out video player ref for video caption stuff
  React.useEffect(() => {
    if (videoPlayerRef) videoPlayerRef.current = playerRef.current
  }, [])

  // ----------------------------
  // FOR NON-CAROUSEL VIDEOS

  // plays / pauses video
  // if no onClick (i.e is not carousel vid)
  // clicking the video will pause / play
  const handlePlayerOnClick = () => {
    if (onClick) onClick()
    else handlePlayPause()
  }

  // for some reason doesn't work in the handleOnReady func,
  // so moved out here
  if (!playerClass) {
    if (type === "carousel") {
      setPlayerClass(carouselPlayerStyle)
    } else if (type === "full") {
      setPlayerClass(fullPlayerStyle)
    }
  }


  // --------
  // DOM

  return (
    <div className={[propsClasses, playerContainerClass].join(' ')} id={id} onMouseOver={displayControls} onMouseOut={hideControls}>
      <ReactPlayer
        ref={playerRef}
        className={playerClass}
        width="100%"
        height="100%"

        id={`${id}_player`}

        onClick={handlePlayerOnClick}

        url={src}
        loop={true}
        muted={!volume}

        playing={playing}

        onProgress={handleOnProgress}
        onReady={handleOnReady}
      />

      <div id={`${id}_controlsContainer`} className={controlsContainer}>
        <div className={playPauseContainer} onClick={handlePlayPause} >
          <span className={play} id={`${id}_playIcon`} >
            <PlayIcon />
          </span>
          <PauseIcon className={pause} />
        </div>
        <div className={progressBarContainer}>
          <div className={progressBar} id={`${id}_progressBar`} />
          <div className={seekBar} onMouseDown={handleSeekMouseDown} onMouseMove={handleSeekChange} onMouseUp={handleSeekMouseUp} />
        </div>
        {volumeEl}
        <div className={durationContainer}>
          {duration}
        </div>
      </div>
    </div >
  )
}