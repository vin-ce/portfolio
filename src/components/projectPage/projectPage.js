import * as React from "react"
import Layout from "../layout"
import { InView } from 'react-intersection-observer';

import ProjectTopModule from "./projectTopModule"
import DescriptionBox from "./descriptionBox"

import { generateProjectSections } from "./projectPageModules"

import projectsData from "../../assets/data/projectsData.yaml"

import {
  fadeDiv,
} from "../../styles/projectPage.module.styl"

export default function ProjectPage({ projectID, location }) {

  const data = projectsData[projectID]

  const [curSectionIndex, setCurSectionIndex] = React.useState(1)
  const curSectionIndexRef = React.useRef(1)

  const [projectSections, setProjectSections] = React.useState(null)
  const [projectSectionData, setProjectSectionData] = React.useState(data.projectPageSections)

  // const [fadeInEl, setFadeInEl] = React.useState(null)

  const onSectionInView = (index => {
    setCurSectionIndex(index)
    // ref is used to keep the index in the left / right arrow key event listener up to date
    curSectionIndexRef.current = index
  })

  // --------------------------------
  // INITIALIZE PROJECT SECTIONS

  const mode = React.useRef(false)

  if (!projectSections) {


    // sets e.g presentation mode for the projects
    // based on the parameters in the URL
    if (location.search) {
      const urlParams = new URLSearchParams(location.search)
      mode.current = urlParams.get('mode')

      // fade in el is to have a smoother transition
      // as e.g buttons get removed for presentation mode
      // setFadeInEl(<div className={fadeDiv} />)

    }

    if (mode.current && data[mode.current]) {
      // sets the e.g presentation set of sections / material
      // rather than the default
      setProjectSectionData(data[mode.current])
      setProjectSections(generateProjectSections(data[mode.current], onSectionInView))
    } else {
      setProjectSections(generateProjectSections(projectSectionData, onSectionInView))
    }
  }


  return (
    <Layout type="project">

      <div className={fadeDiv} />

      <InView as="div" onChange={(inView) => { if (inView) onSectionInView(1) }} />

      <ProjectTopModule data={data} mode={mode.current} projectSectionData={projectSectionData} />
      <DescriptionBox data={data} mode={mode.current} projectSectionData={projectSectionData} curSectionIndexRef={curSectionIndexRef} />

      {projectSections}

    </Layout>
  )
}

