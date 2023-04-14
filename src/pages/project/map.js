import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Map({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"MAP"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>MAP | Vincent Li</title>
  )
}