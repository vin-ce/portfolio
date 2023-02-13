import React from "react"
import Carousel from "./homeProjectModule/carousel"
import Button from "./button"

import {
  projectContainer,

  allTextContainer,

  headingsContainer,
  projectName,
  subtitle,

  infoContainer,
  descriptionContainer,
  extraInfoContainer,

  buttonsContainer,
} from "../styles/homeProjectModule.module.styl"

import projectsData from "../assets/data/projectsData.yaml"
import VisitIcon from "../assets/icons/VisitIcon.svg"
import MoreIcon from "../assets/icons/MoreIcon.svg"
import WatchIcon from "../assets/icons/PlayIcon.svg"

export default function HomeProjectModule({ projectID }) {

  const data = projectsData[projectID]

  const [buttonsElList, setButtonsElList] = React.useState(null)
  const [toolsString, setToolsString] = React.useState(null)

  if (!buttonsElList) {

    let tempButtonsElList = []

    data.buttons.forEach((element, index) => {
      switch (element.icon) {
        case 'VisitIcon':
          tempButtonsElList.push(
            <span key={`${projectID}_button_${index}`}>
              <Button
                id={`${projectID}_button_${index}`}
                src={element.src}
                text={element.text}
                icon={<VisitIcon />}
              />
            </span>
          )

          break

        case 'MoreIcon':
          tempButtonsElList.push(
            <span key={`${projectID}_button_${index}`}>
              <Button
                id={`${projectID}_button_${index}`}
                src={element.src}
                text={element.text}
                icon={<MoreIcon />}
                type="internal"
              />
            </span>
          )

          break

        case 'WatchIcon':
          tempButtonsElList.push(
            <span key={`${projectID}_button_${index}`}>
              <Button
                id={`${projectID}_button_${index}`}
                src={element.src}
                text={element.text}
                icon={<WatchIcon />}
              />
            </span>
          )

          break

      }
    })

    setButtonsElList(tempButtonsElList)

  }

  if (!toolsString) {
    let tempToolsString = ''

    data.tools.forEach((tool, index) => {
      if (index === 0) {
        tempToolsString += tool
      } else {
        tempToolsString += ` + ${tool}`
      }
    })

    setToolsString(tempToolsString)
  }

  // this converts html string in my projectsData.yaml into actual html
  // the div that contains this also needs "white-space:pre-line"
  // to convert line breaks into actual line breaks

  function createMarkup(text) {
    return { __html: text };
  }

  return (
    <div className={projectContainer} id={projectID}>
      <Carousel projectID={projectID} homeCarouselVisualsLinks={data.homeCarouselVisualsLinks} />
      <div className={['rowContainer', allTextContainer].join(' ')}>

        <div className={['leftCol', headingsContainer].join(' ')}>
          <span className={projectName}>{data.name}</span>
          <span className={subtitle}>{data.subtitle}</span>
        </div>

        <div className={['middleCol', infoContainer].join(' ')}>
          <div className={descriptionContainer} dangerouslySetInnerHTML={createMarkup(data.desc)} />
          <div className={extraInfoContainer}>
            <span>{data.type}</span>
            <span>{toolsString}</span>
            <span>{data.dateAndPlace}</span>
          </div>
        </div>

        <div className={['rightCol', buttonsContainer].join(' ')}>
          {buttonsElList}
        </div>
      </div>
    </div>
  )

}

