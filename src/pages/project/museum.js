import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function OnlineMuseum({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"OnlineMuseum"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Online Museum | Vincent Li</title>
  )
}