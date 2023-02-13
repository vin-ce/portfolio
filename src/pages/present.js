import React, { useState, useEffect } from "react"
import { navigate } from "gatsby";
import {
  container,
  itemContainer,
  colL,
  company,
  dateStyle,

  colM,
  colR,
  content,
  projectsListContainer,
} from "../styles/present.module.styl"

import VideoPlayer from "../components/videoPlayer";

import RightArrow from "../assets/icons/RightArrow.svg"

import presentationURLs from "../assets/data/presentationURLs.yaml"
import projectsData from "../assets/data/projectsData.yaml"


export default function Present({ location }) {

  const [projectListEls, setProjectListEls] = useState(<div>loading...</div>)
  const [companyName, setCompanyName] = useState("+")
  const [date, setDate] = useState("@")

  // sets e.g presentation mode for the projects
  // based on the parameters in the URL

  useEffect(() => {

    const isBrowser = () => typeof window !== "undefined"

    if (isBrowser() && location.search) {

      // grab which presentation it's for
      const urlParams = new URLSearchParams(location.search)

      // pushes appropriate URLs
      let presentFor = urlParams.get('f')

      // shows the appropriate intro page (and not push URLs)
      let show = urlParams.get('s')


      if (presentFor) {
        const NUM_OF_PROJECTS = presentationURLs[presentFor].links.length
        // push default
        window.history.pushState({}, "", `/present?s=${presentFor}`)

        for (let i = 0; i < NUM_OF_PROJECTS; i++) {
          window.history.pushState({}, "", `/project/${presentationURLs[presentFor].links[i]}`)
        }

        navigate(-NUM_OF_PROJECTS)
        // navigate(-1)

      } else if (show) {

        // create the page
        let tempProjectsListEl = []

        presentationURLs[show].projects.forEach((project, i) => {
          tempProjectsListEl.push(
            <div className={itemContainer}>
              <RightArrow />
              <a href={`/project/${presentationURLs[show].links[i]}`} target="_blank">{projectsData[project].name}</a>
            </div>
          )
        })

        setProjectListEls(
          <div className={projectsListContainer}>
            {tempProjectsListEl}
          </div>
        )

        setCompanyName(presentationURLs[show].name)
        setDate(presentationURLs[show].date)
      }

    } else {

    }
  }, [])

  return (
    <div className={container}>
      <div className={colL}>
        <span className={company}>Hey {companyName}!</span>
        <br />
        <div className={dateStyle}>{date}</div>

      </div>
      <div className={colM}>
        <VideoPlayer
          propsClasses={content}
          id={`presentation`}
          src="https://vli-portfolio.s3.us-east-2.amazonaws.com/home/my+creative+process+-+clip.mp4"
          type="full"
          isAutoplay={true}
        />
      </div>
      <div className={colR}>
        <span className="highlight">Vincent Li</span> — Selected Works
        {projectListEls}
      </div>
    </div>
  )

}

export function Head() {
  return (
    <title>Selected Works | Vincent Li</title>
  )
}