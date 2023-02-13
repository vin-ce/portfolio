import * as React from "react"
import ProjectPage from "../../components/projectPage/projectPage";

export default function LikeAFlower({ location }) {

  return (
    <React.Fragment>
      <ProjectPage projectID={"LikeAFlower"} location={location} />
    </React.Fragment>
  )
}

export function Head() {
  return (
    <title>Like a Flower | Vincent Li</title>
  )
}