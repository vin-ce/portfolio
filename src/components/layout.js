import React from "react"

import "../styles/styles.styl"
import {
  layoutHomeContainer,
  layoutProjectContainer
} from "../styles/layout.module.styl"

export default function Layout({ children, type }) {

  let classes = null
  if (type === "home") {
    classes = layoutHomeContainer
  } else if (type === "project") {
    classes = layoutProjectContainer
  }

  return (
    <main className={classes} id="top">
      {children}
    </main>
  )
}