import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Three({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Three"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>3D | Vincent Li</title>
  )
}