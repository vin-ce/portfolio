import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Point({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Point"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Point | Vincent Li</title>
  )
}