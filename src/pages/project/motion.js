import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Motion({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Motion"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Motion | Vincent Li</title>
  )
}