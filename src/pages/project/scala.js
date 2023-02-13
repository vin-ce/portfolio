import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Scala({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Scala"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Scala | Vincent Li</title>
  )
}