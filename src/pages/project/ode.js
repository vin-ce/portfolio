import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function Ode({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"Ode"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Ode | Vincent Li</title>
  )
}