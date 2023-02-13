import React from "react"

import MobileCarousel from "../homeProjectModule/mobileCarousel"

import {
  projectContainer,

  headingsContainer,
  projectName,
  subtitle,

  descriptionContainer,
  extraInfoContainer,

  descriptionButton,
}
  from "../../styles/mobileHomeProjects.module.styl"

import projectsData from "../../assets/data/projectsData.yaml"


export default function MobileHomeProjects({ projectID }) {
  const data = projectsData[projectID]

  const [toolsString, setToolsString] = React.useState(null)
  const [isDescription, setIsDescription] = React.useState(false)

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


  function createMarkup(text) {
    return { __html: text };
  }

  const onDescriptionButtonClick = () => {
    setIsDescription(!isDescription)
  }



  return (
    <div className={projectContainer}>
      <MobileCarousel projectID={projectID} homeCarouselVisualsLinks={data.homeCarouselVisualsLinks} />

      <div className={headingsContainer}>
        <span className={projectName}>{data.name}</span>
        <span className={subtitle}>{data.subtitle}</span>
      </div>

      <div className={extraInfoContainer}>
        <span>{data.type}</span>
        <span>{toolsString}</span>
        <span>{data.dateAndPlace}</span>
      </div>

      {isDescription ?
        <div className={descriptionContainer} dangerouslySetInnerHTML={createMarkup(data.desc)} /> : null
      }

      <div className={descriptionButton} onClick={onDescriptionButtonClick}>
        {isDescription ?
          "- Collapse Description" : "+ Expand Description"
        }

      </div>

    </div>
  )
}