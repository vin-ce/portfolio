import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function OnMeaning({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"OnMeaning"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>On Meaning | Vincent Li</title>
  )
}