import React from "react"

import VideoPlayer from "../videoPlayer"

import {
  carouselContainer,

  controlsContainer,

  slideLeftBox,

  visualsContainer,
  image,
  slideInNext,
  slideOutNext,
  slideInPrev,
  slideOutPrev,
  hidden,
} from "../../styles/carousel.module.styl"

import LeftIcon from "../../assets/icons/LeftIcon.svg"
import RightIcon from "../../assets/icons/RightIcon.svg"


export default function Carousel({ projectID, homeCarouselVisualsLinks }) {

  // separate useState index so to update numbers by the controls
  // via refreshing the DOM - contrived but it works
  // the state index doesn't update immediately after in the 
  // nextVisual function, so can't use there.
  // instead, i use a useRef variable instead
  // which immediately updates, so works for that func
  const [stateIndex, setIndex] = React.useState(0)
  const slideIndex = React.useRef(0)

  const SLIDE_TIME = 250

  let numOfVisuals = homeCarouselVisualsLinks.length;

  const [visualElList, setVisualElList] = React.useState(null)
  let isSlide = false

  if (!visualElList) {
    // initial set up

    let tempElList = [];

    homeCarouselVisualsLinks.forEach((element, index) => {

      if (element.type === "image") {
        if (index === 0) {
          tempElList.push(
            <img key={`${projectID}_visual_${index}`} id={`${projectID}_visual_${index}`} className={image} src={element.src} draggable='false' onClick={nextVisual} />
          )
        } else {
          // hides other elements that aren't the first one
          tempElList.push(
            <img key={`${projectID}_visual_${index}`} id={`${projectID}_visual_${index}`} className={[image, hidden].join(" ")} src={element.src} draggable='false' onClick={nextVisual} />
          )
        }

      } else if (element.type === "video") {
        if (index === 0) {
          tempElList.push(
            <React.Fragment key={`${projectID}_visual_${index}`}>
              <VideoPlayer id={`${projectID}_visual_${index}`} src={element.src} isAutoplay={true} type="carousel" hasSound={element.hasSound} onClick={nextVisual} />
            </React.Fragment>
          )
        } else {
          // hides other elements that aren't the first one
          tempElList.push(
            <React.Fragment key={`${projectID}_visual_${index}`}>
              <VideoPlayer id={`${projectID}_visual_${index}`} propsClasses={[hidden].join(" ")} src={element.src} type="carousel" hasSound={element.hasSound} onClick={nextVisual} />
            </React.Fragment>
          )
        }
      }

    });

    setVisualElList(tempElList)
  }


  // slides one visual to the next by adding animation classes
  function nextVisual() {

    // prevent clicking too fast
    if (isSlide) {
      return
    } else {
      isSlide = true
    }

    let clickedEl = document.getElementById(`${projectID}_visual_${slideIndex.current}`)
    let nextEl;

    // set index to the next one to account for index being 0
    if (slideIndex.current === numOfVisuals - 1) {
      slideIndex.current = 0
    } else {
      slideIndex.current++
    }

    setIndex(slideIndex.current)

    // get clicked element, add slideOutNext
    clickedEl.classList.add(slideOutNext)

    // get next index, add SlideIn, remove hidden
    nextEl = document.getElementById(`${projectID}_visual_${slideIndex.current}`)
    nextEl.classList.add(slideInNext)
    nextEl.classList.remove(hidden)

    // wait, and then reset 
    // remove animation classes + add hidden class
    setTimeout(() => {

      nextEl.classList.remove(slideInNext)

      clickedEl.classList.remove(slideOutNext)
      clickedEl.classList.add(hidden)

      isSlide = false
    }, SLIDE_TIME)

  }

  function prevVisual() {

    // prevent clicking too fast
    if (isSlide) {
      return
    } else {
      isSlide = true
    }

    let clickedEl = document.getElementById(`${projectID}_visual_${slideIndex.current}`)
    let prevEl;

    // set index to the prev one to account for index being 0
    if (slideIndex.current === 0) {
      slideIndex.current = numOfVisuals - 1
    } else {
      slideIndex.current--
    }

    setIndex(slideIndex.current)

    // get clicked element, add slideOutNext
    clickedEl.classList.add(slideOutPrev)

    // get next index, add SlideIn, remove hidden
    prevEl = document.getElementById(`${projectID}_visual_${slideIndex.current}`)
    prevEl.classList.add(slideInPrev)
    prevEl.classList.remove(hidden)

    // wait, and then reset 
    // remove animation classes + add hidden class
    setTimeout(() => {

      prevEl.classList.remove(slideInPrev)

      clickedEl.classList.remove(slideOutPrev)
      clickedEl.classList.add(hidden)

      isSlide = false
    }, SLIDE_TIME)

  }


  return (
    <div className={carouselContainer}>

      <div className={['leftCol', controlsContainer].join(' ')}>
        <span>
          <LeftIcon onClick={prevVisual} />
          <div>{slideIndex.current + 1}/{numOfVisuals}</div>
          <RightIcon onClick={nextVisual} />
        </span>
      </div>

      <div className={visualsContainer}>
        {visualElList}
        <div className={slideLeftBox} onClick={prevVisual} />
      </div>

    </div>
  )

}