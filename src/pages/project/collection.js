import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Collection({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Collection"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Collection | Vincent Li</title>
  )
}