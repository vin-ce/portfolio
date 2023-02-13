import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Aera({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Aera"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Aera | Vincent Li</title>
  )
}