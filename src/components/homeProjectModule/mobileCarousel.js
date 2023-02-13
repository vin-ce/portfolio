import React from "react"

import VideoPlayer from "../videoPlayer"
import { useSwipeable } from "react-swipeable"

import {
  carouselContainer,

  controlsContainer,

  visualsContainer,
  image,
  slideIn,
  slideOut,
  hidden,

} from "../../styles/mobileCarousel.module.styl"

import RightIcon from "../../assets/icons/RightIcon.svg"


export default function MobileCarousel({ projectID, homeCarouselVisualsLinks }) {

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
            <img key={`${projectID}_visual_${index}`} id={`${projectID}_visual_${index}`} className={image} src={element.src} />
          )
        } else {
          // hides other elements that aren't the first one
          tempElList.push(
            <img key={`${projectID}_visual_${index}`} id={`${projectID}_visual_${index}`} className={[image, hidden].join(" ")} src={element.src} />
          )
        }

      } else if (element.type === "video") {
        if (index === 0) {
          tempElList.push(
            <React.Fragment key={`${projectID}_visual_${index}`}>
              <VideoPlayer id={`${projectID}_visual_${index}`} src={element.src} isAutoplay={true} type="carousel" hasSound={element.hasSound} isMobile={true} />
            </React.Fragment>
          )
        } else {
          // hides other elements that aren't the first one
          tempElList.push(
            <React.Fragment key={`${projectID}_visual_${index}`}>
              <VideoPlayer id={`${projectID}_visual_${index}`} propsClasses={[hidden].join(" ")} src={element.src} type="carousel" hasSound={element.hasSound} isMobile={true} />
            </React.Fragment>
          )
        }
      }

    });

    setVisualElList(tempElList)
  }




  const handlers = useSwipeable({
    onSwipedLeft: e => nextVisual(),
  })


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

    // get clicked element, add slideOut
    clickedEl.classList.add(slideOut)

    // get next index, add SlideIn, remove hidden
    nextEl = document.getElementById(`${projectID}_visual_${slideIndex.current}`)
    nextEl.classList.add(slideIn)
    nextEl.classList.remove(hidden)

    // wait, and then reset 
    // remove animation classes + add hidden class
    setTimeout(() => {

      nextEl.classList.remove(slideIn)

      clickedEl.classList.remove(slideOut)
      clickedEl.classList.add(hidden)

      isSlide = false
    }, SLIDE_TIME)

  }


  return (
    <div className={carouselContainer}>
      <div className={visualsContainer} {...handlers} >
        {visualElList}
      </div>

      <div className={controlsContainer}>
        <div>{slideIndex.current + 1}/{numOfVisuals}</div>
        <RightIcon onClick={nextVisual} />
      </div>


    </div>
  )

}