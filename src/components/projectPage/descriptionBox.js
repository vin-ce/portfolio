import React, { useEffect, useState, useRef } from "react"
import scrollTo from "gatsby-plugin-smoothscroll"

import {
  container,

  controlsContainer,
  leftContainer,

  lessMoreContainer,
  less,
  more,

  hide,

  rightContainer,
  indexStyle,
  left,
  right,

  textContainer,


} from "../../styles/descriptionBox.module.styl"

import LeftIcon from "../../assets/icons/LeftIcon.svg"
import RightIcon from "../../assets/icons/RightIcon.svg"
import MorePlainIcon from "../../assets/icons/MorePlainIcon.svg"
import LessIcon from "../../assets/icons/LessIcon.svg"

export default function DescriptionBox({ data, mode, projectSectionData, curSectionIndexRef }) {

  const [sectionName, setSectionName] = useState(null)

  const [isExpanded, setIsExpanded] = useState(true)

  const [description, setDescription] = useState(null)

  const SECTION_NUM = projectSectionData.length

  const descriptionRef = useRef(null)



  // ====================
  // DESCRIPTION BOX

  const toggleDescriptionBox = (isExpanded) => {

    const lessIconEl = document.getElementById(`${data.id}_descriptionBox_lessIcon`)
    const descriptionTextEl = document.getElementById(`${data.id}_descriptionBox_textContainer`)

    if (!isExpanded) {
      // collapse description text
      lessIconEl.classList.add(hide)
      descriptionTextEl.classList.add(hide)
    } else {
      // expand description text
      lessIconEl.classList.remove(hide)
      descriptionTextEl.classList.remove(hide)
    }

    setIsExpanded(isExpanded)
  }


  React.useEffect(() => {
    setSectionName(projectSectionData[curSectionIndexRef.current - 1].name)

    // if mode is presentation, no need to keep track of this
    if (mode !== "presentation") {
      const sectionDescription = projectSectionData[curSectionIndexRef.current - 1].desc
      if (!sectionDescription) {
        setDescription('✻')
        if (isExpanded) toggleDescriptionBox(false)
      } else {
        setDescription(sectionDescription)
        if (!isExpanded) toggleDescriptionBox(true)
      }
    }

  }, [curSectionIndexRef.current])


  // ============================
  // PREVIOUS / NEXT SECTION 

  const onClickLeft = (type) => {
    if (curSectionIndexRef.current !== 1) {
      if (type === "key") {
        // instantly jumps to section rather than scroll
        document.getElementById(`section_${curSectionIndexRef.current - 1}`).scrollIntoView({ behavior: "instant" })
      } else {
        scrollTo(`#section_${curSectionIndexRef.current - 1}`)
      }
    }
  }

  const onClickRight = (type) => {
    if (curSectionIndexRef.current !== SECTION_NUM) {
      if (type === "key") {
        const nextSectionEl = document.getElementById(`section_${curSectionIndexRef.current + 1}`)
        if (nextSectionEl) {
          nextSectionEl.scrollIntoView({ behavior: "instant" })
        }
        // document.getElementById(`section_${curSectionIndexRef.current + 1}`).scrollIntoView({ behavior: "instant" })
      } else {
        scrollTo(`#section_${curSectionIndexRef.current + 1}`)
      }
    }
  }


  // LEFT / RIGHT ARROW KEY CONTROL

  const onKeyUp = e => {
    if (e.key === "ArrowLeft") {
      onClickLeft("key")
    }
    else if (e.key === "ArrowRight") {
      onClickRight("key")
    }
  }


  // ==============
  // INITIALIZE

  React.useEffect(() => {
    // add left/right arrow key event listener
    window.addEventListener("keyup", onKeyUp);

    // hides less/more icon + text container
    if (mode === "presentation") {
      document.querySelector(`.${lessMoreContainer}`).classList.add(hide)
      document.querySelector(`.${textContainer}`).classList.add(hide)
    }

  }, [])






  function createMarkup(text) {
    return { __html: text };
  }

  return (
    <div className={container}>
      <div className={controlsContainer}>
        <div className={leftContainer}>

          <div className={lessMoreContainer} onClick={() => toggleDescriptionBox(!isExpanded)}>
            <LessIcon id={`${data.id}_descriptionBox_lessIcon`} className={less} />
            <MorePlainIcon className={more} />
          </div>

          {sectionName}
        </div>

        <div className={rightContainer}>
          <LeftIcon className={left} onClick={onClickLeft} />
          <div className={indexStyle}>
            {curSectionIndexRef.current}/{SECTION_NUM}
          </div>
          <RightIcon className={right} onClick={onClickRight} />
        </div>
      </div>

      <div id={`${data.id}_descriptionBox_textContainer`} ref={descriptionRef} className={textContainer} dangerouslySetInnerHTML={createMarkup(description)} />

    </div>
  )

}