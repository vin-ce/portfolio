import * as React from "react"
import scrollTo from 'gatsby-plugin-smoothscroll';
import { InView } from 'react-intersection-observer';

import DoodlePad from "./doodlePad"
import ProjectHomePage from "./homeProjectModule"
import Nav from "./nav"
import VideoPlayer from "./videoPlayer"
import About from "./about";

import DownIcon from "../assets/icons/DownIcon.svg"
import homeData from "../assets/data/homeData.yaml"

import {
  topDivContainer,

  introContainer,
  intro,
  downIcon,

  introMedia,
  introVideoPlayer,
  fallbackImg,

  subheadingDividers,

  caption,
  processSquaresContainer,

  scrollTrigger,

  loadingCover,
  loadingText,
  defaultFamily,
  defaultItalicFamily,
  clickFamily,
  fadeOut,
}
  from "../styles/home.module.styl"


export default function Home({ location }) {

  // -------------------
  // LOADING SCREEN
  let intervalID;
  const mixUpLoadingText = () => {

    let loadingTextDiv = document.querySelector(`.${loadingText}`)
    let HTMLString = ''
    let characters = ['l', 'o', 'a', 'd', 'i', 'n', 'g']

    const randomiseClass = () => {
      const chance = Math.random()

      if (chance < 0.33) {
        return defaultItalicFamily

      } else if (chance < 0.66) {
        return clickFamily

      } else {
        return defaultFamily
      }
    }

    const setTextEl = () => {
      HTMLString = ''
      for (let i = 0; i < characters.length; i++) {
        let curClass = randomiseClass()
        HTMLString += `<span class=${curClass}>${characters[i]}</span>`
      }

      loadingTextDiv.innerHTML = HTMLString
    }

    // so it immediately sets it on mixUpLoadingText func call
    setTextEl()

    intervalID = setInterval(() => {
      setTextEl()
    }, 500)
  }

  const removeLoadingScreen = () => {
    const loadingEl = document.querySelector(`.${loadingCover}`)
    loadingEl.classList.add(fadeOut)
    document.body.style.overflowY = "scroll"

    clearInterval(intervalID)
  }

  // const handleVideoOnReady = () => console.log("ready")
  const handleVideoOnReady = () => removeLoadingScreen()



  // -------------------
  // INITIALIZATION



  const [processSquares, setProcessSquares] = React.useState(null)

  // process squares are displayed based on specific screen sizes
  const showProcessSquares = () => {
    setProcessSquares(
      <div className={processSquaresContainer}>
        <img src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/process-1.png" />
        <img src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/process-2.png" />
        <img src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/process-3.png" />
      </div>
    )
  }

  function createMarkup(text) {
    return { __html: text };
  }

  const [introEl, setIntroEl] = React.useState(null)
  const [projectsEl, setProjectsEl] = React.useState(null)
  const [coverLetter, setCoverLetter] = React.useState(null)


  React.useEffect(() => {

    // --------------------
    // PROCESS SQUARES

    const isBrowser = () => typeof window !== "undefined"

    // fill in some gaps to make the landing page look nicer
    if (isBrowser() && !processSquares) {
      if (window.innerWidth >= 1200 && window.innerHeight >= 570 && window.innerWidth < 1300) {
        showProcessSquares()
      } else if (window.innerWidth >= 1300 && window.innerHeight >= 670 && window.innerWidth < 1400) {
        showProcessSquares()
      } else if (window.innerWidth >= 1400 && window.innerHeight >= 720 && window.innerWidth < 1440) {
        showProcessSquares()
      } else if (window.innerWidth >= 1440 && window.innerHeight >= 740 && window.innerWidth < 1500) {
        showProcessSquares()
      }
    }


    // ---------------
    // INTRO TEXT

    let downArrowPara = (
      <p>Feel free to look at selected projects below. Otherwise, there's more about me at the bottom of this page: <DownIcon className={downIcon} onClick={() => scrollTo("#about")} /></p>
    )

    let coverLetterPara = (
      <p>I've curated specific projects below. My cover letter is here: <DownIcon className={downIcon} onClick={() => scrollTo("#about")} /></p>
    )

    let defaultIntro = (
      <React.Fragment>
        <div className={intro} dangerouslySetInnerHTML={createMarkup(homeData.intro['default'].text)} />
        <br />
        {downArrowPara}
      </React.Fragment>
    )


    let introFor;
    if (isBrowser() && location.search) {

      // grab which presentation it's for
      const urlParams = new URLSearchParams(location.search)

      // pushes appropriate URLs
      introFor = urlParams.get('f')

      let introData = homeData.intro[introFor]

      if (!introData) {
        setIntroEl(defaultIntro)
      } else if (!introData.hasCoverLetter) {
        setIntroEl(
          <React.Fragment>
            <div className={intro} dangerouslySetInnerHTML={createMarkup(introData.text)} />
            <br />
            {downArrowPara}
          </React.Fragment>
        )
      } else if (introData.hasCoverLetter) {
        setIntroEl(
          <React.Fragment>
            <div className={intro} dangerouslySetInnerHTML={createMarkup(introData.text)} />
            <br />
            {coverLetterPara}
          </React.Fragment>
        )

        setCoverLetter(introData.coverLetter)

      }
    } else {
      setIntroEl(defaultIntro)
    }


    // ----------------
    // PROJECTS EL
    // this works but does make the load in quite slow

    if (!projectsEl) {

      let orderID = "default"

      if (introFor) {
        // if there is a special order for the introFor, access that 
        if (homeData.projectsOrder[introFor]) {
          orderID = introFor
        }
      }

      let projectsOrderData = homeData.projectsOrder[orderID]

      let tempProjectList = []

      for (let i = 0; i < projectsOrderData.length; i++) {

        // on last project
        if (i == projectsOrderData.length - 1) {
          tempProjectList.push(
            <React.Fragment key={`home_project-${i}`}>
              {/* this goes above the last project */}
              <InView as="div" className={scrollTrigger} onChange={collapsePadScrollTrigger} threshold={1} />
            </React.Fragment>
          )
        }

        tempProjectList.push(
          <React.Fragment key={`home_project-${i}`}>
            <ProjectHomePage projectID={projectsOrderData[i]} />
          </React.Fragment>
        )

      }

      setProjectsEl(tempProjectList)

    }


    // LOADING SCREEN

    document.body.style.overflowY = "hidden"
    mixUpLoadingText()

    // automatically removes loading screen after 5 seconds
    setTimeout(() => {
      removeLoadingScreen()
    }, 5000)

  }, [])


  // DOODLE PAD TOGGLING

  const toggleDoodlePadFuncRef = React.useRef(null)

  const expandPadScrollTrigger = (inView) => {
    if (inView) {
      toggleDoodlePadFuncRef.current(true)
    }
  }

  const collapsePadScrollTrigger = (inView) => {
    if (inView) {
      toggleDoodlePadFuncRef.current(false)
    }
  }

  // VIDEO SUBTITLES
  // passed into nav for subtitles
  const videoPlayerRef = React.useRef(null)


  // --------
  // DOM

  return (
    <React.Fragment>
      <InView as="div" className={scrollTrigger} onChange={expandPadScrollTrigger} threshold={1} />

      <div className={loadingCover}>
        <div className={loadingText}> loading </div>
      </div>

      {/* top div */}
      <div className={['rowContainer', topDivContainer].join(' ')}>
        <div className={['leftCol', introContainer].join(' ')}>
          {introEl}
        </div>
        <div className={'middleCol'}>
          <div className={introMedia}>
            <VideoPlayer
              id={`intro`}
              src="https://vimeo.com/804050618"
              type="full"
              videoPlayerRef={videoPlayerRef}
              isAutoplay={true}
              propsClasses={introVideoPlayer}
              propsHandleOnReady={handleVideoOnReady}
            />
            {/* <img id="fallbackImg" className={fallbackImg} src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/intro+screencap.png" /> */}
          </div>

          <div className={caption} >A personal note over a representation of me & my creative process.</div>

          {processSquares}
        </div>

        <div className={'rightCol'}>
          <DoodlePad toggleDoodlePadFuncRef={toggleDoodlePadFuncRef} />
        </div>
      </div>

      {/* nav */}
      <Nav videoPlayerRef={videoPlayerRef} />


      <div className={subheadingDividers}>
        <span>Projects</span>
      </div>


      <InView as="div" className={scrollTrigger} onChange={collapsePadScrollTrigger} threshold={1} />

      {/* PROJECTS */}

      {projectsEl}

      {/* ABOUT */}
      <div className={subheadingDividers}>
        <span>About</span>
      </div>

      <InView as="div" className={scrollTrigger} onChange={expandPadScrollTrigger} threshold={1} />

      <About expandPadScrollTrigger={expandPadScrollTrigger} coverLetter={coverLetter} />

    </React.Fragment>
  )
} 