import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function MakingAPlaceOnTheWeb({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"MakingAPlaceOnTheWeb"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Making a Place on the Web | Vincent Li</title>
  )
}