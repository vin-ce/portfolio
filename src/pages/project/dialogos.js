import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Dialogos({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Dialogos"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Dialogos | Vincent Li</title>
  )
}